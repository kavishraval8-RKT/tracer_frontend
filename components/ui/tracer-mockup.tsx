"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronDown, Square } from "lucide-react"

export function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

export function TracerMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
        <img
          src="/kicad-background.png"
          alt="KiCad Editor"
          className="pointer-events-none h-auto w-full select-none object-cover"
        />
        <DockOverlay />
        <ChatPanel />
      </div>
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-orange-400/30 blur-3xl" />
    </motion.div>
  )
}

function DockOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 z-20 flex w-full max-w-3xl -translate-x-1/2 items-center gap-3 rounded-full bg-white p-2 pl-6 pr-2 shadow-2xl"
    >
      <input type="text" placeholder="Describe what you want to build..." className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" disabled />
      <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
        Plan<ChevronDown className="h-3 w-3 text-slate-500" />
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700 shadow-sm ring-1 ring-slate-200">
        gemini-2.5-pro<ChevronDown className="h-3 w-3 text-slate-500" />
      </div>
      <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
        <input type="checkbox" className="h-3.5 w-3.5 accent-red-500" defaultChecked disabled />
        <span className="whitespace-nowrap">Auto ERC/DRC</span>
      </label>
      <span className="ml-auto font-mono text-xs font-medium text-green-600">power_supply.kicad_pcb</span>
      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-600">
        <Square className="h-4 w-4 fill-current" />
      </button>
    </motion.div>
  )
}

function ChatPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="absolute bottom-6 right-6 top-6 z-20 flex w-80 flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <h3 className="text-sm font-semibold text-slate-900">Chat</h3>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-red-500 px-4 py-3 shadow-sm">
            <p className="text-sm font-medium leading-relaxed text-white">Add a 5V voltage regulator to the schematic</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm leading-relaxed text-slate-900">I'll add an LM7805 voltage regulator with 100nF input/output capacitors and wire it to your power nets.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-red-500 px-4 py-3 shadow-sm">
            <p className="text-sm font-medium leading-relaxed text-white">Route traces on the back copper layer</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm leading-relaxed text-slate-900">Routing on B.Cu layer while maintaining 0.2mm clearance rules...</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/80">
        <div className="flex border-b border-slate-200">
          <button className="flex-1 border-b-2 border-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-900">Activity</button>
          <button className="flex-1 px-5 py-2.5 text-xs font-medium text-slate-500 hover:text-slate-900">Changes</button>
        </div>
        <div className="space-y-1 p-4 font-mono text-[10px] leading-relaxed text-slate-600">
          <div className="flex items-start gap-2"><span className="text-blue-500">Sys:</span><span>Device:LED added at (120, 80)</span></div>
          <div className="flex items-start gap-2"><span className="text-blue-500">Sys:</span><span>Net:GND connected</span></div>
          <div className="flex items-start gap-2"><span className="text-green-500">✓</span><span>DRC check passed</span></div>
          <div className="flex items-start gap-2"><span className="text-blue-500">Sys:</span><span>Trace routed: B.Cu layer</span></div>
        </div>
      </div>
    </motion.div>
  )
}
