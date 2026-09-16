"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";
import { reveal } from "@/lib/motion";

// Unsplash License (free commercial use).
const VISION_PHOTO = "/images/silicon-wafer.jpg";

const shifts = [
  {
    title: "Intent as the interface",
    desc: "Describe what the board must do. Parts, nets, and placement follow from the requirements you set.",
  },
  {
    title: "Constraints that stay live",
    desc: "Rules aren't checked at the end. They shape every operation, so a change never silently breaks the board.",
  },
  {
    title: "Reasoning in the core",
    desc: "Signal integrity, thermals, and manufacturability are understood while you design, not discovered after.",
  },
  {
    title: "Iteration at the speed of thought",
    desc: "Explore a variant in minutes, review it as a diff, and keep only what works.",
  },
];

const horizons = [
  {
    when: "Now",
    title: "Tracer for KiCad",
    status: "Live",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    dot: "bg-emerald-500",
    items: [
      "Natural-language edits to schematics and boards",
      "Staged changes with keep, discard, and undo",
      "Design rule checks on every change",
      "Autorouting that respects your rules",
    ],
  },
  {
    when: "Next",
    title: "Intent that persists",
    status: "Up next",
    tone: "bg-blue-50 text-blue-700 ring-blue-600/15",
    dot: "bg-blue-500",
    items: [
      "Requirements saved with the project, not the chat",
      "Whole subsystems generated from a written spec",
      "Reasoning across schematic and layout together",
      "Design reviews that explain every trade‑off",
    ],
  },
  {
    when: "Later",
    title: "The AI-native editor",
    status: "Long term",
    tone: "bg-slate-100 text-slate-700 ring-slate-600/15",
    dot: "bg-slate-400",
    items: [
      "A standalone editor with intelligence in the core engine",
      "Simulation and signal integrity in the design loop",
      "Part selection aware of stock and pricing",
      "Manufacturing-ready output from the first draft",
    ],
  },
];

const comparison = [
  { label: "Where intelligence lives", today: "A copilot inside KiCad", next: "The core engine of the editor" },
  { label: "How you design", today: "Describe a change, review the diff", next: "Describe the board, refine the result" },
  { label: "Design rules", today: "Read from your .kicad_dru file", next: "Native to every operation" },
  { label: "Where you work", today: "The KiCad you already use", next: "One editor built around intent" },
];

function Pill({ tone, dot, children }: { tone: string; dot: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

/* ---------------- Intent sentence ---------------- */

type Phrase = "power" | "rail" | "rf" | "usb";
type Amps = 3 | 5;
type Step = { stage: string; text: string; code?: boolean; changed?: boolean };

const phraseLabel: Record<Phrase, (a: Amps) => string> = {
  power: (a) => `USB-C at up to ${a} A`,
  rail: () => "a clean 3.3 V rail",
  rf: () => "the antenna clear",
  usb: () => "USB as a 90 Ω pair",
};

function resolve(phrase: Phrase, amps: Amps): Step[] {
  const high = amps === 5;
  switch (phrase) {
    case "power":
      return [
        { stage: "Understood as", text: `input.usb_c.current ≤ ${amps} A`, code: true, changed: high },
        { stage: "Decided", text: `F1: ${amps} A resettable fuse at the connector`, changed: high },
        {
          stage: "Designed",
          text: high ? "VBUS widened to 1.6 mm, with a copper pour under J1" : "VBUS routed on F.Cu at 0.8 mm",
          changed: high,
        },
        { stage: "Verified", text: `Rated for ${amps}.0 A · 0 violations` },
      ];
    case "rail":
      return [
        { stage: "Understood as", text: "rail.3v3.load ≤ 500 mA", code: true },
        { stage: "Decided", text: "U4: low-dropout regulator with 1 µF in and out" },
        { stage: "Designed", text: "U4 placed within 5 mm of the ESP32 supply pins" },
        { stage: "Verified", text: "Temperature rise +18 °C · within budget" },
      ];
    case "rf":
      return [
        { stage: "Understood as", text: "keepout.antenna = 10 mm, no copper", code: true },
        { stage: "Decided", text: "No parts, traces, or pours inside the zone" },
        { stage: "Designed", text: "C12 and one via moved outside the boundary" },
        { stage: "Verified", text: "Keep-out clear · 0 violations" },
      ];
    case "usb":
      return [
        { stage: "Understood as", text: "usb.d_pair.impedance = 90 Ω", code: true },
        { stage: "Decided", text: "Differential pair, length-matched to 0.1 mm" },
        { stage: "Designed", text: "USB_D± routed on F.Cu over solid ground" },
        { stage: "Verified", text: "90 Ω ±5% · 0 violations" },
      ];
  }
}

function highlight(active: boolean) {
  return `rounded-md box-decoration-clone px-1 -mx-1 transition-colors ${active ? "bg-blue-50 text-blue-800" : ""}`;
}

// `inline` lets long phrases wrap like normal text instead of jumping to a new line as a block.
function underline(active: boolean) {
  return `inline text-left underline decoration-2 underline-offset-[0.22em] transition-colors ${
    active ? "decoration-blue-400" : "decoration-slate-300 hover:decoration-slate-500"
  }`;
}

function IntentSentence() {
  const [phrase, setPhrase] = useState<Phrase>("power");
  const [amps, setAmps] = useState<Amps>(3);
  const steps = resolve(phrase, amps);
  const changed = steps.some((s) => s.changed);

  const token = (id: Phrase, label: string) => (
    <button
      type="button"
      aria-pressed={phrase === id}
      onClick={() => setPhrase(id)}
      className={`${highlight(phrase === id)} ${underline(phrase === id)}`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:grid-cols-[1.15fr_1fr]">
      {/* Intent */}
      <div className="flex flex-col p-8 sm:p-12 lg:p-14">
        <p className="text-sm text-slate-500">Your intent</p>
        <p className="mt-6 font-serif text-[1.9rem] leading-[1.45] text-slate-900 sm:text-[2.6rem]">
          Power the board from{" "}
          <span className={`${highlight(phrase === "power")} whitespace-nowrap`}>
            <button
              type="button"
              aria-pressed={phrase === "power"}
              onClick={() => setPhrase("power")}
              className={underline(phrase === "power")}
            >
              USB-C at up to
            </button>{" "}
            <button
              type="button"
              aria-label={`Maximum current ${amps} amps. Click to change.`}
              onClick={() => {
                setAmps(amps === 3 ? 5 : 3);
                setPhrase("power");
              }}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-2 align-middle font-sans text-[0.6em] leading-[1.7] font-medium text-slate-900 no-underline shadow-sm ring-1 ring-slate-300 transition hover:ring-slate-400"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={amps}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {amps} A
                </motion.span>
              </AnimatePresence>
              <ChevronsUpDown aria-hidden className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </span>
          , run the ESP32 from {token("rail", "a clean 3.3 V rail")}, keep {token("rf", "the antenna clear")}, and route{" "}
          {token("usb", "USB as a 90 Ω pair")}.
        </p>
        <p className="mt-auto pt-10 text-sm leading-relaxed text-slate-500">
          Select a phrase to see how it becomes a design. Change the current to watch the design follow.
        </p>
      </div>

      {/* Resolution */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-8 sm:p-12 lg:border-t-0 lg:border-l lg:p-14">
        <p className="text-sm text-slate-500">
          How <span className="font-medium text-slate-900">&ldquo;{phraseLabel[phrase](amps)}&rdquo;</span> becomes a
          design
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ol
            key={phrase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="relative mt-8"
          >
            <span aria-hidden className="absolute top-2 bottom-8 left-[5px] w-px bg-slate-200" />
            {steps.map((s, i) => (
              <li key={s.stage} className="relative pb-8 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 left-0 h-[11px] w-[11px] rounded-full ${
                    i === steps.length - 1 ? "bg-emerald-500 ring-4 ring-emerald-500/15" : "bg-white ring-1 ring-slate-300"
                  }`}
                />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-500">{s.stage}</p>
                  {s.changed && <span className="text-xs font-medium text-amber-700">Updated</span>}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={s.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      s.code
                        ? "mt-1.5 inline-block rounded-md bg-white px-2 py-1 font-mono text-[13px] text-slate-800 ring-1 ring-slate-200"
                        : "mt-1 text-[15px] leading-relaxed text-slate-900"
                    }
                  >
                    {s.text}
                  </motion.p>
                </AnimatePresence>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>

        <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          {changed
            ? "One edit. Three updates. Re-verified automatically."
            : "Every part, trace, and rule stays linked to the sentence that created it."}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */

export default function FutureVision() {
  return (
    <section className="mx-auto mt-32 max-w-6xl sm:mt-44">
      <motion.div {...reveal()} className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-5xl leading-[1.05] font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          The future of hardware is an editor that{" "}
          <span className="text-slate-500">natively understands intent.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-balance text-xl leading-relaxed text-slate-600">
          Plugins are just the beginning. The ultimate roadmap is a standalone, AI-native EDA platform where
          intelligence is built into the core engine, not bolted onto legacy architecture.
        </p>
      </motion.div>

      <motion.div
        {...reveal(0.1)}
        className="mt-16 overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(30,41,80,0.45)] ring-1 ring-black/5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VISION_PHOTO}
          alt="Silicon wafer with a grid of iridescent microchip dies"
          width={1600}
          height={1047}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
        />
      </motion.div>

      {/* Manifesto */}
      <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <motion.p
          {...reveal()}
          className="text-balance text-3xl leading-snug font-medium tracking-tight text-slate-900 sm:text-4xl"
        >
          Every leap in EDA has been measured by what engineers <span className="text-blue-600">no longer do by hand.</span>
        </motion.p>
        <motion.div {...reveal(0.1)} className="space-y-6 text-lg leading-relaxed text-slate-600">
          <p>
            Schematic capture replaced the drafting table. Autorouters took over the most tedious traces. Yet the
            core loop of hardware design (change a constraint, rework the board, check it again) still moves at the
            speed of a mouse.
          </p>
          <p>
            An AI-native editor changes the unit of work. Instead of moving copper, you describe intent: the
            regulator, the impedance, the keep-out, the thermal budget. The editor holds that intent as the design
            evolves, so a change to one requirement flows through everything it touches.
          </p>
          <p>
            Tracer inside KiCad is the first step toward that editor. It brings the loop of describe, review, and
            refine to real boards today, in the tool engineers already trust.
          </p>
        </motion.div>
      </div>

      {/* Concept editor */}
      <div className="mt-28 lg:mt-36">
        <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
          <h3 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Change a requirement. <span className="text-slate-500">The board follows.</span>
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            In an intent-native editor, requirements are first-class objects. Every part, trace, and rule stays linked
            to the intent that created it, so editing one line of the spec updates the design and re-checks it
            instantly.
          </p>
        </motion.div>
        <motion.div {...reveal(0.1)} className="mt-12">
          <IntentSentence />
        </motion.div>
        <p className="mt-4 text-center text-sm text-slate-500">
          An illustration of where Tracer is headed, not a feature available today.
        </p>
      </div>

      {/* What changes */}
      <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-8">
        {shifts.map((s, i) => (
          <motion.div key={s.title} {...reveal(i * 0.08)} className="border-t border-slate-200 pt-6">
            <h4 className="text-lg font-semibold tracking-tight text-slate-900">{s.title}</h4>
            <p className="mt-2 leading-relaxed text-slate-500">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="mt-28 lg:mt-36">
        <motion.div {...reveal()} className="max-w-2xl">
          <h3 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            A roadmap in <span className="text-slate-500">three horizons.</span>
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Direction, not dates. Each horizon builds on the one before it, and the roadmap evolves with the engineers
            who use Tracer.
          </p>
        </motion.div>

        <ol className="relative mt-12 grid gap-6 lg:grid-cols-3">
          <span
            aria-hidden
            className="absolute top-[3.1rem] right-8 left-8 hidden h-px bg-gradient-to-r from-emerald-300 via-blue-300 to-slate-300 lg:block"
          />
          {horizons.map((h, i) => (
            <motion.li
              key={h.when}
              {...reveal(i * 0.1)}
              className="relative flex flex-col rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-4xl font-light tracking-tight text-slate-900">{h.when}</span>
                <Pill tone={h.tone} dot={h.dot}>
                  {h.status}
                </Pill>
              </div>
              <h4 className="mt-6 text-xl font-semibold tracking-tight text-slate-900">{h.title}</h4>
              <ul className="mt-5 space-y-3">
                {h.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                    <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${h.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* From plugin to platform */}
      <motion.div {...reveal()} className="mt-28 lg:mt-36">
        <div className="max-w-2xl">
          <h3 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            From plugin <span className="text-slate-500">to platform.</span>
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            What changes when intelligence moves from the side panel into the engine.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="grid grid-cols-2 border-b border-slate-100 md:grid-cols-[1fr_1.25fr_1.25fr]">
            <div className="hidden md:block" />
            <div className="px-6 py-6 sm:px-8">
              <p className="text-sm text-slate-500">Today</p>
              <p className="mt-1 font-semibold text-slate-900">Tracer for KiCad</p>
              <div className="mt-2">
                <Pill tone={horizons[0].tone} dot={horizons[0].dot}>
                  Live
                </Pill>
              </div>
            </div>
            <div className="bg-blue-50/50 px-6 py-6 sm:px-8">
              <p className="text-sm text-slate-500">Next</p>
              <p className="mt-1 font-semibold text-slate-900">AI-native EDA platform</p>
              <div className="mt-2">
                <Pill tone={horizons[1].tone} dot={horizons[1].dot}>
                  On the roadmap
                </Pill>
              </div>
            </div>
          </div>

          {comparison.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-2 border-b border-slate-100 last:border-b-0 md:grid-cols-[1fr_1.25fr_1.25fr]"
            >
              <div className="col-span-2 px-6 pt-5 text-sm font-medium text-slate-900 sm:px-8 md:col-span-1 md:py-5">
                {row.label}
              </div>
              <div className="px-6 py-3 text-slate-600 sm:px-8 md:py-5">{row.today}</div>
              <div className="bg-blue-50/50 px-6 py-3 font-medium text-slate-900 sm:px-8 md:py-5">{row.next}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
