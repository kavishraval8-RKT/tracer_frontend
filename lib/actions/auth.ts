"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { siteUrl, supabaseConfigured } from "@/lib/config";
import { stringParams, type FormState } from "@/lib/forms";
import { clientIp, email as parseEmail, looksAutomated, rateLimit, text } from "@/lib/guard";
import { planQuery, readPlan } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";

const CHECK_EMAIL = "Check your email for a link to confirm your account.";
const TOO_MANY = "Too many attempts. Please wait a few minutes and try again.";

export async function signUp(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured) {
    return { ok: false, message: "Accounts aren't open yet. Join the waitlist on the download page and we'll email you." };
  }
  // Bots get the same success message so they learn nothing.
  if (looksAutomated(fd.get("company"), fd.get("startedAt"))) return { ok: true, message: CHECK_EMAIL };
  if (!rateLimit(`signup:${clientIp(await headers())}`, 5, 10 * 60_000)) return { ok: false, message: TOO_MANY };

  const name = text(fd.get("name"), 100);
  const email = parseEmail(fd.get("email"));
  const password = fd.get("password");
  const fields = { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? "") };

  if (!name || !email) return { ok: false, message: "Enter your name and a valid email.", fields };
  if (typeof password !== "string" || password.length < 8 || password.length > 128) {
    return { ok: false, message: "Use a password between 8 and 128 characters.", fields };
  }
  if (password !== fd.get("confirmPassword")) return { ok: false, message: "Passwords don't match.", fields };

  const { plan, billing } = readPlan(stringParams(fd));
  const next = `/billing${planQuery(plan, billing)}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name }, emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) {
    return { ok: false, message: error.status === 429 ? TOO_MANY : "We couldn't create your account. Please try again.", fields };
  }
  // With email confirmation turned off, Supabase signs the user in immediately.
  if (data.session) redirect(next);
  return { ok: true, message: CHECK_EMAIL, fields };
}

export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured) return { ok: false, message: "Sign-in isn't available yet." };
  if (!rateLimit(`signin:${clientIp(await headers())}`, 10, 10 * 60_000)) return { ok: false, message: TOO_MANY };

  const email = parseEmail(fd.get("email"));
  const password = fd.get("password");
  const fields = { email: String(fd.get("email") ?? "") };
  if (!email || typeof password !== "string" || !password) {
    return { ok: false, message: "Enter your email and password.", fields };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const message =
      error.code === "email_not_confirmed"
        ? "Confirm your email first. Check your inbox for the link."
        : "Incorrect email or password.";
    return { ok: false, message, fields };
  }

  const { plan, billing } = readPlan(stringParams(fd));
  redirect(`/billing${planQuery(plan, billing)}`);
}

export async function signOut() {
  if (supabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
