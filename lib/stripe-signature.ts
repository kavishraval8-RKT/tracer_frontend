import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_S = 300;

/**
 * Verifies a Stripe webhook `Stripe-Signature` header (t=timestamp,v1=hex HMAC-SHA256 of "t.payload").
 * Rejects stale timestamps to block replays. Mirrors Stripe's documented scheme without the SDK.
 */
export function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
  nowS = Math.floor(Date.now() / 1000),
): boolean {
  if (!header || !secret) return false;
  const pairs = header.split(",").map((part) => {
    const i = part.indexOf("=");
    return [part.slice(0, i).trim(), part.slice(i + 1).trim()] as const;
  });
  const timestamp = Number(pairs.find(([k]) => k === "t")?.[1]);
  const signatures = pairs.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!Number.isFinite(timestamp) || signatures.length === 0 || Math.abs(nowS - timestamp) > TOLERANCE_S) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest();
  return signatures.some((sig) => {
    const given = Buffer.from(sig, "hex");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
