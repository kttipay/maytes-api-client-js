# Maytes JavaScript SDK

Official JavaScript client for the [Maytes API](https://developers.maytes.co) — create,
capture and cancel checkouts, and verify inbound webhook signatures.

> **Generated package.** This repository is a build artefact, published from the
> Maytes API service definition. Pull requests here are not accepted — file
> issues instead, and fixes land upstream in the source model.

## Install

```bash
npm install @maytes/api-client-js
```

## Usage

The client mints an OAuth2 `client_credentials` token on first use, caches it,
and — on a `401` — refreshes and retries the request once. There is no
client-side expiry maths to get wrong, and no proactive refresh to schedule.

**ESM / TypeScript**

```ts
import { createMaytesApiClient, verifyWebhookSignature } from "@maytes/api-client-js";

const client = createMaytesApiClient({ endpoint, clientId, clientSecret });
const checkout = await client.createCheckout(request);

const event = verifyWebhookSignature(rawBody, signatureHeader, signingSecret);
```

**CommonJS**

```js
const { createMaytesApiClient } = require("@maytes/api-client-js");

const client = createMaytesApiClient({ endpoint, clientId, clientSecret });
const checkout = await client.createCheckout(request);
```

### Module compatibility

One tarball serves every JavaScript runtime and toolchain:

| Consumer | Resolves to |
|---|---|
| `require(...)` (CommonJS) | `dist/cjs` |
| `import ...` (native ESM, Node 18+) | `dist/esm` |
| TypeScript (any `moduleResolution`) | matching `.d.ts` per condition |
| Bundlers (webpack, Vite, Rollup, esbuild), Deno, Bun | `exports` map, ESM preferred |

TypeScript is **not** required to use the package — the types are bundled and
plain JavaScript ignores them.

> **Server-side only.** This SDK authenticates with your client secret and
> verifies webhooks with `node:crypto`. Never bundle it into a browser, a mobile
> app, or any other client you do not control: doing so publishes your
> credentials to everyone who loads the page.

### Verifying webhooks

Verify **before** parsing the body, and pass the raw request bytes — not a
re-encoded object. Re-serialising changes the bytes and the signature will not
match. The event id is stable across retries, so deduplicate on it.

## Documentation

Full integration docs: <https://developers.maytes.co>

## License

MIT — see [LICENSE](LICENSE).
