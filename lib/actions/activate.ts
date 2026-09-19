"use server";

import { headers } from "next/headers";
import type { FormState } from "@/lib/forms";
import { clientIp, rateLimit, text } from "@/lib/guard";
import { supabaseConfigured } from "@/lib/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { safeEqual } from "@/lib/device-flow";

const TOO_MANY = "Too many attempts. Wait a few minutes and try again.";
const NOT_SIGNED_IN = "Please sign in first, then paste the code from your KiCad plugin.";
const BAD_CODE = "That code isn't recognized or has expired. Ask the plugin for a fresh one.";

/**
 * Server action that stamps `approved_user_id` on the device_codes row
 * whose user_code matches the pasted string. The plugin's next
 * /api/device/token poll then returns a device JWT.
 */
export async function approveDeviceCode(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!supabaseConfigured) return { ok: false, message: "Sign-in isn't available yet." };
  if (!rateLimit(`activate:${clientIp(await headers())}`, 10, 10 * 60_000)) {
    return { ok: false, message: TOO_MANY };
  }

  const rawInput = text(fd.get("user_code"), 16);
  if (!rawInput) return { ok: false, message: "Paste the 8-character code from the plugin." };
  const raw = rawInput.toUpperCase().replace(/\s+/g, "");
  // The plugin renders codes as ABCD-1234; accept with or without the dash.
  const user_code = raw.includes("-") ? raw : raw.length === 8 ? `${raw.slice(0, 4)}-${raw.slice(4)}` : raw;

  const user_supabase = await createClient();
  const {
    data: { user },
  } = await user_supabase.auth.getUser();
  if (!user) return { ok: false, message: NOT_SIGNED_IN };

  const admin = createAdminClient();
  if (!admin) return { ok: false, message: "Server misconfigured." };

  // Only match rows that are still pending AND unexpired. Constant-time
  // compare of user_code prevents timing-oracle attacks against valid codes.
  const nowIso = new Date().toISOString();
  const { data: rows, error } = await admin
    .from("device_codes")
    .select("device_code, user_code, approved_user_id, expires_at")
    .gt("expires_at", nowIso)
    .is("approved_user_id", null);

  if (error) return { ok: false, message: "Something went wrong." };

  const row = rows?.find((r) => safeEqual(r.user_code, user_code));
  if (!row) return { ok: false, message: BAD_CODE };

  const { error: updateError } = await admin
    .from("device_codes")
    .update({ approved_user_id: user.id, approved_at: nowIso })
    .eq("device_code", row.device_code);
  if (updateError) return { ok: false, message: "Couldn't link the plugin. Try again." };

  return { ok: true, message: "Linked. You can return to KiCad — the plugin will connect in a few seconds." };
}
