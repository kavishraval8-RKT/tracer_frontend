"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

const VIDEO = "/m2-res_640p.mp4";
// Final frame of the recording (fully routed board), shown before playback starts.
const POSTER = "/images/astra-poster.jpg";

const chain = [
  { name: "GPT-6 Astra", role: "Reasons about the board" },
  { name: "Tracer", role: "Turns intent into edits", core: true },
  { name: "KiCad", role: "Where the board changes" },
];

/** Connector with a soft light travelling along it, left to right on desktop, top to bottom on mobile. */
function Rail({ delay }: { delay: number }) {
  return (
    <li aria-hidden className="relative mx-auto h-6 w-px list-none overflow-hidden bg-slate-400/50 sm:mx-0 sm:h-px sm:w-auto">
      <motion.span
        className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent sm:hidden"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-y-0 hidden w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent sm:block"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
    </li>
  );
}

export default function AstraBridge() {
  const video = useRef<HTMLVideoElement>(null);

  // Respect reduced-motion: hold the poster frame instead of looping playback.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
  }, []);

  return (
    <section className="px-6 py-12 sm:py-16">
      <motion.div
        {...reveal()}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 lg:p-16"
      >
        {/* Faint sky glow in the corner, echoing the hero. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.14),transparent)]"
        />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              The missing link <span className="text-slate-500">for GPT-6 Astra</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCta className="px-5 py-2.5 text-sm" />
              <Link
                href="/instructions"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Read the docs <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="lg:pt-1">
            <p className="text-lg leading-relaxed text-slate-600">
              GPT-6 Astra can reason its way to a flawless PCB. But a model can&apos;t place a footprint or
              route a trace on its own.{" "}
              <span className="font-medium text-slate-900">Intelligence needs an EDA environment to act in.</span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Tracer is that bridge. It puts GPT-6 Astra to work inside KiCad, turning your intent into real
              symbols, footprints, and traces on the board you already have open. No exports, no copy-paste,
              no switching tabs.
            </p>
          </div>
        </div>

        {/* Signal chain above the recording it produces */}
        <div className="relative mt-14 rounded-[1.75rem] bg-gradient-to-b from-[#DEE3F1] to-[#ECEFF7] p-2 sm:p-3">
          <ol
            aria-label="How GPT-6 Astra reaches your board"
            className="grid items-center px-2 py-4 sm:grid-cols-[1fr_minmax(2rem,4rem)_1fr_minmax(2rem,4rem)_1fr] sm:px-4 sm:py-5"
          >
            {chain.map((node, i) => (
              <Fragment key={node.name}>
                {i > 0 && <Rail delay={(i - 1) * 0.8} />}
                <li
                  className={`rounded-2xl bg-white px-4 py-3 text-center ${
                    node.core
                      ? "shadow-[0_10px_30px_-10px_rgba(37,99,235,0.45)] ring-1 ring-blue-600/25"
                      : "shadow-sm ring-1 ring-black/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-900">
                    {node.core && (
                      <span aria-hidden className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/50 motion-reduce:animate-none" />
                        <span className="relative h-2 w-2 rounded-full bg-blue-600" />
                      </span>
                    )}
                    {node.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{node.role}</div>
                </li>
              </Fragment>
            ))}
          </ol>

          {/* Recording: GPT-6 Astra placing and routing a board through Tracer */}
          <div className="relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] ring-1 ring-black/[0.06]">
            <video
              ref={video}
              src={VIDEO}
              poster={POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Screen recording of GPT-6 Astra placing and routing a PCB through Tracer, with the 3D board view alongside"
              className="block aspect-[2/1] w-full bg-white object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur">
              PCB layout
            </span>
            <span className="absolute top-3 left-[calc(50%+12px)] hidden rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur sm:inline">
              3D view
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
