/**
 * OAuth 2.0 Device Authorization Grant (RFC 8628) helpers.
 *
 * The web hosts the flow; the KiCad plugin drives it. The plugin never
 * touches Supabase Auth directly — after the user activates a user_code on
 * this site, we mint a short-lived device JWT and return it on the next
 * plugin poll. The Python LLM backend validates that JWT with the shared
 * TRACER_DEVICE_JWT_SECRET.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const DEVICE_JWT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const DEVICE_CODE_TTL_SECONDS = 15 * 60;          // 15 min for the user to act
const POLL_INTERVAL_SECONDS = 5;

// Crockford base32 minus I, L, O, U — no easily-confused glyphs.
const USER_CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function randomFromAlphabet(alphabet: string, length: number): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/** 8-char human-friendly code the user types on /activate. */
export function newUserCode(): string {
  const raw = randomFromAlphabet(USER_CODE_ALPHABET, 8);
  return `${raw.slice(0, 4)}-${raw.slice(4)}`; // ABCD-1234
}

/** Opaque device_code the plugin holds. Never displayed. */
export function newDeviceCode(): string {
  return randomBytes(32).toString("base64url");
}

export function deviceCodeExpiryDate(): Date {
  return new Date(Date.now() + DEVICE_CODE_TTL_SECONDS * 1000);
}

export const deviceFlowConstants = {
  DEVICE_JWT_TTL_SECONDS,
  DEVICE_CODE_TTL_SECONDS,
  POLL_INTERVAL_SECONDS,
};

/**
 * Mint a compact device JWT (HS256). Not using @auth or jose to avoid a
 * new dep — HS256 is 40 lines of crypto and the Python backend verifies
 * with the same shared secret.
 *
 * Payload:
 *   { sub, tier, iat, exp, iss: "tracer-web", aud: "tracer-backend" }
 */
export function mintDeviceJwt(payload: {
  sub: string;
  tier: string;
  jti: string; // required — Python backend checks jti == profiles.active_device_jti
}): string {
  const secret = process.env.TRACER_DEVICE_JWT_SECRET;
  if (!secret) throw new Error("TRACER_DEVICE_JWT_SECRET not set");
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iss: "tracer-web",
    aud: "tracer-backend",
    iat: now,
    exp: now + DEVICE_JWT_TTL_SECONDS,
  };
  const header = { alg: "HS256", typ: "JWT" };
  const seg = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${seg(header)}.${seg(body)}`;
  const sig = createHmac("sha256", secret).update(unsigned).digest("base64url");
  return `${unsigned}.${sig}`;
}

/** Opaque per-device identifier baked into the JWT and stored on profiles. */
export function newJti(): string {
  return randomBytes(16).toString("base64url");
}

/** Constant-time compare so response-time can't reveal partial match. */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
