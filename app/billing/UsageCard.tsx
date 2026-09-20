import { formatTokens, quotaFor } from "@/lib/quotas";

const card =
  "rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10";

type Props = {
  tier: string;
  usedTokens: number;
  breakdown: { endpoint: string; tokens: number; requests: number }[];
};

/**
 * Read-only usage panel for the current billing period. The token counts
 * come from Supabase's usage_ledger (server-side aggregation in
 * page.tsx), so the plugin's Python backend doesn't need to be reachable
 * for this page to render.
 */
export function UsageCard({ tier, usedTokens, breakdown }: Props) {
  const quota = quotaFor(tier);
  const remaining = Math.max(0, quota - usedTokens);
  const pct = Math.min(100, Math.round((usedTokens / quota) * 100));
  const bar =
    pct >= 100
      ? "bg-rose-500"
      : pct >= 85
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <section className={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">This month</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Token usage
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">
            {formatTokens(usedTokens)}
          </span>{" "}
          / {formatTokens(quota)} tokens
        </p>
      </div>

      <div className="mt-6">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div
            className={`h-full transition-[width] duration-500 ${bar}`}
            style={{ width: `${Math.max(pct, 1)}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {remaining === 0 ? (
            <span className="text-rose-600">
              Quota reached. New requests will fail until next month or an
              upgrade.
            </span>
          ) : pct >= 85 ? (
            <span className="text-amber-700">
              {formatTokens(remaining)} tokens left — approaching your monthly
              cap.
            </span>
          ) : (
            <>{formatTokens(remaining)} tokens remaining.</>
          )}
        </p>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-sm font-medium text-slate-700">By mode</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {breakdown.map((row) => (
              <li
                key={row.endpoint}
                className="flex items-center justify-between gap-4"
              >
                <span className="font-mono text-xs text-slate-500">
                  {row.endpoint}
                </span>
                <span>
                  <span className="font-medium text-slate-900">
                    {formatTokens(row.tokens)}
                  </span>{" "}
                  tokens ·{" "}
                  <span className="text-slate-500">
                    {row.requests} request{row.requests === 1 ? "" : "s"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-500">
        Counts are estimated (~4 characters ≈ 1 token) and reset on the 1st
        of each calendar month (UTC). Overage returns HTTP 402; the plugin
        surfaces this as a "quota exceeded" bubble.
      </p>
    </section>
  );
}
