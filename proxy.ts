import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { planQuery, readPlan } from "@/lib/plans";

const AUTH_PAGES = new Set(["/login", "/register"]);

/**
 * Refreshes the Supabase session, then routes by auth state (keeping ?plan=&billing= throughout):
 * - signed out on /billing  -> /login
 * - signed in on /login or /register -> /billing, where the chosen plan's checkout button is shown
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next(); // Pages show a "not open yet" state.

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirects must carry any refreshed session cookies, or the browser keeps the stale ones.
  const redirectTo = (pathname: string) => {
    const target = new URL(pathname, request.url);
    const { plan, billing } = readPlan(request.nextUrl.searchParams);
    target.search = planQuery(plan, billing);
    const redirect = NextResponse.redirect(target);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  };

  const onAuthPage = AUTH_PAGES.has(request.nextUrl.pathname);
  if (onAuthPage && user) return redirectTo("/billing");
  if (!onAuthPage && !user) return redirectTo("/login");
  return response;
}

export const config = {
  matcher: ["/billing/:path*", "/login", "/register"],
};
