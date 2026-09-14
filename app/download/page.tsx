"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Terminal, X } from "lucide-react";
import { reveal } from "@/lib/motion";
import { primaryCtaClass, WindowsIcon } from "@/components/ui/PrimaryCta";

type Platform = "Windows" | "macOS" | "Linux";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.37 12.64c-.03-2.62 2.14-3.88 2.24-3.94-1.22-1.78-3.12-2.03-3.8-2.06-1.62-.16-3.16.95-3.98.95-.82 0-2.08-.93-3.42-.9-1.76.03-3.38 1.02-4.29 2.6-1.83 3.17-.47 7.86 1.31 10.43.87 1.26 1.91 2.67 3.27 2.62 1.31-.05 1.81-.85 3.4-.85 1.58 0 2.03.85 3.42.82 1.41-.02 2.31-1.28 3.17-2.54 1-1.46 1.41-2.87 1.44-2.94-.03-.01-2.76-1.06-2.79-4.2zM13.76 4.94c.72-.87 1.21-2.09 1.08-3.3-1.04.04-2.3.69-3.05 1.57-.67.77-1.26 2.01-1.1 3.2 1.16.09 2.35-.59 3.07-1.47z" />
    </svg>
  );
}

const platforms: { name: Platform; icon: React.ComponentType<{ className?: string }>; requirements: string[] }[] = [
  {
    name: "Windows",
    icon: WindowsIcon,
    requirements: ["Windows 10 or later", "KiCad 10 or later", "4 GB RAM minimum", "100 MB disk space"],
  },
  {
    name: "macOS",
    icon: AppleIcon,
    requirements: ["macOS 12 Monterey or later", "KiCad 10 or later", "4 GB RAM minimum", "100 MB disk space"],
  },
  {
    name: "Linux",
    icon: Terminal,
    requirements: ["Ubuntu 20.04 or equivalent", "KiCad 10 or later", "4 GB RAM minimum", "100 MB disk space"],
  },
];

const ROLES = ["Hardware Engineer", "Embedded Developer", "Student", "Hobbyist", "Other"];

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

export default function DownloadPage() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [platform, setPlatform] = useState<Platform>("Windows");

  // Drive the native <dialog> from state: showModal() gives focus trapping, Escape-to-close and an inert page.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (isModalOpen && !d.open) d.showModal();
    if (!isModalOpen && d.open) d.close();
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [isModalOpen]);

  function openWaitlist(p: Platform) {
    setPlatform(p);
    setIsModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ponytail: no waitlist backend yet, so entries are not stored anywhere.
    // Send new FormData(e.currentTarget) to your waitlist API (or a form service) here before showing success.
    setIsSubmitted(true);
  }

  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Tracer is almost here. <span className="text-slate-500">Join the waitlist.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Tracer is rolling out to early users on Windows, macOS, and Linux. Pick your platform and we&apos;ll
          email you the moment your access is ready.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => openWaitlist("Windows")}
            className={`${primaryCtaClass} px-6 py-3 text-base`}
          >
            <WindowsIcon className="h-4 w-4" />
            Get for Windows
          </button>
        </div>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            {...reveal(i * 0.08)}
            className="flex flex-col rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 ring-1 ring-black/[0.04]">
              <p.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">{p.name}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {p.requirements.map((r) => (
                <li key={r} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openWaitlist(p.name)}
              className={`${primaryCtaClass} mt-8 w-full justify-center py-2.5 text-sm`}
            >
              Get for {p.name}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">No spam. One email when your access is ready.</p>

      <dialog
        ref={dialog}
        aria-labelledby="waitlist-title"
        onClose={() => setIsModalOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md scale-95 overflow-visible bg-transparent p-0 opacity-0 transition-all transition-discrete duration-300 ease-out backdrop:bg-slate-900/30 backdrop:backdrop-blur-md open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="relative rounded-3xl bg-white/85 p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)] ring-1 ring-white/70 backdrop-blur-2xl sm:p-10">
          {isSubmitted ? (
            <div role="status" className="py-4 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_12px_30px_-8px_rgba(59,130,246,0.6)]">
                <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
              </span>
              <h2 id="waitlist-title" className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
                You are on the waitlist!
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                We will notify you as soon as your access is ready.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full rounded-[10px] border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h2 id="waitlist-title" className="pr-8 text-2xl font-semibold tracking-tight text-slate-900">
                Join the Tracer waitlist
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Tracer for {platform} is rolling out to early users. Leave your details and we&apos;ll email you
                when it&apos;s your turn.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="wl-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="wl-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="wl-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="wl-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="wl-role" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <div className="relative">
                    <select id="wl-role" name="role" required defaultValue="" className={`${field} appearance-none pr-10`}>
                      <option value="" disabled>
                        Select your role
                      </option>
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
                <button type="submit" className={`${primaryCtaClass} mt-2 w-full justify-center py-3 text-sm`}>
                  Join the waitlist
                </button>
                <p className="text-center text-xs text-slate-500">No spam. One email when your access is ready.</p>
              </form>
            </>
          )}

          {/* After the content in DOM order so showModal() focuses the first field, not this button. */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </dialog>
    </div>
  );
}
