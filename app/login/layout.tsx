import type { Metadata } from "next";

// Metadata lives here because this route's page is a Client Component.
export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Tracer account.",
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
