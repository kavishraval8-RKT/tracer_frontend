"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { InteractiveDock } from "@/components/ui/InteractiveDock";
import { InteractiveChat } from "@/components/ui/InteractiveChat";
import { FreeroutingDemo } from "@/components/ui/FreeroutingDemo";
import { reveal } from "@/lib/motion";

const whiteCard =
  "relative h-[450px] overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-1";

const checks = [
  { rule: "Clearance ≥ 0.20 mm", fixed: false },
  { rule: "USB_D± impedance 90 Ω", fixed: false },
  { rule: "C12 courtyard overlap", fixed: true },
  { rule: "Annular ring ≥ 0.13 mm", fixed: false },
];

export default function HowTracerHelps() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          How Tracer <span className="text-slate-500">helps</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          A copilot that works inside the KiCad editor you already use.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: vibrant lead */}
        <motion.div
          {...reveal()}
          className="relative h-[450px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white shadow-xl md:col-span-2"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <h3 className="relative max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
            Tracer listens to your design intent
          </h3>
          <p className="relative mt-3 max-w-sm leading-relaxed text-white/80">
            Describe the circuit in plain language. Tracer places parts, wires
            nets, and follows your board&apos;s rules.
          </p>
          <div inert className="absolute bottom-10 left-10 w-[672px]">
            <InteractiveDock
              className="relative"
              defaultPrompt="Add USB-C power input with ESD protection and a 500mA polyfuse"
            />
          </div>
        </motion.div>

        {/* Card 2: chat */}
        <motion.div {...reveal(0.1)} className={whiteCard}>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Assists instantly
          </h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Ask about any net or footprint and get answers grounded in your
            actual board.
          </p>
          <div inert className="absolute inset-x-8 top-[210px] -bottom-6">
            <InteractiveChat
              className="h-full"
              showLog={false}
              messages={[
                { role: "user", text: "Which ESP32 pin should drive the status LED?" },
                {
                  role: "assistant",
                  text: "Use GPIO4. It's free and closest to D2. Avoid GPIO0, GPIO2 and GPIO12: they're strapping pins and can stop the ESP32 from booting.",
                },
              ]}
            />
          </div>
        </motion.div>

        {/* Card 3: DRC */}
        <motion.div {...reveal()} className={whiteCard}>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Real-time DRC validation
          </h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Every edit is checked against your rules before it touches the board.
          </p>
          <div className="absolute inset-x-8 bottom-8 space-y-1.5">
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-black/[0.04] bg-[#F8F9FA] px-4 py-3">
              <span className="text-sm font-medium text-slate-900">DRC</span>
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/15">
                0 errors · 8 ms
              </span>
            </div>
            {checks.map((c) => (
              <div key={c.rule} className="flex items-center justify-between gap-3 px-1 text-xs">
                <span className="truncate text-slate-700">{c.rule}</span>
                {c.fixed ? (
                  <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                    Auto-fixed
                  </span>
                ) : (
                  <Check className="h-3.5 w-3.5 shrink-0 text-green-600" aria-label="Passed" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 4: routing */}
        <motion.div
          {...reveal(0.1)}
          className="relative h-[450px] overflow-hidden rounded-[2rem] border border-black/[0.04] bg-[#F1F3F5] p-10 shadow-inner md:col-span-2"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Auto routing
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-slate-600">
            Tracer routes the board with your net classes and design rules,
            then DRC-checks every trace before it lands.
          </p>
          <div inert className="absolute inset-x-10 top-[172px] bottom-8 max-sm:top-[230px]">
            <FreeroutingDemo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
