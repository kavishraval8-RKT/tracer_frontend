"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

const panel =
  "relative h-[340px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#DEE3F1_0%,#ECEFF7_100%)] p-5";
const sheet =
  "flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgba(30,41,80,0.25)] ring-1 ring-black/[0.04]";

const changes = [
  { glyph: "+", text: "U4 AP2112K-3.3 placed", color: "text-green-600" },
  { glyph: "+", text: "C11, C12 1µF placed", color: "text-green-600" },
  { glyph: "+", text: "+3V3 routed on B.Cu · 18.4 mm", color: "text-green-600" },
  { glyph: "~", text: "C12 moved 1.2 mm", color: "text-amber-600" },
  { glyph: "-", text: "R7 0Ω jumper removed", color: "text-red-600" },
];

const history = [
  { ts: "14:32", mode: "Agent", prompt: "Keep the antenna keep-out clear" },
  { ts: "14:29", mode: "Agent", prompt: "Add a 3.3V LDO for the ESP32", active: true },
  { ts: "14:21", mode: "Plan", prompt: "Suggest a USB-C power input" },
  { ts: "14:08", mode: "Ask", prompt: "Why is U3 running hot?" },
];

const DRU = [
  "(version 1)",
  '(rule "USB differential pair"',
  "  (condition \"A.inDiffPair('/USB_D*')\")",
  "  (constraint diff_pair_gap (opt 0.15mm))",
  "  (constraint track_width (opt 0.2mm)))",
  '(rule "High-voltage clearance"',
  "  (condition \"A.NetClass == 'HV'\")",
  "  (constraint clearance (min 0.5mm)))",
];
const ENFORCED_LINE = 7;
const KEYWORDS = new Set(["version", "rule", "condition", "constraint", "min", "opt", "max"]);

/** Minimal syntax colouring for KiCad's S-expression rule files. */
function DruLine({ line }: { line: string }) {
  return line.split(/("[^"]*"|\b[a-z_]+\b|\d+(?:\.\d+)?mm)/).map((part, i) => {
    const color =
      i % 2 === 0
        ? undefined
        : part.startsWith('"')
          ? "text-emerald-700"
          : part.endsWith("mm")
            ? "text-blue-600"
            : KEYWORDS.has(part)
              ? "text-violet-600"
              : undefined;
    return (
      <span key={i} className={color}>
        {part}
      </span>
    );
  });
}

const stack = [
  { name: "KiCad 10", dot: "bg-[#314CB0]" },
  { name: "Freerouting", dot: "bg-red-500" },
  { name: "Claude", dot: "bg-[#D97757]" },
  { name: "GPT-5", dot: "bg-[#10A37F]" },
  { name: "Gemini", dot: "bg-[#4285F4]" },
];

function Caption({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[17px] leading-relaxed text-slate-500">
      <span className="font-medium text-slate-900">{lead}</span> {children}
    </p>
  );
}

export default function InControl() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Safe for <span className="text-slate-500">production boards</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Every change Tracer makes is visible, reversible, and bound by your rules.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {/* Staged changes */}
        <motion.div {...reveal()}>
          <div inert className={panel}>
            <div className={`${sheet} p-4`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">
                  Changes <span className="text-slate-400">({changes.length})</span>
                </span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-600/15">
                  Staged
                </span>
              </div>
              <div className="mt-2 divide-y divide-slate-100 font-mono text-[12px]">
                {changes.map((c) => (
                  <div key={c.text} className={`truncate py-2 ${c.color}`}>
                    {c.glyph} {c.text}
                  </div>
                ))}
              </div>
              <div className="mt-auto flex gap-2 pt-3">
                <span className="flex-1 rounded-lg bg-green-600 py-2 text-center text-xs font-medium text-white shadow-sm">
                  Keep
                </span>
                <span className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-center text-xs font-medium text-red-600">
                  Discard
                </span>
              </div>
            </div>
          </div>
          <Caption lead="Every change is staged.">
            Tracer shows exactly what it will add, move, or remove. Nothing is written until you choose Keep.
          </Caption>
        </motion.div>

        {/* Undo history */}
        <motion.div {...reveal(0.08)}>
          <div inert className={panel}>
            <div className={`${sheet} p-4`}>
              <p className="text-sm font-semibold text-slate-900">Undo to earlier prompt</p>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">
                Restores your KiCad files to the snapshot taken before that prompt.
              </p>
              <div className="mt-3 space-y-1">
                {history.map((h) => (
                  <div
                    key={h.ts}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] ${
                      h.active ? "bg-slate-100 ring-1 ring-slate-200" : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] text-slate-400">{h.ts}</span>
                    <span className="font-semibold text-slate-900">{h.mode}</span>
                    <span className="min-w-0 flex-1 truncate text-slate-600">{h.prompt}</span>
                    {h.active && (
                      <span className="shrink-0 rounded-md bg-blue-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        Restore
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Caption lead="Undo any prompt.">
            Roll the whole board back to the moment before any earlier request, in one click.
          </Caption>
        </motion.div>

        {/* Design rules */}
        <motion.div {...reveal(0.16)}>
          <div inert className={panel}>
            <div className={sheet}>
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
                <span className="font-mono text-[11px] text-slate-600">tracertest.kicad_dru</span>
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 ring-1 ring-green-600/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Loaded by Tracer
                </span>
              </div>
              <div className="py-2 font-mono text-[11px] leading-[1.7] text-slate-700">
                {DRU.map((line, i) => (
                  <div
                    key={i}
                    className={`flex whitespace-pre border-l-2 ${
                      i === ENFORCED_LINE ? "border-blue-500 bg-blue-50/70" : "border-transparent"
                    }`}
                  >
                    <span className="w-7 shrink-0 select-none pr-2 text-right text-slate-300">{i + 1}</span>
                    <span>
                      <DruLine line={line} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mx-4 mt-auto mb-4 truncate rounded-lg bg-slate-900 px-3 py-2 text-[11px] text-white shadow-lg">
                <span className="text-green-400">✓</span> HV clearance enforced · 0 violations
              </div>
            </div>
          </div>
          <Caption lead="Your rules, enforced.">
            Tracer reads your .kicad_dru constraints and never proposes a trace that breaks them.
          </Caption>
        </motion.div>
      </div>

      <motion.div {...reveal()} className="mx-auto mt-20 max-w-4xl text-center">
        <p className="text-sm text-slate-500">Works with your stack</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {stack.map((s) => (
            <span key={s.name} className="flex items-center gap-2 text-[15px] font-medium text-slate-700">
              <span className={`h-2.5 w-2.5 rounded-[3px] ${s.dot}`} />
              {s.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
