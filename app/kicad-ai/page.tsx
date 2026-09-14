export default function KiCadAIPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          KiCad AI
        </h1>
        <p className="mb-16 max-w-3xl text-xl text-slate-600 lg:text-2xl">
          Bring artificial intelligence directly into your KiCad workflow.
        </p>

        <div className="max-w-none">
          <p className="mb-6 text-lg leading-relaxed text-slate-600">
            Circuit Copilot is the first truly integrated AI assistant for
            KiCad. Unlike chat interfaces that require context switching, our
            plugin lives directly in your schematic and PCB editors.
          </p>

          <h2 className="mb-4 mt-12 text-3xl font-semibold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-slate-600">
            Describe your circuit requirements in natural language. The AI
            understands component specifications, design constraints, and best
            practices. It generates schematics, routes traces, and validates
            designs against your rules.
          </p>

          <h2 className="mb-4 mt-12 text-3xl font-semibold tracking-tight text-slate-900">
            Key Features
          </h2>
          <ul className="mb-6 space-y-3 text-lg text-slate-600">
            <li>• Natural language circuit description</li>
            <li>• Automated component placement and routing</li>
            <li>• Real-time design rule checking</li>
            <li>• Multi-model AI support (Claude, GPT, Gemini, Ohm)</li>
            <li>• Contextual suggestions and error fixes</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
