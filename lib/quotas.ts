/**
 * Tier quota constants — mirrored from backend/app/settings.py.
 *
 * Two-window model: every request has to fit under both a rolling
 * 5-hour session cap AND a rolling 7-day weekly cap.
 *
 * Session limits prevent one user draining the shared free-tier
 * Gemini pool in a burst; weekly limits set the per-plan ceiling.
 *
 * If you change these here, change backend/app/settings.py too.
 */
export const TIER_SESSION_HOURS = 5;

export const TIER_SESSION_QUOTAS = {
  hobby: 30_000,
  basic: 300_000,
  pro: 1_300_000,
} as const;

export const TIER_WEEKLY_QUOTAS = {
  hobby: 100_000,
  basic: 1_000_000,
  pro: 4_000_000,
} as const;

export type Tier = keyof typeof TIER_WEEKLY_QUOTAS;

export function sessionQuotaFor(tier: string): number {
  return TIER_SESSION_QUOTAS[tier as Tier] ?? TIER_SESSION_QUOTAS.hobby;
}

export function weeklyQuotaFor(tier: string): number {
  return TIER_WEEKLY_QUOTAS[tier as Tier] ?? TIER_WEEKLY_QUOTAS.hobby;
}

/** ISO timestamp for `hours` ago from now. */
export function hoursAgoIso(hours: number, now = new Date()): string {
  return new Date(now.getTime() - hours * 3_600_000).toISOString();
}

export function formatTokens(n: number): string {
  return n.toLocaleString("en-US");
}
