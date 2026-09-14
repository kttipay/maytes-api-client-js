// Bundled with the generated SDK via bin/postprocess-typescript.sh.
// Lives at build/typescript-client/src/managed-client.ts after `make generate-typescript`.
//
// Adds OAuth2 client_credentials credential management on top of the generated
// DefaultApi using a **reactive 401-retry** pattern:
//
//   1. First authed call mints a token via getOAuthToken (an operation with no
//      security requirement) and caches it.
//   2. Subsequent calls send the cached token as-is — no client-side expiry
//      math, no proactive refresh, no margin.
//   3. If the server returns 401 (token expired or revoked), the wrapper
//      refreshes the token and retries the request once. If the retry also
//      401s, the error propagates.
//
// Server-side expiry is authoritative — no clock-skew concerns, no wasted
// proactive refreshes. Concurrent 401s deduplicate through an in-flight promise
// so multiple parallel calls trigger exactly one mint.

import { DefaultApi } from './apis/DefaultApi.js';
import { Configuration, type ConfigurationParameters, type Middleware, type ResponseContext } from './runtime.js';

export class OAuthTokenProvider {
  private cached: string | null = null;
  private inflight: Promise<string> | null = null;
  private readonly unauthedApi: DefaultApi;

  constructor(
    endpoint: string,
    private readonly clientId: string,
    private readonly clientSecret: string,
    /**
     * SDK-test-only escape hatch — pre-seed the token cache with a token the
     * caller has minted out-of-band (e.g. a short-lived JWT signed by the
     * test harness using the shared RSA private key). When that token expires
     * server-side, the wrapper's normal reactive 401-retry path takes over
     * and mints a fresh full-TTL token via /oauth/token. Omit for production.
     */
    initialToken?: string,
  ) {
    // Separate unauthed client used only for getOAuthToken, whose spec declares
    // no security requirement so the generator attaches no Authorization header.
    // Never recurses into itself for a token.
    this.unauthedApi = new DefaultApi(new Configuration({ basePath: endpoint }));
    if (initialToken) this.cached = initialToken;
  }

  async get(): Promise<string> {
    if (this.cached) return this.cached;
    return this.refresh();
  }

  /**
   * Refresh, deduplicating concurrent callers: every caller that hits 401 in
   * the same window awaits the single in-flight mint. If a caller's stale token
   * has already been replaced by another caller's refresh, return that one
   * instead of minting again.
   */
  async refreshIfStale(staleToken: string | null): Promise<string> {
    if (this.cached && this.cached !== staleToken) return this.cached;
    return this.refresh();
  }

  async refresh(): Promise<string> {
    if (!this.inflight) {
      this.inflight = this.mint().finally(() => {
        this.inflight = null;
      });
    }
    return this.inflight;
  }

  private async mint(): Promise<string> {
    const response = await this.unauthedApi.getOAuthToken({
      oAuthTokenRequest: {
        grantType: 'client_credentials',
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
    });
    if (!response.accessToken) {
      throw new Error('getOAuthToken returned no access_token');
    }
    this.cached = response.accessToken;
    return this.cached;
  }
}

export interface CreateMaytesApiClientConfig extends Omit<ConfigurationParameters, 'accessToken' | 'basePath'> {
  endpoint: string;
  clientId: string;
  clientSecret: string;
  /**
   * SDK-test-only escape hatch — seeds the token cache with a pre-minted JWT.
   * Used by the E2E test path that forges a short-lived token via the shared
   * RSA private key and verifies the wrapper's reactive 401-retry refreshes
   * once the forged token expires. Production callers omit this — first authed
   * call will mint a normal token via /oauth/token.
   */
  initialToken?: string;
}

/**
 * Convenience factory: returns a fully managed DefaultApi. The OAuth token is
 * minted on the first authed call, cached, and refreshed reactively when the
 * server returns 401 (one retry per request). Operations whose spec declares
 * no security requirement (getHealth, getOAuthToken) never receive the header —
 * the generated client only attaches it where the spec asks for it.
 *
 *   const api = createMaytesApiClient({
 *     endpoint: 'https://api.maytes.co',
 *     clientId: '...',
 *     clientSecret: '...',
 *   });
 *   const result = await api.createCheckout({ createCheckoutRequest: { ... } });
 */
export function createMaytesApiClient(config: CreateMaytesApiClientConfig): DefaultApi {
  const { endpoint, clientId, clientSecret, initialToken, middleware = [], ...rest } = config;
  const provider = new OAuthTokenProvider(endpoint, clientId, clientSecret, initialToken);

  // Reactive 401-retry as a post-middleware: typescript-fetch does not throw
  // on non-2xx inside `fetchApi`, it hands the Response to `post` middlewares
  // first. Returning a new Response from `post` replaces the one the API
  // method will deserialise — so a successful retry is transparent to the
  // caller. The retry re-issues the ORIGINAL request with a fresh header and
  // is marked so a second 401 propagates instead of looping.
  const retry401: Middleware = {
    post: async (ctx: ResponseContext) => {
      if (ctx.response.status !== 401) return undefined;
      const headers = new Headers(ctx.init.headers);
      if (headers.get(RETRY_MARKER)) return undefined;

      const stale = bearerFrom(headers.get('Authorization'));
      const fresh = await provider.refreshIfStale(stale);
      headers.set('Authorization', `Bearer ${fresh}`);
      headers.set(RETRY_MARKER, '1');
      return ctx.fetch(ctx.url, { ...ctx.init, headers });
    },
  };

  return new DefaultApi(
    new Configuration({
      ...rest,
      basePath: endpoint,
      accessToken: () => provider.get(),
      middleware: [...middleware, retry401],
    }),
  );
}

// Header used only to mark the retried request so the middleware does not
// retry a second 401. Stripped by nothing — it is harmless to the server.
const RETRY_MARKER = 'x-maytes-sdk-retry';

function bearerFrom(authorization: string | null): string | null {
  if (!authorization) return null;
  const [scheme, token] = authorization.split(' ', 2);
  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
}
