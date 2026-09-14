import type { Billing, PaidPlanId } from "@/lib/plans";

// Server only. Stripe is called through its REST API; no SDK needed for the few calls Tracer makes.

const PRICES: Record<PaidPlanId, Record<Billing, string | undefined>> = {
  basic: { monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY, yearly: process.env.STRIPE_PRICE_BASIC_YEARLY },
  pro: { monthly: process.env.STRIPE_PRICE_PRO_MONTHLY, yearly: process.env.STRIPE_PRICE_PRO_YEARLY },
};

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function priceId(plan: PaidPlanId, billing: Billing) {
  return PRICES[plan][billing];
}

/** Maps a Stripe price back to the plan it sells, so webhooks never trust client-supplied plan names. */
export function planForPrice(price: string): { plan: PaidPlanId; billing: Billing } | null {
  for (const plan of Object.keys(PRICES) as PaidPlanId[]) {
    for (const billing of Object.keys(PRICES[plan]) as Billing[]) {
      if (PRICES[plan][billing] === price) return { plan, billing };
    }
  }
  return null;
}

/** POST to the Stripe API with form-encoded params. Throws with Stripe's message on failure. */
export async function stripePost<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
    cache: "no-store",
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(`Stripe ${path} failed: ${json.error?.message ?? res.status}`);
  return json;
}
