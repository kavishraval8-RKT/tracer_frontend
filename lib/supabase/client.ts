import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseConfigured, supabaseUrl } from "@/lib/config";

/** Browser Supabase client (public anon key only), or null when not configured. */
export function createClient() {
  return supabaseConfigured ? createBrowserClient(supabaseUrl!, supabaseAnonKey!) : null;
}
