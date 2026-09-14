"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

const VIDEO = "/m2-res_640p.mp4";
// Final frame of the recording (fully routed board), shown before playback starts.
const POSTER = "/images/astra-poster.jpg";

const flow = [
  { name: "GPT-6 Astra", role: "The intelligence" },
  { name: "Tracer", role: "The bridge" },
  { name: "KiCad", role: "The workspace" },
];

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
        className="mx-auto max-w-6xl rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 lg:p-16"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              The missing link <span className="text-slate-500">for GPT-6 Astra</span>
            </h2>

            <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3">
              {flow.map((node, i) => (
                <Fragment key={node.name}>
                  {i > 0 && (
                    <span aria-hidden className="h-px w-3 bg-gradient-to-r from-slate-300 to-blue-400 sm:w-8" />
                  )}
                  <div
                    className={`min-w-0 rounded-xl px-2 py-2.5 text-center sm:px-3 ${
                      node.name === "Tracer"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.55)]"
                        : "bg-white text-slate-900 shadow-sm ring-1 ring-black/[0.06]"
                    }`}
                  >
                    <div className="whitespace-nowrap text-[11px] font-semibold sm:text-sm">{node.name}</div>
                    <div
                      className={`mt-0.5 hidden truncate text-[11px] sm:block ${
                        node.name === "Tracer" ? "text-white/75" : "text-slate-500"
                      }`}
                    >
                      {node.role}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCta className="px-5 py-2.5 text-sm" />
              <Link
                href="/instructions"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                See how it works <span aria-hidden>→</span>
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

        {/* Recording: GPT-6 Astra placing and routing a board through Tracer */}
        <div className="relative mt-14 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] ring-1 ring-black/[0.06]">
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
      </motion.div>
    </section>
  );
}
