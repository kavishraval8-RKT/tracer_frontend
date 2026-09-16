"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { PrimaryCta } from "@/components/ui/PrimaryCta";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/instructions", label: "Instructions" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Display hint only; access is enforced on the server. Re-checked on navigation because
  // sign-in happens in a Server Action, which doesn't fire the browser client's auth events.
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => active && setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [pathname]);

  // Transparent with white text while over the home hero's sky; solid everywhere else.
  // No border in either state: the hero is pulled up exactly h-16 underneath, so a 1px border would leave a seam.
  const clear = pathname === "/" && !scrolled && !mobileMenuOpen;
  const linkTone = clear ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-slate-900";
  // Next.js doesn't scroll when a link points at the current page, so do it here (logo or "Home" on the home page, etc.).
  const scrollTopIfCurrent = (href: string) => (e: React.MouseEvent) => {
    if (href !== pathname) return;
    e.preventDefault();
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };
  const account = signedIn ? { href: "/billing", label: "Account" } : { href: "/login", label: "Sign in" };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        clear ? "bg-transparent" : "bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            onClick={scrollTopIfCurrent("/")}
            className={`text-2xl font-semibold tracking-tight transition-colors ${clear ? "text-white" : "text-slate-900"}`}
          >
            Tracer
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={scrollTopIfCurrent(link.href)} className={`text-[15px] font-medium transition-colors ${linkTone}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href={account.href} className={`text-[15px] font-medium transition-colors ${linkTone}`}>
            {account.label}
          </Link>
          <PrimaryCta className="px-4 py-2 text-sm" />
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`h-6 w-6 ${clear ? "text-white" : "text-slate-900"}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollTopIfCurrent(link.href)(e);
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 space-y-3 border-t border-slate-100 pt-4">
              <Link
                href={account.href}
                className="block py-2 text-sm font-medium text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {account.label}
              </Link>
              <PrimaryCta className="w-full justify-center px-5 py-2.5 text-sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
