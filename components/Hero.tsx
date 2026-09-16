"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HeroMockup } from "@/components/ui/HeroMockup";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

const ease = [0.16, 1, 0.3, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const media: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

/**
 * Sky scene: light ray, sun glow, layered mountains fading into mist, white corner haze.
 * The horizon box's bottom edge must line up with the section gradient's #F8F9FA stop
 * (desktop 430+520=950px, mobile 470+520=990px) or a seam appears.
 */
function Sky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-40 right-[10%] h-[900px] w-[220px] rotate-[28deg] bg-gradient-to-b from-white/0 via-white/20 to-white/0 blur-2xl" />

      <div className="absolute inset-x-0 top-[470px] h-[520px] sm:top-[430px]">
        <div className="absolute right-[14%] top-[60px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,#fff_0%,#fff_20%,rgba(255,255,255,0.8)_30%,rgba(255,255,255,0.25)_48%,transparent_70%)]" />
        <div className="absolute right-0 top-[176px] h-7 w-[65%] bg-[linear-gradient(to_left,transparent,rgba(255,255,255,0.6)_35%,transparent)] blur-lg" />
        <div className="absolute right-0 top-[189px] h-[2px] w-[65%] bg-[linear-gradient(to_left,transparent,#fff_25%,#fff_55%,transparent)]" />

        <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="sky-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8CC0EE" />
              <stop offset="1" stopColor="#D3E9FA" />
            </linearGradient>
            <linearGradient id="sky-far2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#A5CDF2" />
              <stop offset="1" stopColor="#D9ECFB" />
            </linearGradient>
            <linearGradient id="sky-lit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6FA9EA" />
              <stop offset="1" stopColor="#B9DBF6" />
            </linearGradient>
            <linearGradient id="sky-shade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2B63C0" />
              <stop offset="1" stopColor="#6FA8E8" />
            </linearGradient>
            <linearGradient id="sky-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#BFDDF6" />
              <stop offset="1" stopColor="#EAF4FC" />
            </linearGradient>
            <filter id="sky-blur" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <path
            fill="url(#sky-far)"
            d="M0 300 L60 270 L110 285 L170 240 L230 262 L300 225 L360 250 L430 205 L500 240 L560 215 L640 250 L720 222 L800 255 L880 210 L950 238 L1030 200 L1100 232 L1180 212 L1260 246 L1330 218 L1400 240 L1440 228 V520 H0Z"
          />
          <path fill="url(#sky-far2)" d="M980 330 L1040 262 L1075 235 L1100 262 L1160 300 L1220 330Z" />
          <path fill="#7DB4EC" fillOpacity="0.7" d="M600 360 L660 250 L690 225 L715 260 L760 290 L820 360Z" />

          {/* Main peak: lit right face, shaded left face, snow streaks. Shifted left so it rises beside the CTA, not behind it. */}
          <g transform="translate(-140 0)">
          <path
            fill="url(#sky-lit)"
            d="M230 360 L300 300 L335 290 L370 240 L400 215 L425 170 L448 138 L470 70 L488 105 L505 96 L528 150 L560 190 L590 230 L640 262 L700 300 L760 360Z"
          />
          <path
            fill="url(#sky-shade)"
            d="M230 360 L300 300 L335 290 L370 240 L400 215 L425 170 L448 138 L470 70 L462 150 L440 210 L452 260 L420 320 L400 360Z"
          />
          <g fill="#fff" fillOpacity="0.85">
            <path d="M470 70 L488 105 L480 120 L492 150 L476 175 L482 140Z" />
            <path d="M505 96 L528 150 L518 158 L530 190 L510 168 L514 132Z" />
            <path d="M560 190 L590 230 L575 232 L585 262 L562 236Z" />
          </g>
          </g>

          <ellipse cx="720" cy="350" rx="900" ry="46" fill="#fff" fillOpacity="0.55" filter="url(#sky-blur)" />
          <path
            fill="url(#sky-mid)"
            d="M0 360 L90 330 L180 350 L280 318 L380 345 L520 320 L640 352 L760 325 L880 350 L1000 318 L1120 346 L1240 322 L1360 344 L1440 330 V520 H0Z"
          />
          <path fill="#fff" fillOpacity="0.7" d="M0 420 C240 385 420 405 620 392 S1040 380 1440 405 V520 H0Z" />
        </svg>

        <div className="absolute inset-0 bg-[radial-gradient(38%_55%_at_0%_85%,rgba(255,255,255,0.95),transparent_75%),radial-gradient(38%_55%_at_100%_85%,rgba(255,255,255,0.95),transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-[#F8F9FA]/0 to-[#F8F9FA]" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    // -mt-16 slides the sky under the transparent sticky header (h-16).
    <section className="relative -mt-16 w-full overflow-hidden bg-[linear-gradient(180deg,#1F78D4_0px,#3590E0_220px,#53A8EA_440px,#8BC9F3_600px,#CFE9FA_780px,#F8F9FA_950px)] pt-32 pb-32 max-sm:bg-[linear-gradient(180deg,#1F78D4_0px,#3590E0_240px,#53A8EA_480px,#8BC9F3_640px,#CFE9FA_820px,#F8F9FA_990px)]">
      <Sky />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            variants={item}
            className="font-serif text-[3.25rem] leading-[1.02] font-normal tracking-[-0.015em] text-white [text-shadow:0_2px_30px_rgba(18,70,150,0.25)] sm:text-7xl lg:text-[5.75rem]"
          >
            Design circuits
            <br />
            with AI
          </motion.h1>

          <motion.div
            variants={item}
            className="mx-auto mt-8 h-px w-full max-w-md bg-gradient-to-r from-white/0 via-white/60 to-white/0"
          />

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed font-medium text-white [text-shadow:0_1px_12px_rgba(23,76,160,0.35)] sm:text-xl"
          >
            Tracer is an AI KiCad plugin for schematics, PCB routing, and DRC.
            Describe your board in plain language, right inside the editor.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
          >
            <PrimaryCta className="px-6 py-3 text-base" />
            <Link
              href="/instructions"
              className="text-sm font-medium text-white/90 transition-colors [text-shadow:0_1px_10px_rgba(23,76,160,0.35)] hover:text-white"
            >
              Read the docs <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div variants={media} className="relative mt-14">
          <div aria-hidden className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-white/50 blur-3xl" />
          <div className="mx-auto max-w-6xl rounded-[1.25rem] bg-white/25 p-1.5 shadow-[0_40px_100px_-30px_rgba(20,60,130,0.45)] ring-1 ring-white/60 backdrop-blur-sm">
            <HeroMockup />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
