export default function RefundPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          Refund Policy
        </h1>
        <p className="mb-16 text-xl text-slate-600">
          Last updated: September 14, 2026
        </p>

        <div className="max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              30-Day Money-Back Guarantee
            </h2>
            <p className="leading-relaxed text-slate-600">
              We offer a 30-day money-back guarantee on all paid plans. If
              you're not satisfied with Circuit Copilot, request a full refund
              within 30 days of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              How to Request a Refund
            </h2>
            <p className="mb-4 leading-relaxed text-slate-600">
              To request a refund, contact us at{" "}
              <a
                href="mailto:hello@tracer.dev"
                className="font-mono text-slate-900 hover:text-blue-600"
              >
                hello@tracer.dev
              </a>{" "}
              with your account email and reason for the refund request.
            </p>
            <p className="leading-relaxed text-slate-600">
              Refunds are typically processed within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">Exclusions</h2>
            <p className="leading-relaxed text-slate-600">
              Refunds are not available for Enterprise custom plans after
              services have been rendered. Annual subscriptions are prorated
              based on usage.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              Subscription Cancellation
            </h2>
            <p className="leading-relaxed text-slate-600">
              You can cancel your subscription at any time from the billing
              page. Cancellations take effect at the end of the current billing
              cycle.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">Questions?</h2>
            <p className="leading-relaxed text-slate-600">
              If you have questions about our refund policy, please contact us
              at{" "}
              <a
                href="mailto:hello@tracer.dev"
                className="font-mono text-slate-900 hover:text-blue-600"
              >
                hello@tracer.dev
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
