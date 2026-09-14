import type { Metadata } from "next";

// Metadata lives here because this route's page is a Client Component.
export const metadata: Metadata = {
  title: "About",
  description: "Why Tracer exists, what it does today, and the road to an AI-native EDA platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
