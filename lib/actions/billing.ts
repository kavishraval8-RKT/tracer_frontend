"use server";

import { redirect } from "next/navigation";
import { siteUrl, supabaseConfigured } from "@/lib/config";
import { stringParams } from "@/lib/forms";
import { readPlan } from "@/lib/plans";
import { priceId, stripeConfigured, stripePost } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const UNAVAILABLE = "/billing?checkout=unavailable";

/** Requires a signed-in user. Auth is checked here, not only in proxy.ts, because actions can be called directly. */
async function requireUser() {
  if (!supabaseConfigured) redirect(UNAVAILABLE);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function startCheckout(fd: FormData) {
  const user = await requireUser();
  const { plan, billing } = readPlan(stringParams(fd));
  const price = plan ? priceId(plan, billing) : undefined;
  const admin = createAdminClient();
  if (!plan || !price || !admin || !stripeConfigured()) redirect(UNAVAILABLE);

  let url: string | null = null;
  try {
    const { data: profile } = await admin.from("profiles").select("stripe_customer_id").eq("id", user.id).maybeSingle();
    let customer = profile?.stripe_customer_id as string | undefined;
    if (!customer) {
      const created = await stripePost<{ id: string }>("customers", {
        email: user.email ?? "",
        "metadata[user_id]": user.id,
      });
      customer = created.id;
      await admin.from("profiles").update({ stripe_customer_id: customer }).eq("id", user.id);
    }
    const session = await stripePost<{ url: string }>("checkout/sessions", {
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      "subscription_data[metadata][user_id]": user.id,
      allow_promotion_codes: "true",
      success_url: `${siteUrl}/billing?checkout=success`,
      cancel_url: `${siteUrl}/billing?checkout=cancelled`,
    });
    url = session.url;
  } catch (err) {
    console.error("checkout failed", err instanceof Error ? err.message : err);
  }
  redirect(url ?? "/billing?checkout=error");
}

export async function openPortal() {
  const user = await requireUser();
  const admin = createAdminClient();
  if (!admin || !stripeConfigured()) redirect(UNAVAILABLE);

  let url: string | null = null;
  try {
    const { data: profile } = await admin.from("profiles").select("stripe_customer_id").eq("id", user.id).maybeSingle();
    if (profile?.stripe_customer_id) {
      const session = await stripePost<{ url: string }>("billing_portal/sessions", {
        customer: profile.stripe_customer_id,
        return_url: `${siteUrl}/billing`,
      });
      url = session.url;
    }
  } catch (err) {
    console.error("portal failed", err instanceof Error ? err.message : err);
  }
  redirect(url ?? "/billing?checkout=error");
}
