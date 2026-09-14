import Link from "next/link";

export default function Footer() {
  const productLinks = [
    { href: "/kicad-ai", label: "KiCad AI" },
    { href: "/download", label: "Download" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security & IP" },
  ];

  const compareLinks = [
    { href: "/compare/manual", label: "Tracer vs Manual Routing" },
    { href: "/compare/deeppcb", label: "Tracer vs DeepPCB" },
  ];

  const resourceLinks = [
    { href: "/instructions", label: "Documentation" },
    { href: "/changelog", label: "Changelog" },
    { href: "/blog", label: "Blog" },
    { href: "/bounty", label: "Bug Bounty" },
  ];

  const companyLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { href: "https://github.com", label: "GitHub" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Grid - 4 Columns */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Compare</h3>
            <ul className="space-y-3">
              {compareLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
          {/* Left: Copyright & Email */}
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <p className="text-sm text-slate-500">
              © 2024 - 2026 Tracer. All rights reserved.
            </p>
            <a
              href="mailto:hello@tracer.dev"
              className="text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              hello@tracer.dev
            </a>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-center text-xs leading-relaxed text-slate-400">
            KiCad® is a registered trademark of its respective owners. Tracer
            Circuit Copilot is independent software for use with KiCad and is
            not affiliated with, endorsed by, or sponsored by the KiCad project
            or the Linux Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}
