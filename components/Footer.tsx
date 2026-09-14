import Link from "next/link";

// Only routes that exist under app/; add a link here when its page ships.
const columns = [
  {
    title: "Product",
    links: [
      { href: "/kicad-ai", label: "KiCad AI" },
      { href: "/download", label: "Download" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/instructions", label: "Documentation" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:gap-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-slate-500">© 2024 - 2026 Tracer. All rights reserved.</p>
          <a
            href="mailto:hello@tracer.dev"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            hello@tracer.dev
          </a>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-center text-xs leading-relaxed text-slate-400">
            KiCad® is a registered trademark of its respective owners. Tracer is
            independent software for use with KiCad and is not affiliated with,
            endorsed by, or sponsored by the KiCad project or the Linux
            Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}
