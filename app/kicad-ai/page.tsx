import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquareText, Route, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

export const metadata: Metadata = {
  title: "KiCad AI",
  description: "Bring AI into your KiCad workflow with Tracer.",
};

const steps = [
  { n: "01", title: "Describe", desc: "Describe your circuit requirements in natural language." },
  {
    n: "02",
    title: "Understand",
    desc: "The AI understands component specifications, design constraints, and best practices.",
  },
  { n: "03", title: "Build and check", desc: "It generates schematics, routes traces, and validates designs against your rules." },
];

const features = [
  {
    icon: MessageSquareText,
    title: "Natural language circuit description",
    desc: "Say what the circuit needs instead of drawing every connection by hand.",
  },
  {
    icon: Route,
    title: "Automated placement and routing",
    desc: "Tracer places components and routes traces on the board you already have open.",
  },
  {
    icon: ShieldCheck,
    title: "Real-time design rule checking",
    desc: "Changes are checked against your design rules as they're made.",
  },
  {
    icon: Sparkles,
    title: "Multi-model AI support",
    desc: "Work with Claude, GPT, Gemini, and Ohm from the same prompt bar.",
  },
  {
    icon: Wrench,
    title: "Contextual suggestions and fixes",
    desc: "Get suggestions and error fixes grounded in your actual design.",
  },
];

export default function KiCadAIPage() {
  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          AI for KiCad, <span className="text-slate-500">inside the editor.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Tracer is the first truly integrated AI assistant for KiCad. Unlike chat interfaces that require context
          switching, it lives directly in your schematic and PCB editors.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <PrimaryCta className="px-6 py-3 text-base" />
          <Link href="/instructions" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Read the docs <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      {/* How it works */}
      <section className="mx-auto mt-24 max-w-6xl rounded-[2rem] bg-[linear-gradient(180deg,#DEE3F1_0%,#ECEFF7_100%)] p-8 ring-1 ring-black/[0.03] sm:p-12">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          How it <span className="text-slate-500">works.</span>
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-12px_rgba(30,41,80,0.2)] ring-1 ring-black/[0.04]">
              <span className="text-4xl font-light tracking-tight text-slate-900">{s.n}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Key features */}
      <section className="mx-auto mt-24 max-w-6xl sm:mt-32">
        <h2 className="text-balance text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Key <span className="text-slate-500">features</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
                <f.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-6xl rounded-[2rem] border border-black/[0.04] bg-white px-8 py-14 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:mt-32 sm:px-16 sm:py-20">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Try Tracer <span className="text-slate-500">on your next board.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
          Join the waitlist and we&apos;ll let you know the moment your access is ready.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryCta className="px-5 py-2.5 text-sm" />
        </div>
      </section>
    </div>
  );
}
