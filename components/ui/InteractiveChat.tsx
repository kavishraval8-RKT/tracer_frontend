"use client";

import { useEffect, useRef, useState } from "react";

export type ChatMessage = { role: "user" | "assistant"; text: string };
export type LogItem = { kind: "Act" | "Obs" | "Err" | "Sys"; text: string };
export type ChangeItem = { kind: "add" | "mod" | "del"; text: string };

const TAG: Record<LogItem["kind"], string> = {
  Act: "bg-blue-600/10 text-blue-600",
  Obs: "bg-green-600/10 text-green-600",
  Err: "bg-red-600/10 text-red-600",
  Sys: "bg-zinc-500/10 text-zinc-600",
};

const CHANGE: Record<ChangeItem["kind"], [string, string]> = {
  add: ["+", "text-green-600"],
  mod: ["~", "text-amber-600"],
  del: ["-", "text-red-600"],
};

type Props = {
  className?: string;
  messages: ChatMessage[];
  activity?: LogItem[];
  changes?: ChangeItem[];
  busy?: boolean;
  showLog?: boolean;
};

export function InteractiveChat({
  className = "",
  messages,
  activity = [],
  changes = [],
  busy = false,
  showLog = true,
}: Props) {
  const [tab, setTab] = useState<"activity" | "changes">("activity");
  // Remembers how many changes the user reviewed, so new changes bring Keep/Discard back.
  const [review, setReview] = useState<{ n: number; verdict: string } | null>(null);
  const feed = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);

  // scrollTo on the element, not scrollIntoView, so the page itself never jumps.
  useEffect(() => {
    feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [activity, changes, tab]);

  const reviewed = review?.n === changes.length;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F7F7F4] text-[#26251E] shadow-2xl ${className}`}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-3 py-2 text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          Chat
          <svg viewBox="0 0 10 6" fill="none" stroke="#52525b" strokeWidth="1.4" className="h-1.5 w-2.5" aria-hidden>
            <path d="M1 1l4 4 4-4" />
          </svg>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          KiCad connected
        </span>
      </header>

      <div ref={feed} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] break-words rounded-2xl bg-red-500 px-3 py-2 text-xs leading-relaxed text-white">
                {m.text}
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="rounded-[14px] border border-slate-200/70 bg-slate-100 px-3.5 py-3 text-xs leading-relaxed text-slate-900"
            >
              {m.text}
            </div>
          ),
        )}
        {busy && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1 w-1 animate-pulse rounded-full bg-gray-400"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
            <span className="ml-1">thinking…</span>
          </div>
        )}
      </div>

      {showLog && (
        <footer className="shrink-0 border-t border-[#E5E7EB] bg-white">
          <div role="tablist" className="flex gap-1.5 bg-[#F7F7F4] px-3 py-2 text-[11px] font-medium">
            {(["activity", "changes"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-full px-3 py-1.5 capitalize transition-[color,background-color,box-shadow] ${
                  tab === t ? "bg-white text-[#26251E] shadow-sm" : "text-gray-500 hover:text-[#26251E]"
                }`}
              >
                {t}
                <span className="ml-1 inline-block rounded-full bg-black/[0.06] px-1.5 py-0.5 font-mono text-[10px]">
                  {t === "activity" ? activity.length : changes.length}
                </span>
              </button>
            ))}
          </div>

          <div ref={log} role="tabpanel" className="h-28 overflow-y-auto py-2">
            {tab === "activity" ? (
              activity.map((a, i) => (
                <div key={i} className="flex items-baseline gap-1.5 px-3.5 py-0.5">
                  <span className={`rounded-[3px] px-1.5 py-px font-mono text-[10px] ${TAG[a.kind]}`}>
                    {a.kind}
                  </span>
                  <span className="flex-1 break-words font-mono text-[10.5px] text-zinc-600">{a.text}</span>
                </div>
              ))
            ) : (
              <>
                {changes.map((c, i) => (
                  <div key={i} className={`px-3.5 py-1 font-mono text-[11px] ${CHANGE[c.kind][1]}`}>
                    {CHANGE[c.kind][0]} {i + 1}. {c.text}
                  </div>
                ))}
                {changes.length > 0 &&
                  (reviewed ? (
                    <p className="px-3.5 pt-2 text-[11px] text-gray-500">{review.verdict}</p>
                  ) : (
                    <div className="flex gap-2 px-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setReview({ n: changes.length, verdict: "Changes kept and written to the board." })}
                        className="flex-1 rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
                      >
                        Keep
                      </button>
                      <button
                        type="button"
                        onClick={() => setReview({ n: changes.length, verdict: "Changes discarded. Board restored." })}
                        className="flex-1 rounded border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-gray-50"
                      >
                        Discard
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
