"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

const steps = [
  {
    n: "01",
    title: "Describe it",
    desc: "Type what you need in plain language: a regulator, a USB-C input, a status LED.",
  },
  {
    n: "02",
    title: "Review the diff",
    desc: "Tracer picks parts, wires the nets, and highlights every symbol and wire it adds.",
  },
  {
    n: "03",
    title: "Keep or undo",
    desc: "Accept the change with one click, or roll back to any earlier prompt.",
  },
];

// KiCad's default schematic palette.
const WIRE = "#008400";
const BODY = "#840000";
const PIN_NAME = "#008484";

function Ground({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y - 10} V${y} M${x - 8} ${y} H${x + 8} L${x} ${y + 7} Z`} fill="none" stroke={BODY} strokeWidth="1.2" />;
}

function Cap({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <path d={`M${x} 56 V108 M${x} 115 V142`} stroke={WIRE} strokeWidth="1.5" fill="none" />
      <path d={`M${x - 10} 108 H${x + 10} M${x - 10} 115 H${x + 10}`} stroke={BODY} strokeWidth="2" />
      <text x={x + 14} y="108" fontSize="8" fill={BODY}>{label}</text>
      <text x={x + 14} y="118" fontSize="8" fill={BODY}>1µF</text>
      <Ground x={x} y={152} />
    </g>
  );
}

function SchematicCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(30,41,80,0.35)] ring-1 ring-black/[0.04]">
      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        <span className="font-mono">power_supply.kicad_sch</span>
        <span className="text-slate-300">·</span>
        <span>2 min ago</span>
      </div>
      <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">3.3V LDO for the ESP32</h3>
      <div className="mt-3 flex items-center gap-1 text-[11px] font-medium">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-900 ring-1 ring-slate-200">Schematic</span>
        <span className="px-2 py-1 text-slate-500">Changes</span>
        <span className="px-2 py-1 text-slate-500">Chat</span>
        <span className="ml-auto hidden whitespace-nowrap rounded-full bg-green-50 px-2 py-0.5 text-green-700 ring-1 ring-green-600/15 sm:inline-block">
          +3 symbols · 7 wires
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-[#FAFAF7] bg-[radial-gradient(#e7e5df_1px,transparent_1px)] [background-size:12px_12px]">
        <svg viewBox="0 0 360 180" className="w-full" aria-label="Schematic of a 3.3 volt LDO regulator with input and output capacitors">
          <rect x="56" y="22" width="248" height="144" rx="8" fill="#22c55e" fillOpacity="0.06" stroke="#22c55e" strokeDasharray="4 3" />

          {/* Power flags */}
          <path d="M30 56 V44 M22 44 H38" stroke={BODY} strokeWidth="1.2" />
          <text x="30" y="38" fontSize="8" textAnchor="middle" fill={BODY}>VBUS</text>
          <path d="M330 56 V44 M322 44 H338" stroke={BODY} strokeWidth="1.2" />
          <text x="330" y="38" fontSize="8" textAnchor="middle" fill={BODY}>+3V3</text>

          {/* Wires */}
          <g stroke={WIRE} strokeWidth="1.5" fill="none">
            <path d="M30 56 H140" />
            <path d="M140 84 H110 V56" />
            <path d="M220 56 H330" />
            <path d="M180 104 V142" />
          </g>
          <g fill={WIRE}>
            <circle cx="80" cy="56" r="2.5" />
            <circle cx="110" cy="56" r="2.5" />
            <circle cx="280" cy="56" r="2.5" />
          </g>

          <Cap x={80} label="C11" />
          <Cap x={280} label="C12" />
          <Ground x={180} y={152} />

          {/* U4 */}
          <rect x="150" y="44" width="60" height="50" fill="#FFFFC2" stroke={BODY} strokeWidth="1.2" />
          <path d="M140 56 H150 M140 84 H150 M210 56 H220 M180 94 V104" stroke={BODY} strokeWidth="1.2" />
          <g fontSize="7" fill={PIN_NAME}>
            <text x="153" y="59">VIN</text>
            <text x="153" y="87">EN</text>
            <text x="207" y="59" textAnchor="end">VOUT</text>
            <text x="180" y="91" textAnchor="middle">GND</text>
          </g>
          <text x="180" y="38" fontSize="8" textAnchor="middle" fill={BODY}>U4</text>
          <text x="226" y="100" fontSize="8" fill={BODY}>AP2112K-3.3</text>
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-4 pr-1.5">
        <span className="flex-1 truncate text-[13px] text-slate-400">Ask Tracer about this sheet…</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 13V3m-4 4l4-4 4 4" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function PromptToParts() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <motion.div
          {...reveal()}
          inert
          className="rounded-[28px] bg-[linear-gradient(180deg,#DEE3F1_0%,#ECEFF7_100%)] p-5 sm:p-10"
        >
          <SchematicCard />
        </motion.div>

        <motion.div {...reveal(0.1)}>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            From prompt <span className="text-slate-500">to placed parts</span>
          </h2>
          <div className="mt-10 divide-y divide-slate-200">
            {steps.map((s) => (
              <div key={s.n} className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 first:pt-0 last:pb-0 sm:gap-6">
                <span className="text-4xl font-light tracking-tight text-slate-900">{s.n}</span>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-slate-900">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
