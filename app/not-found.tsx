import type { Metadata } from "next";
import Link from "next/link";
import { primaryCtaClass } from "@/components/ui/PrimaryCta";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-8xl font-light tracking-tighter text-slate-300 sm:text-9xl">404</p>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-600">
          The link may be broken, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link href="/" className={`${primaryCtaClass} px-5 py-2.5 text-sm`}>
            Back to home
          </Link>
          <Link href="/instructions" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Read the docs <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
