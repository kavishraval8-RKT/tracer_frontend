import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for policy pages: title block, section index, numbered sections, contact footer. */
export function LegalDoc({
  title,
  summary,
  updated,
  sections,
}: {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{summary}</p>
        <p className="mt-4 text-sm text-slate-500">Last updated {updated}</p>
      </header>

      <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 px-3 text-sm font-semibold text-slate-900">On this page</p>
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span className="w-4 shrink-0 text-slate-400">{i + 1}</span>
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        <article className="rounded-[2rem] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-slate-600">{s.body}</div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-slate-50 px-6 py-5 text-sm leading-relaxed text-slate-600 ring-1 ring-slate-200">
            Questions about this policy? Email{" "}
            <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
              hello@tracer.dev
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-700">
              contact page
            </Link>
            .
          </div>
        </article>
      </div>
    </div>
  );
}
