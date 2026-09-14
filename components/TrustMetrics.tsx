const metrics = [
  {
    value: "< 10ms",
    label: "DRC validation speed",
    detail: "Rule checks run on every edit, before anything is written to the board.",
  },
  {
    value: "v7 & v8",
    label: "Native Support",
    detail: "Runs as a plugin inside KiCad 7 and 8. No exports, no separate web app.",
  },
  {
    value: "100%",
    label: "Local IP Protection",
    detail: "Your designs are never used for model training. Local-only processing is available for teams.",
  },
];

export default function TrustMetrics() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {metrics.map((m) => (
          <div key={m.label} className="px-2 py-12 md:px-10 md:py-16 md:first:pl-0">
            <div className="text-5xl font-semibold tracking-tighter text-slate-900">{m.value}</div>
            <div className="mt-4 font-medium text-slate-900">{m.label}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
