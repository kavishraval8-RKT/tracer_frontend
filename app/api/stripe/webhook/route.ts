import { planForPrice } from "@/lib/stripe";
import { verifyStripeSignature } from "@/lib/stripe-signature";
import { createAdminClient } from "@/lib/supabase/admin";

type Subscription = {
  id: string;
  customer: string;
  status: string;
  current_period_end?: number;
  items: { data: { price: { id: string }; current_period_end?: number }[] };
};

// Statuses that keep paid features while Stripe retries or the trial runs.
const KEEPS_PLAN = new Set(["active", "trialing", "past_due"]);

/** Stripe webhook: the only place a plan is granted or removed. Signature-verified before anything is trusted. */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createAdminClient();
  if (!secret || !admin) return new Response("Not configured", { status: 503 });

  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get("stripe-signature"), secret)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: unknown } };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { customer: string | null; client_reference_id: string | null };
    if (session.customer && session.client_reference_id) {
      await admin.from("profiles").update({ stripe_customer_id: session.customer }).eq("id", session.client_reference_id);
    }
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const sub = event.data.object as Subscription;
    const item = sub.items.data[0];
    const mapped = item ? planForPrice(item.price.id) : null;
    const paid = event.type !== "customer.subscription.deleted" && KEEPS_PLAN.has(sub.status) && mapped;
    const periodEnd = item?.current_period_end ?? sub.current_period_end;

    const { error } = await admin
      .from("profiles")
      .update({
        plan: paid ? mapped.plan : "hobby",
        billing: paid ? mapped.billing : null,
        subscription_status: sub.status,
        stripe_subscription_id: sub.id,
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", sub.customer);
    // A 500 makes Stripe retry, so a transient database error doesn't lose the event.
    if (error) return new Response("Update failed", { status: 500 });
  }

  return Response.json({ received: true });
}
