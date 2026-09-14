"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { PAID_PLANS, planQuery, readPlan, type Billing, type PaidPlanId } from "@/lib/plans";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

export default function LoginPage() {
  // useSearchParams needs a Suspense boundary on prerendered routes; the fallback is the plan-less form.
  return (
    <Suspense fallback={<LoginCard plan={null} billing="monthly" />}>
      <LoginWithPlan />
    </Suspense>
  );
}

function LoginWithPlan() {
  const { plan, billing } = readPlan(useSearchParams());
  return <LoginCard plan={plan} billing={billing} />;
}

function LoginCard({ plan, billing }: { plan: PaidPlanId | null; billing: Billing }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const chosen = plan ? PAID_PLANS[plan] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ponytail: not connected to an auth backend yet, so nothing is sent or stored.
    // Sign in here, then continue to checkout when `plan` is set, otherwise to /billing.
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">
            {chosen ? `Sign in to start Tracer ${chosen.name}.` : "Sign in to continue to Tracer."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={field}
              placeholder="Your password"
            />
          </div>

          <button type="submit" className={`${primaryCtaClass} w-full justify-center py-3 text-sm`}>
            Sign in
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
