export default function ModelGrid() {
  const models = [
    {
      name: "Claude 4",
      provider: "ANTHROPIC",
      description: "Advanced reasoning and analysis",
    },
    {
      name: "GPT-5",
      provider: "OPENAI",
      description: "Cutting-edge language understanding",
    },
    {
      name: "Gemini 3",
      provider: "GOOGLE",
      description: "Multimodal AI capabilities",
    },
    {
      name: "Ohm",
      provider: "TRACER / OUR MODEL",
      subtitle: "formerly Electrode 1.0",
      description: "Purpose-built for circuit design",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {models.map((model) => (
        <div
          key={model.name}
          className="group relative overflow-hidden rounded-xl border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-4">
            <h3 className="mb-1 font-mono text-lg font-semibold tracking-tight text-[#111827]">
              {model.name}
            </h3>
            {model.subtitle && (
              <p className="mb-2 font-mono text-xs text-slate-500">
                {model.subtitle}
              </p>
            )}
            <p className="font-mono text-xs text-slate-600">{model.provider}</p>
          </div>
          <p className="text-sm text-[#6B7280]">{model.description}</p>
        </div>
      ))}
    </div>
  );
}
