"use client";

import { useEffect, useRef, useState } from "react";
import { InteractiveDock } from "./InteractiveDock";
import {
  InteractiveChat,
  type ChangeItem,
  type ChatMessage,
  type LogItem,
} from "./InteractiveChat";

// Overlays are laid out on a fixed 1152×648 canvas and scaled to the wrapper,
// so the dock and chat keep their proportions instead of colliding on small screens.
const W = 1152;
const H = 648;

const initialMessages: ChatMessage[] = [
  { role: "user", text: "Add a 3.3V LDO for the ESP32 and route power on B.Cu" },
  {
    role: "assistant",
    text: "Placed U4 (AP2112K-3.3) with 1µF input and output caps next to the ESP32 supply pins. Routed +3V3 on B.Cu at 0.5 mm with 2 stitching vias. DRC passed with 0 errors.",
  },
  { role: "user", text: "Keep the antenna keep-out clear" },
  {
    role: "assistant",
    text: "Done. C12 and its via moved 1.2 mm outside the antenna keep-out. Nothing else changed.",
  },
];

const initialActivity: LogItem[] = [
  { kind: "Act", text: "place_footprint U4 AP2112K-3.3" },
  { kind: "Act", text: "route_net +3V3 layer=B.Cu width=0.5" },
  { kind: "Obs", text: "18.4 mm routed · 2 vias" },
  { kind: "Obs", text: "DRC passed · 0 errors · 8 ms" },
  { kind: "Act", text: "move C12 → (142.2, 61.0)" },
  { kind: "Sys", text: "keep-out zone respected" },
];

const initialChanges: ChangeItem[] = [
  { kind: "add", text: "U4 AP2112K-3.3 placed" },
  { kind: "add", text: "C11, C12 1µF placed" },
  { kind: "add", text: "+3V3 routed on B.Cu" },
  { kind: "mod", text: "C12 moved out of keep-out" },
];

export function HeroMockup() {
  const wrap = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [scale, setScale] = useState<number | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [activity, setActivity] = useState(initialActivity);
  const [changes, setChanges] = useState(initialChanges);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(wrap.current!);
    const pending = timers.current;
    return () => {
      ro.disconnect();
      pending.forEach(clearTimeout);
    };
  }, []);

  const log = (kind: LogItem["kind"], text: string) =>
    setActivity((a) => [...a, { kind, text }]);

  // Scripted demo reply: the landing page has no backend.
  function send(text: string) {
    const short = text.length > 36 ? `${text.slice(0, 36)}…` : text;
    setMessages((m) => [...m, { role: "user", text }]);
    log("Act", `plan "${short}"`);
    setBusy(true);
    timers.current.push(
      window.setTimeout(() => log("Obs", "read tracertest.kicad_pcb · 3 nets in scope"), 600),
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: `Staged the edit for "${short}". DRC ran clean with 0 errors. Review it in the Changes tab before it's written to the board.`,
          },
        ]);
        log("Obs", "DRC passed · 0 errors · 7 ms");
        setChanges((c) => [...c, { kind: "mod", text: `Staged: ${short}` }]);
        setBusy(false);
      }, 1800),
    );
  }

  function stop() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    log("Sys", "cancelled by user");
    setBusy(false);
  }

  return (
    <div
      ref={wrap}
      className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200/50 shadow-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/kicad-background.png"
        alt="KiCad PCB editor with the Tracer copilot open"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale ?? 1})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <InteractiveDock
          // Centered in the canvas area left of the chat (chat starts at x=808) so the two never overlap.
          className="absolute bottom-6 left-[68px]"
          busy={busy}
          onSend={send}
          onStop={stop}
        />
        <InteractiveChat
          className="absolute right-6 top-6 bottom-6 w-80"
          messages={messages}
          activity={activity}
          changes={changes}
          busy={busy}
        />
      </div>
    </div>
  );
}
