export default function VisualFeatures() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Card 1: Agentic Drafting (Vibrant Blue - Spans 2 columns) */}
      <div className="relative h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white shadow-xl md:col-span-2">
        <div className="relative z-10">
          <h3 className="mb-4 text-3xl font-medium leading-tight tracking-tight">
            Tracer listens to your design intent
          </h3>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            Describe your circuit in natural language. Tracer automatically places components, connects nets, and follows hardware best practices.
          </p>
        </div>
        
        {/* Mockup inside vibrant card - Command pill overlay */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="overflow-hidden rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/20">
              <input
                type="text"
                placeholder="Add a voltage regulator circuit..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                disabled
              />
              <div className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium text-white">Plan</div>
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 0h6v6H0zm0 10h6v6H0zm10-10h6v6h-6zm0 10h6v6h-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Smart Editing (Pristine White) */}
      <div className="relative h-[400px] overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-1">
        <div className="relative z-10">
          <h3 className="mb-4 text-2xl font-medium leading-tight tracking-tight text-[#111827]">
            Assists instantly when you need it
          </h3>
          <p className="mb-6 leading-relaxed text-[#6B7280]">
            Smart editing and intelligent routing built right into your workflow.
          </p>
        </div>

        {/* Mockup inside white card - Chat panel */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 px-3 py-2">
              <h4 className="text-[10px] font-semibold text-slate-900">Chat</h4>
            </div>
            <div className="space-y-2 p-3">
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-xl rounded-tr-sm bg-red-500 px-2 py-1.5 text-[10px] font-medium text-white">
                  Route traces
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-slate-100 px-2 py-1.5 text-[10px] text-slate-900">
                  Routing on B.Cu layer...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Design Rule Guard */}
      <div className="relative h-[400px] overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-1">
        <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#111827]">
          Real-time DRC validation
        </h3>
        <p className="leading-relaxed text-[#6B7280]">
          Catches impedance and clearance errors before fabrication.
        </p>
      </div>

      {/* Card 4: Auto-Routing 2.0 (Soft Gray Background - Spans 2 columns) */}
      <div className="relative h-[400px] overflow-hidden rounded-[2rem] border border-black/[0.04] bg-[#F1F3F5] p-10 shadow-inner md:col-span-2">
        <h3 className="mb-3 text-2xl font-medium tracking-tight text-[#111827]">
          Intelligent routing that understands physics
        </h3>
        <p className="leading-relaxed text-[#6B7280]">
          Respects your layer stackup and thermal constraints.
        </p>
      </div>
    </div>
  );
}
