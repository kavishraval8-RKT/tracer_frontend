export type Billing = "monthly" | "yearly";

/** Paid self-serve plans. Single source for pricing and account pages. */
export const PAID_PLANS = {
  basic: { name: "Basic", price: { monthly: "$10", yearly: "$100" } },
  pro: { name: "Pro", price: { monthly: "$20", yearly: "$200" } },
} as const;

export type PaidPlanId = keyof typeof PAID_PLANS;

/** Reads ?plan= and ?billing= from the URL. Unknown values are ignored rather than trusted. */
export function readPlan(params: { get(name: string): string | null }) {
  const id = params.get("plan");
  const plan = id && Object.hasOwn(PAID_PLANS, id) ? (id as PaidPlanId) : null;
  const billing: Billing = params.get("billing") === "yearly" ? "yearly" : "monthly";
  return { plan, billing };
}

/** Query string that carries the chosen plan between pricing, register, and login. */
export function planQuery(plan: PaidPlanId | null, billing: Billing) {
  return plan ? `?plan=${plan}&billing=${billing}` : "";
}
