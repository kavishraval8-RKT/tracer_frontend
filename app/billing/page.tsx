import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCard } from "lucide-react";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { signOut } from "@/lib/actions/auth";
import { openPortal, startCheckout } from "@/lib/actions/billing";
import { supabaseConfigured } from "@/lib/config";
import { PAID_PLANS, readPlan, type Billing, type PaidPlanId } from "@/lib/plans";
import { hoursAgoIso, TIER_SESSION_HOURS } from "@/lib/quotas";
import { createClient } from "@/lib/supabase/server";
import { UsageCard } from "./UsageCard";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your Tracer plan and payment details.",
  robots: { index: false },
};

const card = "rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10";
const secondary =
  "inline-flex items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50";

const notices = {
  success: {
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-600/15",
    text: "Payment received. Your plan updates within a few seconds; refresh if it hasn't changed yet.",
  },
  cancelled: { tone: "bg-slate-50 text-slate-700 ring-slate-200", text: "Checkout cancelled. You haven't been charged." },
  unavailable: {
    tone: "bg-amber-50 text-amber-800 ring-amber-600/15",
    text: "Payments aren't open yet. Email hello@tracer.dev and we'll set you up.",
  },
  error: {
    tone: "bg-amber-50 text-amber-800 ring-amber-600/15",
    text: "Something went wrong with checkout. Please try again, or email hello@tracer.dev.",
  },
} as const;

function CheckoutButton({ plan, billing, primary }: { plan: PaidPlanId; billing: Billing; primary?: boolean }) {
  const price = PAID_PLANS[plan].price[billing];
  return (
    <form action={startCheckout}>
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="billing" value={billing} />
      <button type="submit" className={primary ? `${primaryCtaClass} w-full justify-center px-5 py-2.5 text-sm` : `${secondary} w-full`}>
        {price} / {billing === "yearly" ? "year" : "month"}
      </button>
    </form>
  );
}

function Unavailable() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className={`w-full max-w-lg text-center ${card} sm:p-12`}>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
          <CreditCard className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Accounts are almost here</h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-600">
          Tracer accounts and billing open soon. Join the waitlist and we&apos;ll email you when they do.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/download" className={`${primaryCtaClass} justify-center px-6 py-2.5 text-sm`}>
            Join the waitlist
          </Link>
          <Link href="/pricing" className={secondary}>
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function BillingPage(props: PageProps<"/billing">) {
  if (!supabaseConfigured) return <Unavailable />;

  const searchParams = await props.searchParams;
  const get = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" ? value : null;
  };

  // proxy.ts already redirects signed-out visitors; checked again here so the page is safe on its own.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, plan, billing, subscription_status, stripe_customer_id, current_period_end")
    .eq("id", user.id)
    .maybeSingle();

  // Two rolling windows off usage_ledger. RLS on that table lets each
  // user read their own rows via their session (no service role needed).
  // Aggregated in Node — hobby users write hundreds of rows/week, so
  // full-scan-then-sum is fine. Fetch the wider (7-day) window once and
  // filter for the 5-hour session in-memory to save a roundtrip.
  const weeklySinceIso = hoursAgoIso(7 * 24);
  const sessionSinceIso = hoursAgoIso(TIER_SESSION_HOURS);
  const { data: ledgerRows } = await supabase
    .from("usage_ledger")
    .select("endpoint, prompt_tokens, completion_tokens, status_code, created_at")
    .eq("user_id", user.id)
    .gte("created_at", weeklySinceIso);
  const rows = ledgerRows ?? [];
  const weeklyUsedTokens = rows.reduce(
    (sum, r) => sum + (r.prompt_tokens ?? 0) + (r.completion_tokens ?? 0),
    0,
  );
  const sessionUsedTokens = rows
    .filter((r) => (r.created_at ?? "") >= sessionSinceIso)
    .reduce(
      (sum, r) => sum + (r.prompt_tokens ?? 0) + (r.completion_tokens ?? 0),
      0,
    );
  const byEndpoint = new Map<string, { tokens: number; requests: number }>();
  for (const r of rows) {
    const key = r.endpoint ?? "?";
    const cur = byEndpoint.get(key) ?? { tokens: 0, requests: 0 };
    cur.tokens += (r.prompt_tokens ?? 0) + (r.completion_tokens ?? 0);
    cur.requests += 1;
    byEndpoint.set(key, cur);
  }
  const breakdown = [...byEndpoint.entries()]
    .map(([endpoint, v]) => ({ endpoint, tokens: v.tokens, requests: v.requests }))
    .sort((a, b) => b.tokens - a.tokens);

  const plan = (profile?.plan ?? "hobby") as "hobby" | PaidPlanId;
  const billing = (profile?.billing ?? "monthly") as Billing;
  const paid = plan !== "hobby";
  const wanted = readPlan({ get });
  const checkout = get("checkout");
  const notice = checkout && Object.hasOwn(notices, checkout) ? notices[checkout as keyof typeof notices] : null;
  const renews = profile?.current_period_end
    ? new Date(profile.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;
  const status = profile?.subscription_status === "past_due" ? "Payment past due" : profile?.subscription_status;

  return (
    <div className="px-6 pt-16 pb-8 sm:pt-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Your account</h1>
            <p className="mt-2 text-slate-600">{profile?.full_name ? `${profile.full_name} · ${user.email}` : user.email}</p>
          </div>
          <form action={signOut}>
            <button type="submit" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
              Sign out
            </button>
          </form>
        </div>

        {notice && <p role="status" className={`rounded-2xl px-5 py-4 text-sm ring-1 ${notice.tone}`}>{notice.text}</p>}

        <section className={card}>
          <p className="text-sm text-slate-500">Current plan</p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {paid ? `Tracer ${PAID_PLANS[plan].name}` : "Hobby"}
            </h2>
            <span className="text-slate-600">
              {paid ? `${PAID_PLANS[plan].price[billing]} / ${billing === "yearly" ? "year" : "month"}` : "Free"}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {paid
              ? [status && `Status: ${status}`, renews && `Renews ${renews}`].filter(Boolean).join(" · ")
              : "Limited hosted assistant under fair use. Upgrade for higher limits."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {paid && profile?.stripe_customer_id && (
              <form action={openPortal}>
                <button type="submit" className={`${primaryCtaClass} w-full justify-center px-5 py-2.5 text-sm sm:w-auto`}>
                  Manage subscription
                </button>
              </form>
            )}
            <Link href="/pricing" className={secondary}>
              Compare plans
            </Link>
          </div>
        </section>

        <UsageCard
          tier={plan}
          sessionUsedTokens={sessionUsedTokens}
          weeklyUsedTokens={weeklyUsedTokens}
          breakdown={breakdown}
        />

        {!paid && (
          <section className={card}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Upgrade</h2>
            {wanted.plan && (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-blue-50/60 p-5 ring-1 ring-blue-600/15 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Continue with Tracer {PAID_PLANS[wanted.plan].name}</p>
                  <p className="mt-1 text-sm text-slate-600">Secure checkout by Stripe. Cancel anytime.</p>
                </div>
                <div className="sm:w-48">
                  <CheckoutButton plan={wanted.plan} billing={wanted.billing} primary />
                </div>
              </div>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(Object.keys(PAID_PLANS) as PaidPlanId[]).map((id) => (
                <div key={id} className="rounded-2xl p-5 ring-1 ring-slate-200">
                  <p className="font-semibold text-slate-900">Tracer {PAID_PLANS[id].name}</p>
                  <div className="mt-4 grid gap-2">
                    <CheckoutButton plan={id} billing="monthly" />
                    <CheckoutButton plan={id} billing="yearly" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Paid plans include a 30-day money-back guarantee. See the{" "}
              <Link href="/refund" className="font-medium text-blue-600 hover:text-blue-700">
                refund policy
              </Link>
              .
            </p>
          </section>
        )}

        <p className="text-center text-sm text-slate-500">
          Billing questions? Email{" "}
          <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
            hello@tracer.dev
          </a>
        </p>
      </div>
    </div>
  );
}
