"use server";

import { headers } from "next/headers";
import { PLATFORMS, ROLES, TOPICS, type FormState } from "@/lib/forms";
import { clientIp, email as parseEmail, looksAutomated, oneOf, rateLimit, text } from "@/lib/guard";
import { createAdminClient } from "@/lib/supabase/admin";

const TOO_MANY = "Too many submissions. Please wait a few minutes and try again.";
const FAILED = "Something went wrong. Please try again, or email hello@tracer.dev.";

export async function joinWaitlist(_prev: FormState, fd: FormData): Promise<FormState> {
  const done = { ok: true, message: "You are on the waitlist! We will notify you as soon as your access is ready." };
  if (looksAutomated(fd.get("company"), fd.get("startedAt"))) return done;
  if (!rateLimit(`waitlist:${clientIp(await headers())}`, 5, 10 * 60_000)) return { ok: false, message: TOO_MANY };

  const row = {
    name: text(fd.get("name"), 100),
    email: parseEmail(fd.get("email")),
    role: oneOf(fd.get("role"), ROLES),
    platform: oneOf(fd.get("platform"), PLATFORMS),
  };
  const fields = { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? "") };
  if (!row.name || !row.email || !row.role || !row.platform) {
    return { ok: false, message: "Enter your name, a valid email, and your role.", fields };
  }

  const admin = createAdminClient();
  if (!admin) return { ok: false, message: "The waitlist isn't open yet. Email hello@tracer.dev and we'll add you.", fields };

  const { error } = await admin.from("waitlist").insert(row);
  // 23505 = unique violation: already on the list, which is a success from the visitor's point of view.
  if (error && error.code !== "23505") {
    console.error("waitlist insert failed", error.code);
    return { ok: false, message: FAILED, fields };
  }
  return done;
}

export async function sendContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const sent = { ok: true, message: "Message sent. We'll reply by email soon." };
  if (looksAutomated(fd.get("company"), fd.get("startedAt"))) return sent;
  if (!rateLimit(`contact:${clientIp(await headers())}`, 3, 10 * 60_000)) return { ok: false, message: TOO_MANY };

  const row = {
    name: text(fd.get("name"), 100),
    email: parseEmail(fd.get("email")),
    topic: oneOf(fd.get("topic"), TOPICS),
    message: text(fd.get("message"), 5000),
  };
  const fields = {
    name: String(fd.get("name") ?? ""),
    email: String(fd.get("email") ?? ""),
    message: String(fd.get("message") ?? ""),
  };
  if (!row.name || !row.email || !row.topic || !row.message) {
    return { ok: false, message: "Fill in every field with a valid email. Messages can be up to 5,000 characters.", fields };
  }

  const admin = createAdminClient();
  if (!admin) return { ok: false, message: "The contact form isn't connected yet. Please email hello@tracer.dev directly.", fields };

  const { error } = await admin.from("contact_messages").insert(row);
  if (error) {
    console.error("contact insert failed", error.code);
    return { ok: false, message: FAILED, fields };
  }
  return sent;
}
