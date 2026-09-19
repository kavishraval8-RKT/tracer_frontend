import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { supabaseConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { ActivateForm } from "./ActivateForm";

export const metadata: Metadata = {
  title: "Link your KiCad plugin — Tracer",
  description: "Paste the code from your Tracer plugin to connect it to your web account.",
};

type SearchParams = Promise<{ code?: string }>;

export default async function ActivatePage({ searchParams }: { searchParams: SearchParams }) {
  if (!supabaseConfigured) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-slate-800">
        <h1 className="text-2xl font-semibold">Activation isn't available yet.</h1>
        <p className="mt-3 text-slate-600">Please try again shortly.</p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Preserve ?code=... through the login redirect so the returning user
  // sees their code prefilled.
  const params = await searchParams;
  const suffix = params.code ? `?next=${encodeURIComponent(`/activate?code=${params.code}`)}` : "?next=%2Factivate";
  if (!user) redirect(`/login${suffix}`);

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-slate-800">
      <h1 className="text-2xl font-semibold">Link your KiCad plugin</h1>
      <p className="mt-2 text-sm text-slate-600">
        Paste the 8-character code shown in the Tracer plugin (looks like <code className="rounded bg-slate-100 px-1 py-0.5">ABCD-1234</code>).
        Signed in as <span className="font-medium">{user.email}</span>.
      </p>
      <Suspense>
        <ActivateForm initialCode={params.code ?? ""} />
      </Suspense>
    </main>
  );
}
