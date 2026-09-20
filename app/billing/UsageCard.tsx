import {
  formatTokens,
  sessionQuotaFor,
  weeklyQuotaFor,
  TIER_SESSION_HOURS,
} from "@/lib/quotas";

const card =
  "rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10";

type Props = {
  tier: string;
  sessionUsedTokens: number;
  weeklyUsedTokens: number;
  breakdown: { endpoint: string; tokens: number; requests: number }[];
};

/**
 * Read-only usage panel for both quota windows: a rolling 5-hour session
 * window and a rolling 7-day weekly window. Every request has to fit
 * under both.
 */
export function UsageCard({
  tier,
  sessionUsedTokens,
  weeklyUsedTokens,
  breakdown,
}: Props) {
  const sessionQuota = sessionQuotaFor(tier);
  const weeklyQuota = weeklyQuotaFor(tier);

  return (
    <section className={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">This period</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Token usage
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Two rolling windows — a request has to fit both.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <UsageBar
          label={`${TIER_SESSION_HOURS}-hour session`}
          hint="Prevents draining the free-tier LLM pool in one sitting."
          used={sessionUsedTokens}
          quota={sessionQuota}
        />
        <UsageBar
          label="7-day weekly"
          hint="Rolling; resets 168h after each individual request."
          used={weeklyUsedTokens}
          quota={weeklyQuota}
        />
      </div>

      {breakdown.length > 0 && (
        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-sm font-medium text-slate-700">
            By mode (last 7 days)
          </p>
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
        Counts are estimated (~4 characters ≈ 1 token). Both windows are
        rolling — nothing "resets on the 1st". Overage returns HTTP 402;
        the plugin surfaces this as a "quota exceeded" bubble.
      </p>
    </section>
  );
}

function UsageBar({
  label,
  hint,
  used,
  quota,
}: {
  label: string;
  hint: string;
  used: number;
  quota: number;
}) {
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const remaining = Math.max(0, quota - used);
  const bar =
    pct >= 100
      ? "bg-rose-500"
      : pct >= 85
      ? "bg-amber-500"
      : "bg-emerald-500";
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{formatTokens(used)}</span>{" "}
          / {formatTokens(quota)} tokens
        </p>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label}
      >
        <div
          className={`h-full transition-[width] duration-500 ${bar}`}
          style={{ width: `${Math.max(pct, 1)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {remaining === 0 ? (
          <span className="text-rose-600">Cap reached — new sends will fail.</span>
        ) : pct >= 85 ? (
          <span className="text-amber-700">
            {formatTokens(remaining)} tokens left — approaching the cap.
          </span>
        ) : (
          <>
            {formatTokens(remaining)} tokens remaining. {hint}
          </>
        )}
      </p>
    </div>
  );
}
