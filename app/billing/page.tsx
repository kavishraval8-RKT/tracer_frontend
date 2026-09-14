export default function BillingPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          Billing
        </h1>
        <p className="mb-16 max-w-3xl text-xl text-slate-600 lg:text-2xl">
          Manage your subscription and payment information.
        </p>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-black/[0.04] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
              Current Plan: Hobby (Free)
            </h2>
            <p className="mb-8 text-slate-600">
              Upgrade to unlock higher limits and priority support.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-slate-600">Monthly Usage</span>
                <span className="font-mono text-slate-900">24 / 100 requests</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-slate-600">Billing Cycle</span>
                <span className="font-mono text-slate-900">N/A (Free Plan)</span>
              </div>
              <div className="flex items-center justify-between pb-4">
                <span className="text-slate-600">Next Payment</span>
                <span className="font-mono text-slate-900">—</span>
              </div>
            </div>

            <a
              href="/pricing"
              className="mt-8 block rounded-full bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:bg-blue-700"
            >
              Upgrade Plan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
