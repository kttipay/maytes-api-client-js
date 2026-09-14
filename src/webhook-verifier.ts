// Bundled with the generated SDK via bin/postprocess-typescript.sh.
// Lives at build/typescript-client/src/webhook-verifier.ts after a
// `make generate-typescript`.
//
// Verifies the `X-Maytes-Signature` header on an inbound webhook delivery and
// returns the parsed event. Merchants must never hand-roll this — see the
// four sharp edges below, each of which silently produces either a security
// hole or an outage:
//
//   1. RAW BODY. The signature covers the exact bytes we sent. Verifying
//      against re-serialised JSON (JSON.stringify(req.body)) fails for any
//      body whose key order or number formatting differs after a parse/emit
//      round-trip. This is the single most common webhook integration bug.
//   2. MULTIPLE `v1=` ENTRIES. During a signing-secret rotation grace window
//      the header carries TWO signatures (current secret first, previous
//      second) and the delivery is valid if EITHER matches. A verifier that
//      reads only the first `v1=` works perfectly until the first rotation,
//      then rejects live traffic. See §7 of the webhook spec.
//   3. CONSTANT-TIME COMPARISON. A byte-by-byte early-exit compare (`===`)
//      leaks how much of a forged signature was correct, which is enough to
//      recover a valid signature one byte at a time.
//   4. REPLAY WINDOW. The `t=` timestamp is the anti-replay anchor; a captured
//      delivery stays valid forever without a freshness check.
//
// Verification and JSON parsing are deliberately fused into ONE call: the
// function takes raw bytes and hands back the parsed event, so there is no
// intermediate state in which a caller can parse first and verify second.
//
// Algorithm (webhook spec §6.1):
//   signed_payload = `${t}.${rawBody}`
//   signature      = lowercase_hex( HMAC_SHA256(signing_secret, signed_payload) )

import { createHmac, timingSafeEqual } from 'node:crypto';

/** Default anti-replay window, in seconds (webhook spec §6.1 advises ~5 min). */
export const DEFAULT_TOLERANCE_SECONDS = 300;

/** Why a delivery failed verification. Log this; never echo it to the caller. */
export type WebhookSignatureErrorReason =
  /** Header absent, or missing its `t=` / `v1=` components. */
  | 'malformed_header'
  /** `t=` is further from now than the tolerance allows — possible replay. */
  | 'timestamp_out_of_tolerance'
  /** No `v1=` entry matched. Wrong secret, tampered body, or a stale secret. */
  | 'no_matching_signature'
  /** Signature was valid but the body wasn't JSON (should never happen). */
  | 'invalid_json';

export class WebhookSignatureError extends Error {
  readonly reason: WebhookSignatureErrorReason;

  constructor(reason: WebhookSignatureErrorReason, message: string) {
    super(message);
    this.name = 'WebhookSignatureError';
    this.reason = reason;
  }
}

/**
 * A verified webhook event (webhook spec §6).
 *
 * `data` is left as an open record because its shape varies per `type` —
 * switch on `type`, then read the fields that event documents. Ignore
 * unrecognised fields: additive changes do NOT bump `apiVersion`.
 */
export interface MaytesWebhookEvent {
  /** Stable event id — identical across every retry. Deduplicate on this. */
  readonly id: string;
  /** e.g. `checkout.authorized`, `checkout.voided`, `webhook.test`. */
  readonly type: string;
  /** Envelope schema version, e.g. `2026-06`. Bumped only on breaking changes. */
  readonly apiVersion: string;
  /** When the event occurred. */
  readonly createdAt: string;
  /** Per-event payload. */
  readonly data: Record<string, unknown>;
}

export interface VerifyWebhookSignatureOptions {
  /**
   * Anti-replay window in seconds; defaults to 300 (5 minutes).
   *
   * Set to 0 to skip the freshness check entirely — TEST ONLY, for replaying
   * a stored delivery in a fixture. Never 0 in production: it makes any
   * captured delivery replayable forever.
   */
  readonly toleranceSeconds?: number;
}

/**
 * Verifies an inbound Maytes webhook delivery and returns the parsed event.
 *
 * Pass the **raw** request body — the exact bytes, before any JSON parsing.
 *
 *   import express from 'express';
 *   import { verifyWebhookSignature, WebhookSignatureError } from '@maytes/api-client';
 *
 *   app.post('/webhooks/maytes', express.raw({ type: 'application/json' }), (req, res) => {
 *     try {
 *       const event = verifyWebhookSignature(
 *         req.body,                                  // Buffer — raw bytes
 *         req.header('x-maytes-signature'),
 *         process.env.MAYTES_WEBHOOK_SECRET,
 *       );
 *       // ... handle event.type
 *       res.status(200).end();
 *     } catch (err) {
 *       if (err instanceof WebhookSignatureError) return res.status(400).end();
 *       throw err;
 *     }
 *   });
 *
 * @throws {WebhookSignatureError} if the delivery is not authentic. Respond
 *   400 and do NOT act on the body.
 */
export function verifyWebhookSignature(
  rawBody: string | Uint8Array,
  signatureHeader: string | null | undefined,
  signingSecret: string,
  options: VerifyWebhookSignatureOptions = {},
): MaytesWebhookEvent {
  const toleranceSeconds = options.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;

  const { timestamp, signatures } = parseSignatureHeader(signatureHeader);

  if (toleranceSeconds > 0) {
    // Digits checked before the arithmetic: Number('abc') is NaN, and every
    // comparison against NaN is false, so a garbage `t=` would otherwise slip
    // through the tolerance check (or land on the wrong error reason).
    if (!/^\d+$/.test(timestamp)) {
      throw new WebhookSignatureError('malformed_header', 'X-Maytes-Signature carries a non-numeric t= value.');
    }
    const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
    if (ageSeconds > toleranceSeconds) {
      throw new WebhookSignatureError(
        'timestamp_out_of_tolerance',
        `Webhook timestamp is outside the ${toleranceSeconds}s tolerance — possible replay.`,
      );
    }
  }

  // Bytes, not a string: the HMAC covers what was on the wire. A Buffer body
  // is hashed as-is so a non-UTF-8-clean payload can't be mangled by a decode.
  const body = typeof rawBody === 'string' ? Buffer.from(rawBody, 'utf8') : Buffer.from(rawBody);
  const expected = createHmac('sha256', signingSecret).update(`${timestamp}.`, 'utf8').update(body).digest('hex');

  // ANY match wins — during a rotation grace window the current secret's
  // signature and the previous secret's signature are both present.
  const matched = signatures.some((candidate) => constantTimeEquals(candidate, expected));
  if (!matched) {
    throw new WebhookSignatureError(
      'no_matching_signature',
      'No v1 signature matched the computed HMAC — wrong signing secret, or the body was modified in transit.',
    );
  }

  return parseEnvelope(body.toString('utf8'));
}

function parseSignatureHeader(header: string | null | undefined): {
  timestamp: string;
  signatures: string[];
} {
  if (!header) {
    throw new WebhookSignatureError('malformed_header', 'Missing X-Maytes-Signature header.');
  }

  let timestamp: string | undefined;
  const signatures: string[] = [];

  for (const part of header.split(',')) {
    const trimmed = part.trim();
    if (trimmed.startsWith('t=')) {
      timestamp = trimmed.slice(2);
    } else if (trimmed.startsWith('v1=')) {
      signatures.push(trimmed.slice(3));
    }
    // Unknown schemes (a future v2=) are ignored, not fatal — forward
    // compatibility: we may add a scheme alongside v1 before removing v1.
  }

  if (!timestamp || signatures.length === 0) {
    throw new WebhookSignatureError(
      'malformed_header',
      'X-Maytes-Signature is malformed — expected `t=<unix>,v1=<hex>`.',
    );
  }

  return { timestamp, signatures };
}

/**
 * Compares two hex digests without leaking a mismatch position through timing.
 *
 * Compared as ASCII text rather than decoded hex on purpose: `Buffer.from(x,
 * 'hex')` silently truncates at the first invalid character, so a malformed
 * `v1=` could otherwise decode to a short buffer that compares equal to a
 * prefix. The length guard runs first because timingSafeEqual throws on a
 * length mismatch; length is not a secret.
 */
function constantTimeEquals(candidate: string, expected: string): boolean {
  const a = Buffer.from(candidate, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseEnvelope(rawBody: string): MaytesWebhookEvent {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    throw new WebhookSignatureError('invalid_json', 'Signature verified but the body is not valid JSON.');
  }

  return {
    id: String(parsed.id ?? ''),
    type: String(parsed.type ?? ''),
    apiVersion: String(parsed.api_version ?? ''),
    createdAt: String(parsed.created_at ?? ''),
    data: (parsed.data as Record<string, unknown> | undefined) ?? {},
  };
}
