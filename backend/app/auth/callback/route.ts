import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured } from "@/lib/config";
import { safeNextPath } from "@/lib/guard";
import { createClient } from "@/lib/supabase/server";

/** Target of the confirmation email link: exchanges the one-time code for a session, then continues. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));

  if (code && supabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }
  return NextResponse.redirect(new URL("/login?error=confirm", request.url));
}
