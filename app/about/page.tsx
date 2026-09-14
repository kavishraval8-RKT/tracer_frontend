"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Lock, Ruler, Undo2 } from "lucide-react";
import { reveal } from "@/lib/motion";
import { PrimaryCta } from "@/components/ui/PrimaryCta";
import FutureVision from "@/components/FutureVision";

const iteration = [
  { label: "Software: change → test", time: "seconds", width: "5%", color: "bg-blue-500" },
  { label: "Hardware: constraint change → re-route", time: "days", width: "100%", color: "bg-slate-800" },
];

const journey = [
  {
    phase: "01",
    title: "The bottleneck",
    desc: "Every constraint change in hardware means manual re-routing and re-checking, often for days.",
  },
  {
    phase: "02",
    title: "The missing environment",
    desc: "AI models can reason about circuits, but without an EDA tool they can't place a part or route a trace.",
  },
  {
    phase: "03",
    title: "The copilot",
    desc: "Tracer connects that reasoning to KiCad, turning natural-language intent into real layout changes.",
  },
  {
    phase: "04",
    title: "Tracer today",
    desc: "Agentic drafting and smart DRC checks, inside the KiCad editor engineers already use.",
  },
];

const principles = [
  {
    icon: Undo2,
    title: "Engineers stay in control",
    desc: "Every change is staged for review, and any prompt can be undone. Tracer proposes; you decide.",
  },
  {
    icon: Ruler,
    title: "Your rules are the rules",
    desc: "Tracer reads your .kicad_dru constraints and design rules, and works inside them.",
  },
  {
    icon: Lock,
    title: "Your IP stays yours",
    desc: "Designs are never used to train public AI models. Local-only processing is available for teams.",
  },
  {
    icon: Layers,
    title: "Meet engineers where they work",
    desc: "No exports and no new app to learn. Tracer lives inside KiCad today; the AI-native editor comes next.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Hardware should move <span className="text-slate-500">at the speed of thought.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Tracer is built by a solo engineer who got tired of waiting on the EDA tool. Here&apos;s why it
          exists, what it does today, and where it&apos;s going.
        </p>
      </motion.div>

      {/* Bento */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* The Friction */}
        <motion.div
          {...reveal()}
          className="flex flex-col rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 md:col-span-2"
        >
          <h2 className="text-balance text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-3xl">
            As a solo engineer, the speed limit on hardware development isn&apos;t physics—it is the EDA tool.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            In software, iterating is instant. In hardware, a single constraint change means days of manual
            re-routing.{" "}
            <span className="font-medium text-blue-600">Hardware needs to move at the speed of thought.</span>
          </p>

          <div className="mt-auto space-y-4 pt-10">
            {iteration.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 flex justify-between gap-4 text-xs">
                  <span className="font-medium text-slate-700">{row.label}</span>
                  <span className="shrink-0 text-slate-500">{row.time}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className={`h-full rounded-full ${row.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: row.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Bridge */}
        <motion.div
          {...reveal(0.1)}
          className="relative flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-xl sm:p-10"
        >
          <div aria-hidden className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight">Tracer Today</h2>
          <p className="relative mt-3 leading-relaxed text-white/85">
            AI needs an environment to act. Tracer is the missing link—a copilot living directly inside KiCad
            that translates natural language intent into physical traces and layout changes.
          </p>

          <div className="relative mt-auto space-y-1.5 pt-8 text-sm" aria-hidden>
            <div className="rounded-xl bg-white/15 px-3 py-2 ring-1 ring-white/20">“Route USB as a 90 Ω pair”</div>
            <div className="text-center text-white/60">↓</div>
            <div className="rounded-xl bg-white px-3 py-2 font-medium text-slate-900 shadow-lg">Tracer · inside KiCad</div>
            <div className="text-center text-white/60">↓</div>
            <div className="rounded-xl bg-white/15 px-3 py-2 font-mono text-xs ring-1 ring-white/20">
              + 2 traces on F.Cu · DRC 0 errors
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journey: timeline, horizontal on desktop and vertical on mobile */}
      <section className="mx-auto mt-28 max-w-6xl sm:mt-36">
        <motion.div {...reveal()} className="max-w-2xl">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            From bottleneck <span className="text-slate-500">to copilot.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Hardware tooling hasn&apos;t kept pace with how fast ideas move. Tracer exists to close that gap.
          </p>
        </motion.div>

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-slate-200 lg:hidden" />
          <span
            aria-hidden
            className="absolute top-[7px] right-0 left-0 hidden h-px bg-gradient-to-r from-slate-200 via-slate-200 to-blue-400 lg:block"
          />
          {journey.map((step, i) => {
            const current = i === journey.length - 1;
            return (
              <motion.li key={step.phase} {...reveal(i * 0.08)} className="relative pl-10 lg:pt-12 lg:pl-0">
                <span
                  aria-hidden
                  className={`absolute top-1 left-0 h-[15px] w-[15px] rounded-full ring-4 ring-[#F8F9FA] lg:top-0 ${
                    current
                      ? "bg-blue-600 shadow-[0_0_0_6px_rgba(37,99,235,0.15)]"
                      : "border-2 border-slate-300 bg-white"
                  }`}
                />
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-light tracking-tight text-slate-900">{step.phase}</span>
                  {current && <span className="text-xs font-medium text-blue-600">Now</span>}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-500">{step.desc}</p>
              </motion.li>
            );
          })}
        </ol>
      </section>

      <FutureVision />

      {/* Principles */}
      <section className="mx-auto mt-32 max-w-6xl sm:mt-44">
        <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            What Tracer <span className="text-slate-500">stands for</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              {...reveal(i * 0.06)}
              className="flex gap-5 rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
                <p.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <motion.section
        {...reveal()}
        className="mx-auto mt-28 max-w-6xl rounded-[2rem] border border-black/[0.04] bg-white px-8 py-14 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:mt-36 sm:px-16 sm:py-20"
      >
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Tracer is shaped by the engineers <span className="text-slate-500">who use it.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
          Tell me what slows your boards down. Every message goes straight to the person building Tracer.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <PrimaryCta className="px-5 py-2.5 text-sm" />
          <Link href="/contact" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
