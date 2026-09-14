import type { Metadata } from "next";

// Metadata lives here because this route's page is a Client Component.
export const metadata: Metadata = {
  title: "Download",
  description: "Join the Tracer waitlist for Windows, macOS, and Linux.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
