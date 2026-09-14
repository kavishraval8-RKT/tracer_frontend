"use client";

import { useEffect, useRef, useState } from "react";

const MODES = ["Agent", "Ask", "Plan", "Debug"];
const MODELS = ["Claude Sonnet", "GPT-5", "Gemini 3 Pro", "Ohm"];
const ATTACH = ["Attach file…", "Screenshot KiCad"];

type Menu = "attach" | "mode" | "model";

type Props = {
  /** Positioning; defaults to the hero placement. */
  className?: string;
  defaultPrompt?: string;
  busy?: boolean;
  onSend?: (text: string) => void;
  onStop?: () => void;
};

const pill =
  "flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50";

export function InteractiveDock({
  className = "absolute bottom-6 left-1/2 -translate-x-1/2",
  defaultPrompt = "",
  busy = false,
  onSend,
  onStop,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [mode, setMode] = useState(MODES[0]);
  const [model, setModel] = useState(MODELS[0]);
  const [autoCheck, setAutoCheck] = useState(true);
  const [files, setFiles] = useState<string[]>([]);
  const [open, setOpen] = useState<Menu | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (menu: Menu) => setOpen(open === menu ? null : menu);

  function submit() {
    if (busy) return onStop?.();
    const text = prompt.trim();
    if (!text) return;
    onSend?.(text);
    setPrompt("");
    setFiles([]);
  }

  function attach(item: string) {
    const name = item === "Screenshot KiCad" ? "kicad-screenshot.png" : "power_supply.kicad_sch";
    setFiles((f) => (f.includes(name) ? f : [...f, name]));
    setOpen(null);
  }

  return (
    <div
      ref={ref}
      className={`${className} z-20 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-4 px-5 shadow-[0_20px_40px_rgba(0,0,0,0.1)]`}
    >
      {/* Row 1: status */}
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        <span className="font-mono text-xs font-semibold text-emerald-500">tracertest.kicad_pcb</span>
      </div>

      {files.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {files.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 py-0.5 pl-2 pr-1 text-xs text-slate-700"
            >
              {f}
              <button
                type="button"
                aria-label={`Remove ${f}`}
                onClick={() => setFiles(files.filter((x) => x !== f))}
                className="flex h-4 w-4 items-center justify-center rounded text-slate-500 hover:bg-black/[0.06] hover:text-slate-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Row 2: input */}
      <input
        type="text"
        aria-label="Describe what you want to build"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Describe what you want to build or type a command..."
        className="mb-4 w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-slate-400"
      />

      {/* Row 3: controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              aria-label="Attach"
              aria-haspopup="listbox"
              aria-expanded={open === "attach"}
              onClick={() => toggle("attach")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M8 3v10M3 8h10" />
              </svg>
            </button>
            {open === "attach" && <Options items={ATTACH} onPick={attach} />}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={`Mode: ${mode}`}
              aria-haspopup="listbox"
              aria-expanded={open === "mode"}
              onClick={() => toggle("mode")}
              className={pill}
            >
              {mode}
              <Chevron />
            </button>
            {open === "mode" && (
              <Options
                items={MODES}
                value={mode}
                onPick={(v) => {
                  setMode(v);
                  setOpen(null);
                }}
              />
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={`Model: ${model}`}
              aria-haspopup="listbox"
              aria-expanded={open === "model"}
              onClick={() => toggle("model")}
              className={pill}
            >
              {model}
              <Chevron />
            </button>
            {open === "model" && (
              <Options
                items={MODELS}
                value={model}
                onPick={(v) => {
                  setModel(v);
                  setOpen(null);
                }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer select-none items-center gap-2 whitespace-nowrap text-sm text-slate-600">
            <input
              type="checkbox"
              checked={autoCheck}
              onChange={(e) => setAutoCheck(e.target.checked)}
              className="h-4 w-4 accent-red-500"
            />
            Auto ERC/DRC
          </label>

          <button
            type="button"
            onClick={submit}
            aria-label={busy ? "Stop" : "Send"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-colors ${
              busy ? "bg-zinc-900 hover:bg-zinc-800" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {busy ? (
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13V3m-4 4l4-4 4 4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-1.5 w-2.5 text-slate-500" aria-hidden>
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

function Options({
  items,
  value,
  onPick,
}: {
  items: string[];
  value?: string;
  onPick: (item: string) => void;
}) {
  return (
    <div
      role="listbox"
      className="absolute bottom-[calc(100%+8px)] left-0 z-10 min-w-full rounded-xl border border-slate-200 bg-white p-1 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.18),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      {items.map((it) => (
        <button
          key={it}
          type="button"
          role="option"
          aria-selected={it === value}
          onClick={() => onPick(it)}
          className={`block w-full whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
            it === value ? "bg-red-50 text-red-600" : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {it}
        </button>
      ))}
    </div>
  );
}
