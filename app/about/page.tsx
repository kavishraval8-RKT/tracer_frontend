export default function AboutPage() {
  const timeline = [
    {
      phase: "01",
      title: "Flight Computers & Telemetry",
      description:
        "Designing custom PCBs and avionics where every millimeter and impedance rule mattered. Building telemetry systems for model rocketry and aerospace applications.",
    },
    {
      phase: "02",
      title: "The Global Stage",
      description:
        "Scaling our designs for international aerospace competitions (TEKNOFEST) and realizing the need for extreme iteration speed. Achieved 19th place globally in preliminary design reviews.",
    },
    {
      phase: "03",
      title: "Building the Copilot",
      description:
        "Developing an LLM-backed KiCad assistant that bridges the gap between natural language intent and structured hardware data. AI that understands circuits, not just code.",
    },
    {
      phase: "04",
      title: "Tracer Launch",
      description:
        "Bringing agentic drafting and smart DRC checks to hardware engineers worldwide. Transforming PCB design from tedious manual work to conversational iteration.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32">
          <h1 className="mb-6 text-center text-5xl font-semibold tracking-tight text-slate-900 lg:text-6xl">
            Born from aerospace. Built for KiCad.
          </h1>
          <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-slate-600">
            Tracer wasn't conceived in a software lab. It was forged in the
            trenches of custom embedded systems, flight control computers, and
            avionics telemetry.
          </p>
        </div>
      </section>

      {/* The Real Story */}
      <section className="border-b border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
              The Real Story
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-700">
                While designing complex PCBs for model rocketry and pushing for
                global aerospace qualifications—including securing a top 19th
                global rank in international preliminary design reviews—our
                engineering team hit a wall.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                The bottleneck wasn't our physics or our logic; it was the
                manual tedium of routing traces and checking clearances in
                KiCad. We needed a copilot that understood hardware as well as
                our avionics and mechanical divisions did.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                So, we built Tracer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey - Timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-semibold tracking-tight text-slate-900">
            Our Journey
          </h2>
          <div className="relative space-y-12">
            {/* Vertical tracking line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300" />

            {timeline.map((item) => (
              <div key={item.phase} className="relative pl-20">
                {/* Phase badge */}
                <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 font-mono text-sm font-bold text-white shadow-lg">
                  {item.phase}
                </div>

                {/* Content card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]">
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-12">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              We're building AI that understands hardware. Not just generating
              code, but reasoning about trace widths, impedance matching, and
              DRC violations. Tracer is for engineers who think in schematics
              and speak in netlists—but want to iterate at the speed of
              thought.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
