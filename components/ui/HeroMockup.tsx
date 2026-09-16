"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MousePointer2 } from "lucide-react";
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

// Autoplay walkthrough, replayed while the mockup is on screen: the cursor switches model,
// types this prompt, sends it and keeps the result.
const DEMO_PROMPT = "Add USB-C power input with ESD protection";
const MOVE_MS = 750;
const REPLAY_GAP_MS = 3500;

type Reply = { steps: [number, LogItem][]; doneAt: number; text: string; changes: ChangeItem[] };

const demoReply: Reply = {
  steps: [
    [500, { kind: "Obs", text: "read tracertest.kicad_pcb · 3 nets in scope" }],
    [1200, { kind: "Act", text: "place_footprint J1 USB_C_Receptacle" }],
    [1900, { kind: "Act", text: "place_footprint U5 USBLC6-2SC6" }],
    [2600, { kind: "Act", text: "route_net VBUS layer=F.Cu width=0.8" }],
    [3300, { kind: "Obs", text: "DRC passed · 0 errors · 9 ms" }],
  ],
  doneAt: 3600,
  text: "Added J1 (USB-C receptacle) with 5.1 kΩ CC pull-downs and a USBLC6-2 ESD array beside the connector. VBUS routed on F.Cu at 0.8 mm. DRC passed with 0 errors. Review it in Changes.",
  changes: [
    { kind: "add", text: "J1 USB-C receptacle placed" },
    { kind: "add", text: "U5 USBLC6-2 ESD array placed" },
    { kind: "add", text: "R7, R8 5.1k CC pull-downs" },
    { kind: "add", text: "VBUS routed on F.Cu" },
  ],
};

type Cursor = { x: number; y: number; clicks: number };

export function HeroMockup() {
  const wrap = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const demoTimers = useRef<number[]>([]);
  const [scale, setScale] = useState<number | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [activity, setActivity] = useState(initialActivity);
  const [changes, setChanges] = useState(initialChanges);
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const [demoOff, setDemoOff] = useState(false);
  // Bumped before each replay so the dock and chat remount with their initial state.
  const [round, setRound] = useState(0);
  const dirty = useRef(false);
  // Most of the mockup must be on screen, so the prompt box at its bottom is visible when the cursor starts.
  const inView = useInView(wrap, { amount: 0.7 });
  const ready = scale !== null;

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(wrap.current!);
    const pending = timers.current;
    return () => {
      ro.disconnect();
      pending.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!inView || !ready || demoOff) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = wrap.current!;
    const pending = demoTimers.current;
    const wait = (ms: number) => new Promise<void>((r) => void pending.push(window.setTimeout(r, ms)));
    const find = (selector: string, text = "") =>
      [...box.querySelectorAll<HTMLElement>(selector)].find((el) => el.textContent?.trim().startsWith(text));

    // Positions are in canvas units so the cursor scales with the mockup.
    const moveTo = async (el: HTMLElement | undefined, fx = 0.5) => {
      if (!el) return;
      const w = box.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const k = w.width / W;
      setCursor((c) => ({
        x: (r.left - w.left + r.width * fx) / k,
        y: (r.top - w.top + r.height * 0.6) / k,
        clicks: c?.clicks ?? 0,
      }));
      await wait(MOVE_MS + 150);
    };
    // Real DOM clicks, so the demo drives the same handlers a visitor would.
    const click = async (el: HTMLElement | undefined) => {
      if (!el) return;
      await moveTo(el);
      setCursor((c) => c && { ...c, clicks: c.clicks + 1 });
      el.click();
      await wait(500);
    };

    const reset = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setMessages(initialMessages);
      setActivity(initialActivity);
      setChanges(initialChanges);
      setBusy(false);
      setPrompt("");
      setRound((r) => r + 1);
    };

    const play = async () => {
      if (dirty.current) {
        reset();
        await wait(600);
      }
      dirty.current = true;
      setCursor({ x: 620, y: 330, clicks: 0 });
      await wait(400);
      await click(find('[aria-label^="Model:"]'));
      await click(find('[role="option"]', "GPT-6 Astra"));
      await moveTo(find('input[type="text"]'), 0.1);
      for (let i = 1; i <= DEMO_PROMPT.length; i++) {
        setPrompt(DEMO_PROMPT.slice(0, i));
        await wait(38);
      }
      await wait(350);
      await click(find('[aria-label="Send"]'));
      await wait(demoReply.doneAt + 400);
      await click(find('[role="tab"]', "changes"));
      await wait(600);
      await click(find("button", "Keep"));
      await wait(900);
      setCursor(null);
    };

    (async () => {
      await wait(900);
      for (;;) {
        await play();
        await wait(REPLAY_GAP_MS);
      }
    })();

    return () => {
      pending.forEach(clearTimeout);
      pending.length = 0;
      setCursor(null);
    };
  }, [inView, ready, demoOff]);

  // Any real click or keypress hands the mockup back to the visitor.
  function takeOver() {
    if (demoOff) return;
    setDemoOff(true);
    setPrompt((p) => (DEMO_PROMPT.startsWith(p) ? "" : p));
  }

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  const log = (kind: LogItem["kind"], text: string) =>
    setActivity((a) => [...a, { kind, text }]);

  // Scripted replies: the landing page has no backend.
  function send(text: string) {
    const short = text.length > 36 ? `${text.slice(0, 36)}…` : text;
    const reply: Reply =
      text === DEMO_PROMPT
        ? demoReply
        : {
            steps: [
              [600, { kind: "Obs", text: "read tracertest.kicad_pcb · 3 nets in scope" }],
              [1800, { kind: "Obs", text: "DRC passed · 0 errors · 7 ms" }],
            ],
            doneAt: 1800,
            text: `Staged the edit for "${short}". DRC ran clean with 0 errors. Review it in the Changes tab before it's written to the board.`,
            changes: [{ kind: "mod", text: `Staged: ${short}` }],
          };
    setMessages((m) => [...m, { role: "user", text }]);
    log("Act", `plan "${short}"`);
    setBusy(true);
    for (const [ms, item] of reply.steps) later(() => setActivity((a) => [...a, item]), ms);
    later(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply.text }]);
      setChanges((c) => [...c, ...reply.changes]);
      setBusy(false);
    }, reply.doneAt);
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
      onPointerDownCapture={takeOver}
      onKeyDownCapture={takeOver}
      className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200/50 shadow-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/kicad-background.png"
        alt="KiCad PCB editor with the Tracer copilot open"
        width={1917}
        height={1078}
        fetchPriority="high"
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
          key={`dock-${round}`}
          // Centered in the canvas area left of the chat (chat starts at x=808) so the two never overlap.
          className="absolute bottom-6 left-[68px]"
          prompt={prompt}
          onPromptChange={setPrompt}
          busy={busy}
          onSend={send}
          onStop={stop}
        />
        <InteractiveChat
          key={`chat-${round}`}
          className="absolute right-6 top-6 bottom-6 w-80"
          messages={messages}
          activity={activity}
          changes={changes}
          busy={busy}
        />
        <AnimatePresence>
          {cursor && !demoOff && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-30"
              initial={{ opacity: 0, x: cursor.x, y: cursor.y }}
              animate={{ opacity: 1, x: cursor.x, y: cursor.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: MOVE_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
            >
              <motion.span
                key={cursor.clicks}
                className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-blue-500/30"
                initial={{ scale: cursor.clicks ? 0.3 : 0, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <MousePointer2
                className="relative -left-1 -top-1 h-6 w-6 fill-slate-900 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,0.35)]"
                strokeWidth={1.5}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
