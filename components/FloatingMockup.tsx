"use client";

import { motion } from "framer-motion";

export default function FloatingMockup() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Frosted Glass Frame */}
      <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
        {/* macOS-style Dark Window */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-xl">
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#1a1a1c] px-4 py-3">
            {/* Traffic Lights */}
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            {/* Window Title */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="font-mono text-xs text-zinc-500">
                Tracer AI Copilot
              </span>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="space-y-6 p-8">
            {/* User Prompt (Right-aligned) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-end"
            >
              <div className="max-w-md rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-5 py-3.5 shadow-lg">
                <p className="text-sm text-white">
                  Route the SPI bus for the ESP32.
                </p>
              </div>
            </motion.div>

            {/* AI Response (Left-aligned) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-start"
            >
              <div className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-zinc-900/50 px-5 py-4 shadow-lg">
                <p className="text-sm leading-relaxed text-zinc-300">
                  Routing the SPI bus to the display controller while respecting
                  the 90-ohm differential impedance rules. Placing traces on the
                  top copper layer with 0.2mm spacing...
                </p>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-white/10 bg-zinc-800/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-700/50"
                  >
                    Auto-Route
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-white/10 bg-zinc-800/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-700/50"
                  >
                    Check DRC
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-white/10 bg-zinc-800/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:bg-zinc-700/50"
                  >
                    Export BOM
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Input Bar */}
          <div className="border-t border-white/5 bg-[#1a1a1c] px-6 py-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3">
              <input
                type="text"
                placeholder="Ask Tracer to modify your design..."
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                disabled
              />
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg transition-transform hover:scale-105">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 to-orange-400/20 blur-3xl" />
    </div>
  );
}
