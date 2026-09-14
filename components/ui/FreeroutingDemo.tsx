"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Net = {
  segs: { d: string; layer: "F" | "B" }[];
  vias?: [number, number][];
  /** Unrouted "rat" line shown until the net is routed. */
  rat: [number, number, number, number];
};

// Board coordinates (viewBox 640×180): U1 pads at x=138/236, J1 at x=528, C1/C2 at x=70.
const NETS: Net[] = [
  { segs: [{ d: "M236 62 H296 L308 50 H528", layer: "F" }], rat: [236, 62, 528, 50] },
  { segs: [{ d: "M236 78 H330 L338 70 H528", layer: "F" }], rat: [236, 78, 528, 70] },
  { segs: [{ d: "M236 94 H380 L384 90 H528", layer: "F" }], rat: [236, 94, 528, 90] },
  {
    segs: [
      { d: "M270 110 L300 140 H460 L490 110", layer: "B" },
      { d: "M236 110 H270 M490 110 H528", layer: "F" },
    ],
    vias: [[270, 110], [490, 110]],
    rat: [236, 110, 528, 110],
  },
  { segs: [{ d: "M236 126 H400 L404 130 H528", layer: "F" }], rat: [236, 126, 528, 130] },
  { segs: [{ d: "M138 62 H96 L84 74 H70", layer: "F" }], rat: [138, 62, 70, 74] },
  { segs: [{ d: "M138 126 H100 L80 106 H70", layer: "F" }], rat: [138, 126, 70, 106] },
  {
    segs: [
      { d: "M110 94 V62 L98 50 H84", layer: "B" },
      { d: "M138 94 H110 M84 50 H70", layer: "F" },
    ],
    vias: [[110, 94], [84, 50]],
    rat: [138, 94, 70, 50],
  },
];
const N = NETS.length;
const COLOR = { F: "#ef4444", B: "#3b82f6" };

const smdPads: [number, number][] = [
  ...[62, 78, 94, 110, 126].flatMap((y): [number, number][] => [[236, y], [138, y]]),
  [70, 50], [70, 74], [70, 106], [70, 130],
];

/** Looping mock of a Freerouting session: nets route one by one while the card is on screen. */
export function FreeroutingDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const [step, setStep] = useState(0);
  const done = step === N;

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStep((s) => (s === N ? 0 : s + 1)), done ? 2800 : step === 0 ? 1000 : 650);
    return () => clearTimeout(t);
  }, [inView, step, done]);

  const pass = done ? 3 : Math.max(1, Math.ceil(step / 3));

  return (
    <div
      ref={ref}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-[#f4f4f5] text-[10px] text-zinc-700 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="flex h-6 shrink-0 items-center justify-between bg-white px-2.5">
        <span className="font-medium text-zinc-800">Freerouting — tracertest.dsn</span>
        <span className="flex gap-3 text-zinc-400" aria-hidden>
          <span>—</span>
          <span>▢</span>
          <span>✕</span>
        </span>
      </div>

      <div className="flex h-5 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white px-2.5 text-zinc-600">
        {["File", "Display", "Parameter", "Rules", "Info", "Other"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="flex h-7 shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap border-b border-zinc-200 px-2">
        {["Select", "Route", "Drag"].map((b, i) => (
          <span
            key={b}
            className={`rounded border px-1.5 py-0.5 ${i === 1 ? "border-zinc-300 bg-white" : "border-transparent"}`}
          >
            {b}
          </span>
        ))}
        <span className="mx-1 h-4 w-px shrink-0 bg-zinc-300" />
        <span
          className={`flex items-center gap-1 rounded border px-1.5 py-0.5 font-medium transition-colors ${
            done ? "border-zinc-300 bg-white" : "border-blue-300 bg-blue-50 text-blue-700"
          }`}
        >
          {!done && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />}
          Autorouter
        </span>
        <span className="px-1.5 py-0.5">Undo</span>
        <span className="px-1.5 py-0.5">Redo</span>
        <span className="ml-auto rounded border border-zinc-300 bg-white px-1.5 py-0.5">Layer: 1 - F.Cu ▾</span>
      </div>

      <div className="min-h-0 flex-1 bg-black">
        <svg viewBox="0 0 640 180" className="h-full w-full" aria-label="Freerouting autorouting a two-layer board">
          <rect x="24" y="18" width="592" height="144" rx="4" fill="#0c0c0e" stroke="#52525b" />
          <g fill="none" stroke="#71717a">
            <rect x="146" y="52" width="82" height="84" rx="2" />
            <rect x="516" y="38" width="24" height="104" rx="2" />
          </g>
          <g fill="#a1a1aa" fontSize="9" fontFamily="monospace" textAnchor="middle">
            <text x="187" y="98">U1</text>
            <text x="528" y="155">J1</text>
            <text x="48" y="65">C1</text>
            <text x="48" y="121">C2</text>
          </g>

          {NETS.map((net, i) => {
            const routed = i < step;
            return (
              <g key={i}>
                <motion.line
                  x1={net.rat[0]}
                  y1={net.rat[1]}
                  x2={net.rat[2]}
                  y2={net.rat[3]}
                  stroke="#fde68a"
                  strokeWidth={1}
                  initial={false}
                  animate={{ opacity: routed ? 0 : 0.7 }}
                  transition={{ duration: 0.25 }}
                />
                {net.segs.map((seg) => (
                  <motion.path
                    key={seg.d}
                    d={seg.d}
                    fill="none"
                    stroke={COLOR[seg.layer]}
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ pathLength: routed ? 1 : 0, opacity: routed ? 0.95 : 0 }}
                    transition={{ duration: routed ? 0.5 : 0.3, ease: "easeInOut" }}
                  />
                ))}
                {net.vias?.map(([x, y]) => (
                  <motion.circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r={4.5}
                    fill="#0c0c0e"
                    stroke="#facc15"
                    strokeWidth={2}
                    initial={false}
                    animate={{ opacity: routed ? 1 : 0 }}
                    transition={{ delay: routed ? 0.3 : 0 }}
                  />
                ))}
              </g>
            );
          })}

          <g fill="#f59e0b">
            {smdPads.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 4} y={y - 3} width={8} height={6} rx={1} />
            ))}
            {[50, 70, 90, 110, 130].map((y) => (
              <g key={y}>
                <circle cx={528} cy={y} r={5} />
                <circle cx={528} cy={y} r={2} fill="#0c0c0e" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex h-5 shrink-0 items-center justify-between gap-2 overflow-hidden whitespace-nowrap border-t border-zinc-200 bg-white px-2.5 font-mono text-[9.5px]">
        <span>{done ? "Routing completed" : step === 0 ? "Starting autorouter…" : `Autorouter pass ${pass} …`}</span>
        <span>
          {step}/{N} connections routed
        </span>
        <span className={done ? "text-green-600" : "text-zinc-500"}>
          {done ? "0 incomplete · 0 violations" : `${N - step} incomplete`}
        </span>
      </div>
    </div>
  );
}
