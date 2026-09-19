/**
 * POST /api/device/token — RFC 8628 §3.4 Device Access Token Request.
 *
 * The plugin polls this endpoint every `interval` seconds. Responses per
 * spec:
 *   - authorization_pending  — user hasn't approved yet
 *   - slow_down              — poll too fast (we skip this for now; interval is fixed)
 *   - expired_token          — device_code past its TTL
 *   - access_denied          — user actively refused (future; there's no reject UI yet)
 *   - 200 { access_token, token_type: "Bearer", expires_in }
 *
 * The access_token is a compact HS256 device JWT the Python backend
 * validates. Contents: sub (auth.users.id), tier (from profiles).
 */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { deviceFlowConstants, mintDeviceJwt, newJti } from "@/lib/device-flow";

export const runtime = "nodejs";

function tokenError(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: { device_code?: string; grant_type?: string };
  try {
    body = await request.json();
  } catch {
    return tokenError("invalid_request");
  }

  if (body.grant_type !== "urn:ietf:params:oauth:grant-type:device_code") {
    return tokenError("unsupported_grant_type");
  }
  const device_code = typeof body.device_code === "string" ? body.device_code : "";
  if (!device_code) return tokenError("invalid_request");

  const admin = createAdminClient();
  if (!admin) return tokenError("server_error", 503);

  const { data: row, error } = await admin
    .from("device_codes")
    .select("device_code, approved_user_id, expires_at")
    .eq("device_code", device_code)
    .maybeSingle();

  if (error) return tokenError("server_error", 500);
  if (!row) return tokenError("invalid_grant"); // unknown device_code

  if (new Date(row.expires_at).getTime() < Date.now()) {
    // Best-effort GC; ignore delete error.
    await admin.from("device_codes").delete().eq("device_code", device_code);
    return tokenError("expired_token");
  }

  if (!row.approved_user_id) return tokenError("authorization_pending");

  // Look up the user's tier so it's baked into the JWT — the Python
  // backend can enforce quota without re-hitting Supabase every request.
  const { data: profile } = await admin
    .from("profiles")
    .select("plan")
    .eq("id", row.approved_user_id)
    .maybeSingle();
  const tier = profile?.plan ?? "hobby";

  // Rotate the user's active_device_jti. This is the "one plugin per user"
  // enforcement: any older JWT still carrying a stale jti gets rejected by
  // the Python backend, and its plugin re-prompts login.
  const jti = newJti();
  const { error: rotateError } = await admin
    .from("profiles")
    .update({
      active_device_jti: jti,
      active_device_linked_at: new Date().toISOString(),
    })
    .eq("id", row.approved_user_id);
  if (rotateError) return tokenError("server_error", 500);

  const access_token = mintDeviceJwt({
    sub: row.approved_user_id,
    tier,
    jti,
  });

  // Token issued — the device_code is single-use; clear the row.
  await admin.from("device_codes").delete().eq("device_code", device_code);

  return NextResponse.json({
    access_token,
    token_type: "Bearer",
    expires_in: deviceFlowConstants.DEVICE_JWT_TTL_SECONDS,
  });
}
