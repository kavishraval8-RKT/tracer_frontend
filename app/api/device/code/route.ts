/**
 * POST /api/device/code — RFC 8628 §3.2 Device Authorization Response.
 *
 * Called by the KiCad plugin at login-click time. Mints a fresh
 * (device_code, user_code) pair, stores the row pending, and returns the
 * shape the plugin needs to display the user_code and start polling
 * /api/device/token.
 *
 * No auth required. Rate-limiting is TODO — for now, one row per call is
 * cheap and expires_at cleans itself up in a nightly job (or a WHERE
 * expires_at > now() filter on the read path).
 */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deviceCodeExpiryDate,
  deviceFlowConstants,
  newDeviceCode,
  newUserCode,
} from "@/lib/device-flow";

export const runtime = "nodejs"; // node:crypto in device-flow.ts

export async function POST() {
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // A tiny retry loop covers the astronomical case of user_code collision.
  for (let attempt = 0; attempt < 4; attempt++) {
    const device_code = newDeviceCode();
    const user_code = newUserCode();
    const expires_at = deviceCodeExpiryDate();
    const { error } = await admin.from("device_codes").insert({
      device_code,
      user_code,
      expires_at: expires_at.toISOString(),
      poll_interval_seconds: deviceFlowConstants.POLL_INTERVAL_SECONDS,
    });
    if (!error) {
      return NextResponse.json({
        device_code,
        user_code,
        verification_uri: `${siteUrl}/activate`,
        verification_uri_complete: `${siteUrl}/activate?code=${user_code}`,
        expires_in: deviceFlowConstants.DEVICE_CODE_TTL_SECONDS,
        interval: deviceFlowConstants.POLL_INTERVAL_SECONDS,
      });
    }
    // 23505 = unique_violation; retry on user_code clash only.
    if (!error.message.toLowerCase().includes("duplicate")) {
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "collision" }, { status: 500 });
}
