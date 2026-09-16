import type { Metadata, Viewport } from "next";
import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const description =
  "An AI KiCad plugin for schematics, PCB routing, and DRC. Describe your board in plain language, right inside the editor.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the production domain so share images resolve to absolute URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Tracer | AI Copilot for KiCad",
    template: "%s · Tracer",
  },
  description,
  openGraph: {
    siteName: "Tracer",
    title: "Tracer | AI Copilot for KiCad",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracer | AI Copilot for KiCad",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F9FA",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F8F9FA] text-slate-600 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
