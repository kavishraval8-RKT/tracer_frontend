import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Product updates and technical deep dives from Tracer.",
};

const posts = [
  {
    title: "Introducing Tracer 2.0",
    date: "September 10, 2026",
    excerpt: "Major update brings agentic AI capabilities and improved routing algorithms. Learn what's new.",
    slug: "tracer-2-0",
  },
  {
    title: "PCB Design Best Practices with AI",
    date: "August 28, 2026",
    excerpt: "How to combine traditional design expertise with AI assistance for optimal results.",
    slug: "ai-pcb-best-practices",
  },
  {
    title: "Building Our Custom AI Model: Ohm",
    date: "August 15, 2026",
    excerpt: "Behind the scenes of training an AI model specifically for circuit design tasks.",
    slug: "building-ohm-model",
  },
];

/** Decorative circuit-trace artwork for post covers. */
function Cover({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-[linear-gradient(180deg,#DEE3F1_0%,#ECEFF7_100%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-10 60 H120 L150 30 H280 L300 50 H410" stroke="#60a5fa" />
          <path d="M-10 100 H160 L180 120 H330 L350 100 H410" stroke="#818cf8" />
          <path d="M-10 150 H90 L120 170 H250 L280 140 H410" stroke="#93c5fd" />
        </g>
        <g fill="#fff" stroke="#6366f1" strokeWidth="3">
          <circle cx="150" cy="30" r="6" />
          <circle cx="180" cy="120" r="6" />
          <circle cx="280" cy="140" r="6" />
        </g>
      </svg>
    </div>
  );
}

function ComingSoon() {
  return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">Coming soon</span>;
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="px-6 pt-20 pb-8 sm:pt-28">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Notes from <span className="text-slate-500">the workbench.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Product updates and technical deep dives on AI-assisted hardware design.
        </p>
      </header>

      <article className="mx-auto mt-16 grid max-w-6xl overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:grid-cols-2">
        <Cover className="min-h-56 lg:min-h-80" />
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <time className="text-sm text-slate-500">{featured.date}</time>
            <ComingSoon />
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{featured.excerpt}</p>
        </div>
      </article>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-2">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <Cover className="h-40" />
            <div className="p-8">
              <div className="flex items-center gap-3">
                <time className="text-sm text-slate-500">{post.date}</time>
                <ComingSoon />
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{post.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
