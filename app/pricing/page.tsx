"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Hobby",
      price: { monthly: "Free", yearly: "Free" },
      description: "Perfect for learning and experimentation",
      features: [
        "No credit card required",
        "Download plugin",
        "Limited hosted assistant (fair use)",
        "Community support",
      ],
      cta: "Get Started",
      href: "/download",
      highlighted: false,
    },
    {
      name: "Basic",
      price: { monthly: "€10", yearly: "€100" },
      description: "For regular users and small projects",
      features: [
        "Everything in Hobby",
        "Hosted AI assistant inside KiCad",
        "Higher limits for everyday questions",
      ],
      cta: "Start Basic",
      href: "/register",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { monthly: "€20", yearly: "€200" },
      description: "Best for professional daily use",
      badge: "Recommended",
      features: [
        "Everything in Basic",
        "Stronger limits for professional daily use",
        "Early access to new features",
        "Priority support",
      ],
      cta: "Start Pro",
      href: "/register",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      description: "Custom solutions for teams and organizations",
      features: [
        "Custom seats and AI quotas",
        "Custom gateway limits",
        "Dedicated support",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlighted: false,
    },
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
            Tracer Cloud
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 lg:text-2xl">
            Hosted AI for the Circuit Copilot KiCad plugin.
          </p>

          <div className="inline-flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                !isYearly ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                isYearly ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-8 transition-all ${
                tier.highlighted
                  ? "border-blue-200 bg-blue-50/50 shadow-[0_8px_30px_rgb(37,99,235,0.12)]"
                  : "border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-semibold text-slate-900">{tier.name}</h3>
                <p className="mb-4 text-sm text-slate-600">{tier.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-slate-900">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  {tier.price.monthly !== "Free" && tier.price.monthly !== "Custom" && (
                    <span className="text-slate-600">/{isYearly ? "year" : "month"}</span>
                  )}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block rounded-full py-2.5 text-center text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-blue-600 text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:bg-blue-700"
                    : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 lg:text-5xl">Need something custom?</h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            When you outgrow self-serve plans, we set custom seats, AI and gateway quotas. Share a short note on size and needs.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
