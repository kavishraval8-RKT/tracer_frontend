import Link from "next/link";

export function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

/** Modern blue primary button look: near-flat fill, hairline light border, soft diffuse glow. Add size classes. */
export const primaryCtaClass =
  "inline-flex items-center gap-2 rounded-[10px] border border-white/25 bg-[linear-gradient(180deg,#4A86FA_0%,#2F66EE_100%)] font-semibold tracking-[-0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(16,40,120,0.25),0_10px_30px_-8px_rgba(47,102,238,0.7)] transition-[translate,box-shadow] duration-200 hover:-translate-y-px hover:bg-[linear-gradient(180deg,#5590FB_0%,#3A6FF0_100%)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_1px_2px_rgba(16,40,120,0.25),0_14px_36px_-8px_rgba(47,102,238,0.8)] active:translate-y-0";

/** "Get for Windows" link to the download page. Size via className. */
export function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <Link href="/download" className={`${primaryCtaClass} ${className}`}>
      <WindowsIcon className="h-4 w-4" />
      Get for Windows
    </Link>
  );
}
