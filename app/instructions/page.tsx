import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Install Tracer, connect your account, and make your first AI-assisted change in KiCad.",
};

const sections = [
  { id: "requirements", label: "Before you start" },
  { id: "install", label: "Install the plugin" },
  { id: "connect", label: "Connect your account" },
  { id: "interface", label: "Know the interface" },
  { id: "first-prompt", label: "Send your first prompt" },
  { id: "review", label: "Review, keep, or undo" },
  { id: "options", label: "Modes and options" },
  { id: "shortcuts", label: "Keyboard shortcuts" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

function Section({
  id,
  n,
  title,
  intro,
  children,
}: {
  id: string;
  n: number;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-100 pt-12 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/15">
          {n}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      </div>
      {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">
            {i + 1}
          </span>
          <div className="leading-relaxed text-slate-700">{item}</div>
        </li>
      ))}
    </ol>
  );
}

function Result({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-xl border border-emerald-600/15 bg-emerald-50/60 px-4 py-3 text-sm leading-relaxed text-emerald-900">
      <span className="font-semibold">You should see: </span>
      {children}
    </p>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
      {children}
    </p>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[0.8em] text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.08)]">
      {children}
    </kbd>
  );
}

function UI({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-slate-900">{children}</strong>;
}

const examples = [
  {
    vague: "Add power",
    specific: "Add a 3.3 V LDO for the ESP32, with 1 µF capacitors on the input and output.",
  },
  {
    vague: "Fix the routing",
    specific: "Route USB_D+ and USB_D− as a 90 Ω differential pair on F.Cu.",
  },
  {
    vague: "Clean up the board",
    specific: "Move C12 outside the antenna keep-out zone without changing other parts.",
  },
];

const modes = [
  { mode: "Agent", does: "Makes changes to your schematic or board.", when: "You want Tracer to do the work. This is the default." },
  { mode: "Ask", does: "Answers questions about your design without editing it.", when: "You want an explanation, like “Which ESP32 pin should drive the status LED?”" },
  { mode: "Plan", does: "Lays out the steps it would take, without applying them.", when: "You want to review an approach before anything changes." },
  { mode: "Debug", does: "Investigates errors and problems in your design.", when: "ERC or DRC reports issues you want explained and fixed." },
];

const shortcuts = [
  { keys: ["Enter"], action: "Send your prompt" },
  { keys: ["Shift", "Enter"], action: "Add a new line without sending" },
  { keys: ["Esc"], action: "Close an open dropdown, or close Tracer if none is open" },
];

const problems = [
  {
    symptom: "The Tracer button isn't in the toolbar",
    fix: "Check that Tracer is listed on the Installed tab of the Plugin and Content Manager, then close KiCad completely and reopen it.",
  },
  {
    symptom: "The file name reads “no schematic open in KiCad”",
    fix: "Open a schematic or board in KiCad. Tracer detects the active file automatically.",
  },
  {
    symptom: "The send button is amber",
    fix: "Tracer asked you a question in the chat panel. Type your answer and press Enter to continue the same task.",
  },
  {
    symptom: "A request is taking too long",
    fix: "Click the stop button to cancel, then send a smaller, more specific prompt.",
  },
  {
    symptom: "The changes aren't what you wanted",
    fix: "Click Discard in the Changes tab, or use Undo to return to an earlier prompt.",
  },
];

export default function InstructionsPage() {
  return (
    <div className="mx-auto flex max-w-7xl">
      <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto py-12 lg:block">
        <nav className="space-y-1 px-6" aria-label="On this page">
          <p className="mb-4 px-3 text-sm font-semibold text-slate-900">On this page</p>
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <span className="w-4 shrink-0 text-slate-400">{i + 1}</span>
              {section.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 px-6 py-12 lg:px-12">
        <article className="mx-auto max-w-3xl rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 md:p-16">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Getting started with Tracer</h1>
          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            Install the plugin, connect your account, and make your first AI-assisted change in KiCad. Each step
            ends with what you should see, so you know it worked before moving on.
          </p>

          <div className="mt-14 space-y-12">
            <Section id="requirements" n={1} title="Before you start">
              <ul className="space-y-3 text-slate-700">
                {[
                  <>
                    <UI>KiCad 10 or later</UI> on Windows, macOS, or Linux.
                  </>,
                  <>
                    <UI>Tracer early access.</UI> If you don&apos;t have it yet,{" "}
                    <Link href="/download" className="font-medium text-blue-600 hover:text-blue-700">
                      join the waitlist
                    </Link>
                    .
                  </>,
                  <>
                    <UI>A KiCad project</UI> with a schematic (<code className="font-mono text-sm">.kicad_sch</code>) or
                    board (<code className="font-mono text-sm">.kicad_pcb</code>) to try Tracer on.
                  </>,
                  <>
                    <UI>An internet connection</UI> for the hosted AI assistant.
                  </>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="install" n={2} title="Install the plugin">
              <Steps
                items={[
                  <>
                    Download the Tracer plugin <UI>.zip</UI> file from your early-access email. Don&apos;t unzip it.
                  </>,
                  <>
                    Open KiCad. In the main project window, open <UI>Plugin and Content Manager</UI>.
                  </>,
                  <>
                    Click <UI>Install from File…</UI> and choose the .zip file you downloaded.
                  </>,
                  <>When the install finishes, close KiCad completely and open it again.</>,
                ]}
              />
              <Result>
                Tracer listed on the <UI>Installed</UI> tab of the Plugin and Content Manager.
              </Result>
            </Section>

            <Section
              id="connect"
              n={3}
              title="Connect your account"
              intro="Tracer uses an API key to link the plugin to your account. You only do this once on each computer."
            >
              <Steps
                items={[
                  <>Open a project, then open its Schematic Editor or PCB Editor.</>,
                  <>
                    Click the <UI>Tracer</UI> button in the editor&apos;s top toolbar.
                  </>,
                  <>
                    When prompted, paste the API key from your early-access email and click <UI>Activate</UI>.
                  </>,
                ]}
              />
              <Result>the Tracer prompt bar and chat panel open over the editor.</Result>
              <Note>Keep your API key private. Anyone who has it can use your account.</Note>
            </Section>

            <Section id="interface" n={4} title="Know the interface" intro="Tracer has two parts that work together.">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">Prompt bar</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Where you type requests. It also holds the mode and model menus, the <UI>+</UI> attach button,
                    the <UI>Auto ERC/DRC</UI> checkbox, Undo, and Send. The file name shows which KiCad file Tracer
                    is working on.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">Chat panel</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Shows Tracer&apos;s replies, an <UI>Activity</UI> tab with each step it takes, and a{" "}
                    <UI>Changes</UI> tab listing every edit it makes to your design.
                  </p>
                </div>
              </div>
              <Note>
                Check the file name before your first prompt. If it reads “no schematic open in KiCad”, open a
                schematic or board and Tracer will pick it up.
              </Note>
            </Section>

            <Section id="first-prompt" n={5} title="Send your first prompt">
              <Steps
                items={[
                  <>Click the prompt bar and describe one specific change. Name parts, nets, and values where you can.</>,
                  <>
                    Press <Kbd>Enter</Kbd> to send. Press <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> for a new line.
                  </>,
                  <>
                    Follow the reply in the chat panel. While Tracer works, the send button becomes a stop button;
                    click it to cancel.
                  </>,
                ]}
              />

              <h3 className="mt-10 font-semibold text-slate-900">Write specific prompts</h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                Tracer does its best work when a request has one clear goal and names what it should touch.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                {examples.map((ex) => (
                  <div
                    key={ex.vague}
                    className="grid gap-1 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm text-slate-400 line-through decoration-slate-300">{ex.vague}</p>
                    <p className="text-sm font-medium text-slate-900">{ex.specific}</p>
                  </div>
                ))}
              </div>

              <Note>
                If Tracer needs more detail, it asks a question in the chat and the send button turns amber. Type
                your answer and press <Kbd>Enter</Kbd>; Tracer continues the same task.
              </Note>
            </Section>

            <Section
              id="review"
              n={6}
              title="Review, keep, or undo"
              intro="Nothing Tracer does is hidden. Every edit is listed so you can check it before you accept it."
            >
              <Steps
                items={[
                  <>
                    Open the <UI>Changes</UI> tab in the chat panel. Lines starting with <UI>+</UI> were added,{" "}
                    <UI>~</UI> were modified, and <UI>−</UI> were removed.
                  </>,
                  <>Look over the edits in the KiCad editor itself.</>,
                  <>
                    Click <UI>Keep</UI> to accept the changes, or <UI>Discard</UI> to throw them away.
                  </>,
                ]}
              />
              <h3 className="mt-10 font-semibold text-slate-900">Go back further</h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                Click <UI>Undo</UI> in the prompt bar and choose an earlier prompt. Tracer restores your KiCad files
                to the snapshot taken just before that prompt.
              </p>
              <Note>Undoing to an earlier prompt also removes the chat history that came after it.</Note>
            </Section>

            <Section id="options" n={7} title="Modes and options">
              <p className="leading-relaxed text-slate-600">
                Pick a mode from the menu next to <UI>+</UI> in the prompt bar.
              </p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Mode</th>
                      <th scope="col" className="px-5 py-3 font-semibold">What it does</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Use it when</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {modes.map((m) => (
                      <tr key={m.mode}>
                        <th scope="row" className="px-5 py-3 font-semibold text-slate-900">{m.mode}</th>
                        <td className="px-5 py-3">{m.does}</td>
                        <td className="px-5 py-3">{m.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="font-semibold text-slate-900">Model</dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">
                    Choose which AI model handles your requests. The menu lists the models available to you.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Auto ERC/DRC</dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">
                    When checked, Tracer runs KiCad&apos;s electrical rules check (schematics) or design rules check
                    (boards) after it makes changes.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Attach (+)</dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">
                    Add a file for context, or choose <UI>Screenshot KiCad</UI> so Tracer can see what&apos;s on your
                    screen. Remove an attachment with its <UI>×</UI>.
                  </dd>
                </div>
              </dl>
            </Section>

            <Section id="shortcuts" n={8} title="Keyboard shortcuts">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                {shortcuts.map((s) => (
                  <div
                    key={s.action}
                    className="flex flex-col gap-2 border-b border-slate-100 px-5 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm text-slate-700">{s.action}</span>
                    <span className="flex items-center gap-1.5 text-sm text-slate-400">
                      {s.keys.map((k, i) => (
                        <span key={k} className="flex items-center gap-1.5">
                          {i > 0 && "+"}
                          <Kbd>{k}</Kbd>
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="troubleshooting" n={9} title="Troubleshooting">
              <dl className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {problems.map((p) => (
                  <div key={p.symptom} className="px-5 py-4">
                    <dt className="font-medium text-slate-900">{p.symptom}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{p.fix}</dd>
                  </div>
                ))}
              </dl>
              <Note>
                Still stuck? Email{" "}
                <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
                  hello@tracer.dev
                </a>{" "}
                with your KiCad version, operating system, and the prompt you sent.
              </Note>
            </Section>
          </div>
        </article>
      </div>
    </div>
  );
}
