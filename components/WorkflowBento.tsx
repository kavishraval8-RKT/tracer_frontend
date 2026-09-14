"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { reveal } from "@/lib/motion";

const card =
  "flex flex-col rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10";
const sheet = "rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgba(30,41,80,0.25)] ring-1 ring-black/[0.04]";

function CardText({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h3 className="text-balance text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-600">{children}</p>
    </>
  );
}

function SendButton({ tone }: { tone: "red" | "amber" }) {
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-md ${
        tone === "red" ? "bg-red-500" : "bg-amber-500"
      }`}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13V3m-4 4l4-4 4 4" />
      </svg>
    </span>
  );
}

type Mode = "Agent" | "Ask" | "Plan" | "Debug";

const modes: Record<Mode, { prompt: string; output: React.ReactNode }> = {
  Agent: {
    prompt: "Add a 3.3V LDO for the ESP32",
    output: (
      <div className="space-y-2">
        <div className="space-y-1 font-mono text-[12px]">
          <p className="text-green-600">+ U4 AP2112K-3.3 placed</p>
          <p className="text-green-600">+ C11, C12 1µF placed</p>
          <p className="text-green-600">+ +3V3 routed on B.Cu · 18.4 mm</p>
        </div>
        <span className="inline-block rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 ring-1 ring-green-600/15">
          DRC passed · 0 errors
        </span>
      </div>
    ),
  },
  Ask: {
    prompt: "Why is U3 running hot?",
    output: (
      <p className="rounded-xl bg-slate-100 px-3.5 py-3 text-[13px] leading-relaxed text-slate-900">
        U3&apos;s thermal pad has no vias to GND. A 3×3 via array under it would cut its temperature rise by roughly
        half. Nothing was changed.
      </p>
    ),
  },
  Plan: {
    prompt: "Add a 3.3V LDO for the ESP32",
    output: (
      <div>
        <ol className="space-y-1.5 text-[13px] text-slate-700">
          {["Place U4 next to the ESP32 supply pins", "Add 1µF input and output capacitors", "Route +3V3 on B.Cu at 0.5 mm", "Run DRC"].map(
            (step, i) => (
              <li key={step} className="flex gap-2.5">
                <span className="w-4 shrink-0 text-slate-400">{i + 1}.</span>
                {step}
              </li>
            ),
          )}
        </ol>
        <p className="mt-2.5 text-[11px] text-slate-500">Plan only. Nothing applied yet.</p>
      </div>
    ),
  },
  Debug: {
    prompt: "Why is DRC failing?",
    output: (
      <div className="space-y-2 text-[13px]">
        <p className="font-mono text-[12px] text-red-600">✕ Clearance C12 ↔ via: 0.12 mm (min 0.20 mm)</p>
        <p className="leading-relaxed text-slate-700">
          The via next to C12 was placed after the keep-out change. Moving it 0.3 mm left clears the rule.
        </p>
        <span className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-600/15">
          Fix staged for review
        </span>
      </div>
    ),
  },
};

function ModesCard() {
  const [mode, setMode] = useState<Mode>("Agent");
  const current = modes[mode];

  return (
    <div className="flex h-full flex-col gap-8 rounded-[2rem] bg-[linear-gradient(180deg,#DEE3F1_0%,#ECEFF7_100%)] p-8 ring-1 ring-black/[0.03] sm:p-10 md:col-span-2 lg:flex-row lg:items-center lg:gap-10">
      <div className="lg:w-[42%]">
        <CardText title="Four modes, one prompt bar">
          Let Tracer make the change, answer a question, plan an approach, or track down an error. Switch modes
          without leaving the editor.
        </CardText>
      </div>

      <div className={`${sheet} flex-1 p-5`}>
        <div role="tablist" aria-label="Tracer modes" className="flex gap-1 rounded-full bg-slate-100 p-1">
          {(Object.keys(modes) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors ${
                mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="relative mt-4 min-h-[172px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-end">
                <span className="max-w-[85%] rounded-2xl bg-red-500 px-3 py-2 text-[13px] text-white">{current.prompt}</span>
              </div>
              <div className="mt-3">{current.output}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const models = [
  { name: "GPT-6 Astra", note: "Deep reasoning" },
  { name: "Claude", note: "Careful edits" },
  { name: "Gemini", note: "Fast iterations" },
  { name: "Ohm", note: "Built for circuits" },
];

const activity = [
  { kind: "Act", text: "place_footprint U4 AP2112K-3.3" },
  { kind: "Obs", text: "3 pins connected to +3V3" },
  { kind: "Act", text: "route_net +3V3 layer=B.Cu" },
  { kind: "Obs", text: "18.4 mm routed · 2 vias" },
  { kind: "Act", text: "run_drc" },
  { kind: "Obs", text: "0 errors · 8 ms" },
];

const tagTone: Record<string, string> = {
  Act: "bg-blue-600/10 text-blue-600",
  Obs: "bg-green-600/10 text-green-600",
};

export default function WorkflowBento() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Built for how <span className="text-slate-500">engineers actually work.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">The details that make an AI copilot trustworthy on a real board.</p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div {...reveal()} className="md:col-span-2">
          <ModesCard />
        </motion.div>

        {/* Models */}
        <motion.div {...reveal(0.08)} className={card}>
          <CardText title="Your choice of model">Pick the model for each task from the same prompt bar.</CardText>
          <ul inert className={`${sheet} mt-8 divide-y divide-slate-100 lg:mt-auto`}>
            {models.map((m, i) => (
              <li key={m.name} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-slate-900">{m.name}</span>
                  <span className="block text-xs text-slate-500">{m.note}</span>
                </span>
                {i === 0 ? (
                  <Check className="h-4 w-4 shrink-0 text-blue-600" aria-label="Selected" />
                ) : (
                  <span aria-hidden className="h-4 w-4 shrink-0 rounded-full ring-1 ring-slate-300" />
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Activity */}
        <motion.div {...reveal()} className={card}>
          <CardText title="Shows its work">Every step Tracer takes is logged, so you can see exactly how it got there.</CardText>
          <motion.ul
            className={`${sheet} mt-8 space-y-1.5 p-4 md:mt-auto`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } } }}
          >
            {activity.map((a) => (
              <motion.li
                key={a.text}
                variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                className="flex items-baseline gap-2"
              >
                <span className={`rounded px-1.5 py-px font-mono text-[10px] ${tagTone[a.kind]}`}>{a.kind}</span>
                <span className="truncate font-mono text-[11px] text-slate-600">{a.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Clarification */}
        <motion.div {...reveal(0.08)} className={card}>
          <CardText title="Asks before it guesses">
            When a request is ambiguous, Tracer asks instead of picking for you.
          </CardText>
          <div inert className={`${sheet} mt-8 p-4 md:mt-auto`}>
            <p className="rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] leading-relaxed text-slate-900">
              The ESP32 can draw up to 500 mA. Should U4 use a SOT-23-5 or SOT-89 package?
            </p>
            <div className="mt-2.5 flex gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
                SOT-89
              </span>
              <span className="rounded-full px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                SOT-23-5
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
              <span className="flex-1 truncate text-[13px] text-slate-400">Answer the clarification…</span>
              <SendButton tone="amber" />
            </div>
          </div>
        </motion.div>

        {/* Screenshot */}
        <motion.div {...reveal(0.16)} className={`${card} md:col-span-2 lg:col-span-1`}>
          <CardText title="Sees what you see">Attach a screenshot of KiCad and ask about exactly what&apos;s on screen.</CardText>
          <div inert className={`${sheet} mt-8 p-4 md:mt-auto`}>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kicad-background.png"
                alt=""
                className="h-14 w-20 shrink-0 rounded-lg object-cover object-left-top ring-1 ring-black/5"
              />
              <span className="inline-flex min-w-0 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 py-0.5 pr-1.5 pl-2 text-[11px] text-slate-700">
                <span className="truncate">kicad-screenshot.png</span>
                <span className="text-slate-400">×</span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
              <span className="flex-1 truncate text-[13px] text-slate-900">Why is this net still unrouted?</span>
              <SendButton tone="red" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
