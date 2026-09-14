import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refunds, exclusions, and cancelling your Tracer subscription.",
};

export default function RefundPage() {
  return (
    <LegalDoc
      title="Refund Policy"
      summary="Our money-back guarantee, how to request a refund, and cancelling your subscription."
      updated="September 14, 2026"
      sections={[
        {
          id: "guarantee",
          title: "30-Day Money-Back Guarantee",
          body: (
            <p>
              We offer a 30-day money-back guarantee on all paid plans. If you&apos;re not satisfied with Tracer,
              request a full refund within 30 days of your initial purchase.
            </p>
          ),
        },
        {
          id: "request",
          title: "How to Request a Refund",
          body: (
            <>
              <p>
                To request a refund, contact us at{" "}
                <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
                  hello@tracer.dev
                </a>{" "}
                with your account email and reason for the refund request.
              </p>
              <p>Refunds are typically processed within 5-7 business days.</p>
            </>
          ),
        },
        {
          id: "exclusions",
          title: "Exclusions",
          body: (
            <p>
              Refunds are not available for Enterprise custom plans after services have been rendered. Annual
              subscriptions are prorated based on usage.
            </p>
          ),
        },
        {
          id: "cancellation",
          title: "Subscription Cancellation",
          body: (
            <p>
              You can cancel your subscription at any time from the billing page. Cancellations take effect at the end
              of the current billing cycle.
            </p>
          ),
        },
      ]}
    />
  );
}
