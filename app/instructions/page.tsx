"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

export default function InstructionsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sidebarSections = [
    { id: "installation", label: "Installation" },
    { id: "authentication", label: "Authentication" },
    { id: "first-command", label: "Your First Command" },
    { id: "advanced-usage", label: "Advanced Usage" },
    { id: "troubleshooting", label: "Troubleshooting" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar Navigation */}
        <aside className="sticky top-20 hidden h-screen w-64 shrink-0 overflow-y-auto py-12 lg:block">
          <nav className="space-y-1 px-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              On This Page
            </h3>
            {sidebarSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 py-12 lg:px-12">
          <article className="mx-auto max-w-3xl rounded-[2rem] border border-black/[0.04] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-16">
            <h1 className="mb-8 text-5xl font-semibold tracking-tight text-slate-900">
              Getting Started with Tracer
            </h1>
            <p className="mb-12 text-xl leading-relaxed text-slate-600">
              Transform your KiCad workflow with AI-powered circuit design in minutes.
            </p>

            {/* Installation */}
            <section id="installation" className="mb-16">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
                1. Installation
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Download the latest Tracer plugin release and install it in KiCad 8.0 or later.
              </p>
              <ol className="mb-6 space-y-3 text-slate-700">
                <li>Open <strong>KiCad 8.0+</strong></li>
                <li>Navigate to <strong>Plugin and Content Manager</strong> in the toolbar</li>
                <li>Click <strong>Install from File</strong> and select the downloaded ZIP</li>
                <li>Restart KiCad to activate the plugin</li>
              </ol>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
                2. Authentication
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                After installation, you'll need to authenticate with your Tracer API key.
              </p>
              <ol className="space-y-3 text-slate-700">
                <li>Click the <strong>Tracer icon</strong> in the PCB Editor toolbar</li>
                <li>You'll be prompted to enter your API key on first launch</li>
                <li>Generate your API key from your <Link href="/dashboard" className="font-medium text-blue-600 hover:text-blue-700">Tracer dashboard</Link></li>
                <li>Paste the key and click <strong>Activate</strong></li>
              </ol>
            </section>

            {/* First Command */}
            <section id="first-command" className="mb-16">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
                3. Your First Command
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Open a schematic or board file and start designing with natural language.
              </p>
              <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-mono text-sm text-slate-700">
                  <strong>Windows/Linux:</strong> Ctrl + Space<br />
                  <strong>macOS:</strong> Cmd + Space
                </p>
              </div>
            </section>

            {/* Advanced Usage */}
            <section id="advanced-usage" className="mb-16">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
                4. Advanced Usage
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Tracer supports multiple AI models and advanced workflows.
              </p>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900">
                5. Troubleshooting
              </h2>
              <p className="text-slate-700">
                Need help? Contact <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">hello@tracer.dev</a>
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
