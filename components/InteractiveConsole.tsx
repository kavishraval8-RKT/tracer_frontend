"use client";

import { useState } from "react";

export default function InteractiveConsole() {
  const [prompt, setPrompt] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Claude 4");
  const [autoCheck, setAutoCheck] = useState(true);

  const agents = ["Claude 4", "GPT-5", "Gemini 3", "Ohm"];

  return (
    <div className="mx-auto max-w-4xl">
      <div 
        className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
        style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)' }}
      >
        {/* Terminal Header - Sleek Monochromatic */}
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-4 py-3">
          <div className="rounded bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-500">
            tracer.terminal
          </div>
        </div>

        {/* Text Area */}
        <div className="p-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your circuit design in plain language...&#10;&#10;Example: Design a USB-C power delivery board with 5V/3A output, include overcurrent protection and status LEDs."
            className="h-64 w-full resize-none bg-transparent font-mono text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-zinc-950 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Agent Dropdown */}
            <div className="flex items-center gap-2">
              <label className="font-mono text-xs text-zinc-400">Agent:</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="rounded-md border border-white/10 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700"
              >
                {agents.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto ERC/DRC Checkbox */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoCheck}
                onChange={(e) => setAutoCheck(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-zinc-900 text-white focus:ring-1 focus:ring-zinc-700 focus:ring-offset-0"
              />
              <span className="font-mono text-xs text-zinc-400">
                Auto ERC/DRC
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="rounded-md bg-white px-6 py-2 font-mono text-sm font-medium text-black shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors hover:bg-zinc-200">
            Generate Design
          </button>
        </div>
      </div>
    </div>
  );
}
