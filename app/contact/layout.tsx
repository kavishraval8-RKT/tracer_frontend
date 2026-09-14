import type { Metadata } from "next";

// Metadata lives here because this route's page is a Client Component.
export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, support, or enterprise plans. Get in touch with Tracer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
