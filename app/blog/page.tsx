export default function BlogPage() {
  const posts = [
    {
      title: "Introducing Circuit Copilot 2.0",
      date: "September 10, 2026",
      excerpt:
        "Major update brings agentic AI capabilities and improved routing algorithms. Learn what's new.",
      slug: "circuit-copilot-2-0",
    },
    {
      title: "PCB Design Best Practices with AI",
      date: "August 28, 2026",
      excerpt:
        "How to combine traditional design expertise with AI assistance for optimal results.",
      slug: "ai-pcb-best-practices",
    },
    {
      title: "Building Our Custom AI Model: Ohm",
      date: "August 15, 2026",
      excerpt:
        "Behind the scenes of training an AI model specifically for circuit design tasks.",
      slug: "building-ohm-model",
    },
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          Blog
        </h1>
        <p className="mb-16 max-w-3xl text-xl text-slate-600 lg:text-2xl">
          Insights, updates, and technical deep-dives from the Tracer team.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
            >
              <time className="mb-3 block font-mono text-xs text-slate-500">
                {post.date}
              </time>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="mb-4 text-slate-600">{post.excerpt}</p>
              <span className="font-mono text-sm text-slate-900">Read more →</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
