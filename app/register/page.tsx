"use client";

import { Suspense, useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck } from "lucide-react";
import { HoneypotFields } from "@/components/ui/HoneypotFields";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { signUp } from "@/lib/actions/auth";
import type { FormState } from "@/lib/forms";
import { PAID_PLANS, planQuery, readPlan, type Billing, type PaidPlanId } from "@/lib/plans";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

export default function RegisterPage() {
  // useSearchParams needs a Suspense boundary on prerendered routes; the fallback is the plan-less form.
  return (
    <Suspense fallback={<RegisterCard plan={null} billing="monthly" />}>
      <RegisterWithPlan />
    </Suspense>
  );
}

function RegisterWithPlan() {
  const { plan, billing } = readPlan(useSearchParams());
  return <RegisterCard plan={plan} billing={billing} />;
}

function RegisterCard({ plan, billing }: { plan: PaidPlanId | null; billing: Billing }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signUp, null);
  const chosen = plan ? PAID_PLANS[plan] : null;
  const error = state && !state.ok ? state.message : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        {state?.ok ? (
          <div role="status" className="py-4 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-600/15">
              <MailCheck className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Check your email</h1>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-600">
              {state.message}
              {chosen && ` After confirming, you'll continue to Tracer ${chosen.name}.`}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your account</h1>
              <p className="mt-2 text-slate-600">
                {chosen ? `Then you're ready to start Tracer ${chosen.name}.` : "Start designing circuits with AI assistance."}
              </p>
            </div>

            {chosen && (
              <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-blue-600/15 bg-blue-50/60 px-4 py-3 text-sm">
                <span>
                  <span className="font-semibold text-slate-900">{chosen.name} plan</span>
                  <span className="text-slate-600">
                    {" "}
                    · {chosen.price[billing]}/{billing === "yearly" ? "year" : "month"}
                  </span>
                </span>
                <Link href="/pricing" className="shrink-0 font-medium text-blue-600 hover:text-blue-700">
                  Change
                </Link>
              </div>
            )}

            <form action={action} className="relative space-y-5">
              <HoneypotFields />
              {plan && (
                <>
                  <input type="hidden" name="plan" value={plan} />
                  <input type="hidden" name="billing" value={billing} />
                </>
              )}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  defaultValue={state?.fields?.name}
                  className={field}
                  placeholder="Your name"
                />
              </div>

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
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
                  className={field}
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "register-error" : undefined}
                  className={field}
                  placeholder="Repeat your password"
                />
                {error && (
                  <p id="register-error" role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className={`${primaryCtaClass} w-full justify-center py-3 text-sm disabled:pointer-events-none disabled:opacity-70`}
              >
                {pending ? "Creating account…" : chosen ? `Create account and start ${chosen.name}` : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href={`/login${planQuery(plan, billing)}`} className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
