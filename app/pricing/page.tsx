"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { reveal } from "@/lib/motion";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PAID_PLANS, planQuery, type Billing, type PaidPlanId } from "@/lib/plans";

type Tier = {
  name: string;
  price: { monthly: string; yearly: string };
  note: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  plan?: PaidPlanId;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Hobby",
    price: { monthly: "Free", yearly: "Free" },
    note: "No credit card required",
    description: "Perfect for learning and experimentation",
    features: ["Download plugin", "Limited hosted assistant (fair use)", "Community support"],
    cta: "Get started",
    href: "/download",
  },
  {
    name: PAID_PLANS.basic.name,
    price: PAID_PLANS.basic.price,
    note: "",
    description: "For regular users and small projects",
    features: ["Everything in Hobby", "Hosted AI assistant inside KiCad", "Higher limits for everyday questions"],
    cta: "Start Basic",
    href: "/register",
    plan: "basic",
  },
  {
    name: PAID_PLANS.pro.name,
    price: PAID_PLANS.pro.price,
    note: "",
    description: "Best for professional daily use",
    features: [
      "Everything in Basic",
      "Stronger limits for professional daily use",
      "Early access to new features",
      "Priority support",
    ],
    cta: "Start Pro",
    href: "/register",
    plan: "pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    note: "Tailored to your team",
    description: "Custom solutions for teams and organizations",
    features: ["Custom seats and AI quotas", "Custom gateway limits", "Dedicated support", "SLA guarantees"],
    cta: "Contact sales",
    href: "/contact",
  },
];

const secondaryButton =
  "inline-flex w-full items-center justify-center rounded-[10px] border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50";

const faqs = [
  {
    q: "Can I start for free?",
    a: <>Yes. The Hobby plan needs no credit card and includes the plugin with a limited hosted assistant under fair use.</>,
  },
  {
    q: "What's the difference between Basic and Pro?",
    a: (
      <>
        Basic adds the hosted AI assistant inside KiCad with higher limits for everyday questions. Pro raises those
        limits for professional daily use and adds early access to new features and priority support.
      </>
    ),
  },
  {
    q: "Can I cancel anytime?",
    a: <>Yes. Cancel from your billing page at any time. Cancellation takes effect at the end of the current billing cycle.</>,
  },
  {
    q: "Is there a refund policy?",
    a: (
      <>
        Paid plans come with a 30-day money-back guarantee. See the{" "}
        <Link href="/refund" className="font-medium text-blue-600 hover:text-blue-700">
          refund policy
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    q: "What does Enterprise include?",
    a: <>Custom seats and AI quotas, custom gateway limits, dedicated support, and SLA guarantees.</>,
  },
];

function priceNote(tier: Tier, billing: Billing) {
  if (!tier.plan) return tier.note;
  return billing === "yearly" ? "Billed yearly · 2 months free" : "Billed monthly";
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Simple pricing <span className="text-slate-500">for every board.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Hosted AI for the Tracer KiCad plugin. Start free and upgrade when you need more.
        </p>

        <div
          role="group"
          aria-label="Billing period"
          className="mt-10 inline-flex items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-black/[0.06]"
        >
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={billing === b}
              onClick={() => setBilling(b)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billing === b
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {b === "monthly" ? "Monthly" : "Yearly"}
              {b === "yearly" && (
                <span className={`ml-2 text-xs ${billing === b ? "text-white/80" : "text-blue-600"}`}>2 months free</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, i) => {
          const href = tier.plan ? `${tier.href}${planQuery(tier.plan, billing)}` : tier.href;
          const hl = tier.highlighted;
          return (
            <motion.div
              key={tier.name}
              {...reveal(i * 0.06)}
              className={`relative flex flex-col overflow-hidden rounded-[2rem] p-8 ${
                hl
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl"
                  : "border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              }`}
            >
              {hl && <div aria-hidden className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />}

              <div className="relative flex items-center justify-between gap-2">
                <h2 className={`text-xl font-semibold tracking-tight ${hl ? "text-white" : "text-slate-900"}`}>{tier.name}</h2>
                {hl && (
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/25">
                    Recommended
                  </span>
                )}
              </div>
              <p className={`relative mt-2 text-sm leading-relaxed ${hl ? "text-white/80" : "text-slate-600"}`}>
                {tier.description}
              </p>

              <div className="relative mt-8 flex items-baseline gap-1.5">
                <span className={`text-5xl font-semibold tracking-tight ${hl ? "text-white" : "text-slate-900"}`}>
                  {tier.price[billing]}
                </span>
                {tier.plan && (
                  <span className={hl ? "text-white/80" : "text-slate-500"}>/{billing === "yearly" ? "year" : "month"}</span>
                )}
              </div>
              <p className={`relative mt-2 text-sm ${hl ? "text-white/75" : "text-slate-500"}`}>{priceNote(tier, billing)}</p>

              <ul className="relative mt-8 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${hl ? "text-white" : "text-blue-600"}`} />
                    <span className={hl ? "text-white/90" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8">
                {hl ? (
                  <Link
                    href={href}
                    className="inline-flex w-full items-center justify-center rounded-[10px] bg-white py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
                  >
                    {tier.cta}
                  </Link>
                ) : tier.plan ? (
                  <Link href={href} className={`${primaryCtaClass} w-full justify-center py-2.5 text-sm`}>
                    {tier.cta}
                  </Link>
                ) : (
                  <Link href={href} className={secondaryButton}>
                    {tier.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
        {["30-day money-back guarantee", "Cancel anytime"].map((t) => (
          <span key={t} className="flex items-center gap-2">
            <Check aria-hidden className="h-4 w-4 text-blue-600" />
            {t}
          </span>
        ))}
      </div>

      {/* FAQ */}
      <section className="mx-auto mt-28 max-w-3xl sm:mt-36">
        <motion.h2 {...reveal()} className="text-4xl font-semibold tracking-tight text-slate-900">
          Pricing questions
        </motion.h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Enterprise */}
      <motion.section
        {...reveal()}
        className="mx-auto mt-28 flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:mt-36 sm:p-12 md:flex-row md:items-center"
      >
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Need something custom? <span className="text-slate-500">Let&apos;s talk.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            When you outgrow self-serve plans, we set custom seats, AI and gateway quotas. Share a short note on size
            and needs.
          </p>
        </div>
        <Link href="/contact" className={`${primaryCtaClass} shrink-0 px-6 py-3 text-sm`}>
          Contact sales
        </Link>
      </motion.section>
    </div>
  );
}
