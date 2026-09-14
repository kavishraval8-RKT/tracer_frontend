"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Building2, ChevronDown, Mail } from "lucide-react";
import { reveal } from "@/lib/motion";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";
import { HoneypotFields } from "@/components/ui/HoneypotFields";
import { sendContact } from "@/lib/actions/forms";
import { TOPICS, type FormState } from "@/lib/forms";

const EMAIL = "hello@tracer.dev";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

const channels = [
  {
    icon: Mail,
    title: "Email directly",
    desc: "Prefer your own inbox? Write to us any time.",
    link: { href: `mailto:${EMAIL}`, label: EMAIL },
  },
  {
    icon: BookOpen,
    title: "Setup and troubleshooting",
    desc: "Most installation and usage questions are answered in the getting-started guide.",
    link: { href: "/instructions#troubleshooting", label: "Read the guide →" },
  },
  {
    icon: Building2,
    title: "Enterprise",
    desc: "Custom seats, AI quotas, and SLAs for teams and organizations.",
    link: { href: "/pricing", label: "See plans →" },
  },
];

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendContact, null);
  const error = state && !state.ok ? state.message : null;

  if (state?.ok) {
    return (
      <div role="status" className="py-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-600/15">
          <Mail className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">Message sent</h2>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-600">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Send a message</h2>
      <form action={action} className="relative mt-6 space-y-5">
        <HoneypotFields />
        <div className="grid gap-5 sm:grid-cols-2">
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
              autoComplete="email"
              required
              defaultValue={state?.fields?.email}
              className={field}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="topic" className="mb-2 block text-sm font-medium text-slate-700">
            Topic
          </label>
          <div className="relative">
            <select id="topic" name="topic" defaultValue={TOPICS[0]} className={`${field} appearance-none pr-10`}>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={5000}
            defaultValue={state?.fields?.message}
            className={`${field} resize-none`}
            placeholder="Tell us what you're working on and how we can help."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={`${primaryCtaClass} w-full justify-center py-3 text-sm disabled:pointer-events-none disabled:opacity-70`}
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </form>
    </>
  );
}

export default function ContactPage() {
  // Bumped by "Send another message" so the form starts fresh.
  const [formKey, setFormKey] = useState(0);

  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Let&apos;s talk <span className="text-slate-500">about your boards.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Have a question, need support, or want to discuss enterprise plans? We&apos;re here to help.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
        <motion.div
          {...reveal()}
          className="rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10"
        >
          <ContactForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />
        </motion.div>

        <div className="space-y-4">
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              {...reveal(0.06 + i * 0.06)}
              className="flex gap-4 rounded-[1.5rem] border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
                <c.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold tracking-tight text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                {c.link.href.startsWith("mailto:") ? (
                  <a href={c.link.href} className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
                    {c.link.label}
                  </a>
                ) : (
                  <Link href={c.link.href} className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
                    {c.link.label}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
