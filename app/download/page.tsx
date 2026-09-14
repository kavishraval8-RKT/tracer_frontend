"use client";

import { useState } from "react";

export default function DownloadPage() {
  const [selectedOS, setSelectedOS] = useState("windows");

  const downloads = {
    windows: {
      name: "Windows",
      file: "circuit-copilot-windows-x64.exe",
      size: "45.2 MB",
      command: "winget install ALT-TAB.CircuitCopilot",
    },
    macos: {
      name: "macOS",
      file: "circuit-copilot-macos-arm64.dmg",
      size: "38.7 MB",
      command: "brew install --cask circuit-copilot",
    },
    linux: {
      name: "Linux",
      file: "circuit-copilot-linux-x64.AppImage",
      size: "42.1 MB",
      command: "curl -fsSL https://install.tracer.dev/copilot.sh | sh",
    },
  };

  const currentDownload = downloads[selectedOS as keyof typeof downloads];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
            Download Circuit Copilot
          </h1>
          <p className="mx-auto mb-16 max-w-3xl text-xl leading-relaxed text-slate-600 lg:text-2xl">
            Install the AI-powered KiCad plugin and start designing smarter.
          </p>
        </div>

        {/* Download Box */}
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            {/* OS Selector */}
            <div className="flex border-b border-slate-200">
              {Object.entries(downloads).map(([key, os]) => (
                <button
                  key={key}
                  onClick={() => setSelectedOS(key)}
                  className={`flex-1 border-r border-slate-200 py-4 text-sm font-medium transition-all last:border-r-0 ${
                    selectedOS === key
                      ? "bg-slate-50 text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {os.name}
                </button>
              ))}
            </div>

            {/* Download Info */}
            <div className="p-8">
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-slate-900">
                  {currentDownload.file}
                </h3>
                <p className="text-sm text-slate-500">
                  {currentDownload.size}
                </p>
              </div>

              <button className="mb-6 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:bg-blue-700">
                Download for {currentDownload.name}
              </button>

              {/* CLI Command */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Or install via command line:
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(currentDownload.command)
                    }
                    className="text-xs text-slate-500 hover:text-slate-900"
                  >
                    Copy
                  </button>
                </div>
                <code className="block font-mono text-sm text-slate-900">
                  {currentDownload.command}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            System Requirements
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Windows</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Windows 10 or later</li>
                <li>• KiCad 7.0 or later</li>
                <li>• 4GB RAM minimum</li>
                <li>• 100MB disk space</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">macOS</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• macOS 12 Monterey or later</li>
                <li>• KiCad 7.0 or later</li>
                <li>• 4GB RAM minimum</li>
                <li>• 100MB disk space</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Linux</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Ubuntu 20.04 or equivalent</li>
                <li>• KiCad 7.0 or later</li>
                <li>• 4GB RAM minimum</li>
                <li>• 100MB disk space</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
