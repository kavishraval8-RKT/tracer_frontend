export default function CapabilitiesGrid() {
  const capabilities = [
    {
      title: "Agentic Schematic Drafting",
      description:
        "Describe your circuit in natural language. The AI automatically places components, connects nets, and follows best practices.",
      icon: "📐",
    },
    {
      title: "Smart Editing",
      description:
        "Make changes with simple commands. Swap components, reroute traces, or adjust layouts without manual tedium.",
      icon: "✏️",
    },
    {
      title: "Design Rule Guard",
      description:
        "Real-time ERC/DRC checking catches errors before they become problems. Stay compliant with manufacturing constraints.",
      icon: "🛡️",
    },
    {
      title: "Auto-Routing 2.0",
      description:
        "Intelligent PCB routing that understands signal integrity, thermal management, and layer stackup constraints.",
      icon: "🔌",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {capabilities.map((capability) => (
        <div
          key={capability.title}
          className="group rounded-md border border-white/10 bg-black p-8 transition-all hover:border-white/20"
        >
          <div className="mb-4 text-4xl">{capability.icon}</div>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
            {capability.title}
          </h3>
          <p className="leading-relaxed text-zinc-400">
            {capability.description}
          </p>
        </div>
      ))}
    </div>
  );
}
