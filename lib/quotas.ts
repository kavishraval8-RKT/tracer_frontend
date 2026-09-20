/**
 * Tier quota constants — mirrored from backend/app/settings.py.
 *
 * If you change TIER_QUOTAS here, change it there too. A future
 * refactor might move quotas into a Supabase table so both sides
 * read from one source; for now the duplication is small enough to
 * keep hand-synced.
 */
export const TIER_QUOTAS = {
  hobby: 200_000,
  basic: 1_000_000,
  pro: 10_000_000,
} as const;

export type Tier = keyof typeof TIER_QUOTAS;

export function quotaFor(tier: string): number {
  return TIER_QUOTAS[tier as Tier] ?? TIER_QUOTAS.hobby;
}

/** ISO timestamp for the first millisecond of the current UTC month. */
export function monthStartIso(now = new Date()): string {
  const d = new Date(now);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

export function formatTokens(n: number): string {
  return n.toLocaleString("en-US");
}
