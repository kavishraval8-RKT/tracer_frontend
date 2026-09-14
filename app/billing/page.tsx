import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your Tracer plan and payment details.",
  robots: { index: false },
};

export default function BillingPage() {
  // ponytail: no auth yet, so every visitor sees the signed-out state.
  // Once sessions exist, protect this route in proxy.ts and render the real plan, usage, and subscription controls.
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-black/[0.04] bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
          <CreditCard className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">Billing</h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-600">
          Sign in to see your plan and usage and to manage your subscription.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/login" className={`${primaryCtaClass} justify-center px-6 py-2.5 text-sm`}>
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-[10px] border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            View plans
          </Link>
        </div>

        <p className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
          Billing questions? Email{" "}
          <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
            hello@tracer.dev
          </a>
        </p>
      </div>
    </div>
  );
}
