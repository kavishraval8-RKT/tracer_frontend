"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { signIn } from "@/lib/actions/auth";
import type { FormState } from "@/lib/forms";
import { PAID_PLANS, planQuery, readPlan, type Billing, type PaidPlanId } from "@/lib/plans";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

export default function LoginPage() {
  // useSearchParams needs a Suspense boundary on prerendered routes; the fallback is the plan-less form.
  return (
    <Suspense fallback={<LoginCard plan={null} billing="monthly" linkError={false} next={null} />}>
      <LoginWithPlan />
    </Suspense>
  );
}

function LoginWithPlan() {
  const params = useSearchParams();
  const { plan, billing } = readPlan(params);
  const next = params.get("next");
  return (
    <LoginCard
      plan={plan}
      billing={billing}
      linkError={params.get("error") === "confirm"}
      next={next && next.startsWith("/") ? next : null}
    />
  );
}

function LoginCard({
  plan,
  billing,
  linkError,
  next,
}: {
  plan: PaidPlanId | null;
  billing: Billing;
  linkError: boolean;
  next: string | null;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, null);
  const chosen = plan ? PAID_PLANS[plan] : null;
  const error = state && !state.ok ? state.message : linkError ? "That confirmation link is invalid or has expired." : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">
            {chosen ? `Sign in to start Tracer ${chosen.name}.` : "Sign in to continue to Tracer."}
          </p>
        </div>

        <form action={action} className="space-y-5">
          {plan && (
            <>
              <input type="hidden" name="plan" value={plan} />
              <input type="hidden" name="billing" value={billing} />
            </>
          )}
          {next && <input type="hidden" name="next" value={next} />}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              spellCheck={false}
              autoComplete="email"
              required
              defaultValue={state?.fields?.email}
              className={field}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error" : undefined}
              className={field}
              placeholder="Your password"
            />
            {error && (
              <p id="login-error" role="alert" className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={`${primaryCtaClass} w-full justify-center py-3 text-sm disabled:pointer-events-none disabled:opacity-70`}
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href={`/register${planQuery(plan, billing)}`} className="font-medium text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
