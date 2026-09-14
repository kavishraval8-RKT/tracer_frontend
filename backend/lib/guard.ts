// Validation and abuse guards for public forms.
// No framework imports, so lib/security.test.mjs can run these directly with `node --test`.

const MIN_FILL_MS = 2000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** True when a submission looks automated: the hidden honeypot is filled, or the form was sent faster than a person can type. */
export function looksAutomated(honeypot: unknown, startedAt: unknown, now = Date.now()): boolean {
  if (typeof honeypot === "string" && honeypot !== "") return true;
  const started = Number(startedAt);
  return !Number.isFinite(started) || started <= 0 || now - started < MIN_FILL_MS;
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// ponytail: in-memory and per server instance. Serverless hosts run many instances, so move this to a shared
// store (e.g. Upstash Redis or a Supabase table) before relying on it under real traffic.
/** Fixed-window limiter. Returns false once `key` has used `limit` attempts in the current window. */
export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    if (buckets.size > 5000) for (const [k, b] of buckets) if (now >= b.resetAt) buckets.delete(k);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}

/** Best-effort client IP for rate limiting only (the header is client-controlled, never use it for auth). */
export function clientIp(headers: { get(name: string): string | null }): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

/** Trimmed, non-empty string no longer than `max`, else null. */
export function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  return v && v.length <= max ? v : null;
}

/** Lower-cased email if it looks valid, else null. */
export function email(value: unknown): string | null {
  const v = text(value, 254);
  return v && EMAIL.test(v) ? v.toLowerCase() : null;
}

/** Value if it is one of `allowed`, else null. */
export function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

/** Same-site path for post-login redirects. Blocks absolute and protocol-relative URLs (open redirects). */
export function safeNextPath(value: unknown, fallback = "/billing"): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}
