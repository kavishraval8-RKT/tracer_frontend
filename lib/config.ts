// Public configuration. Safe to import anywhere, including Client Components.
// NEXT_PUBLIC_* values are inlined at build time, so they must be referenced literally.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** False until Supabase env vars are set; forms and account pages show a "not open yet" state instead of failing. */
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
