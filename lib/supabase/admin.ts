import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/config";

/**
 * Service-role client that bypasses row level security. Server only: used by Server Actions and the Stripe webhook.
 * Returns null when not configured.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") throw new Error("createAdminClient must never run in the browser");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
