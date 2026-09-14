import type { Metadata } from "next";

// Metadata lives here because this route's page is a Client Component.
export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans for Tracer, the AI copilot for KiCad. Start free and upgrade when you need more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
