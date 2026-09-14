export default function PrivacyPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          Privacy Policy
        </h1>
        <p className="mb-16 text-xl text-slate-600">
          Last updated: September 14, 2026
        </p>

        <div className="max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed text-slate-600">
              We collect information you provide when creating an account,
              including email address and payment information. We also collect
              usage data to improve our AI models and service quality.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed text-slate-600">
              Your data is used to provide and improve Circuit Copilot services,
              process payments, send important updates, and train our AI models
              (with proper anonymization).
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              3. Design Data Privacy
            </h2>
            <p className="leading-relaxed text-slate-600">
              Circuit designs you create remain private and are never shared
              with third parties. Anonymized design patterns may be used to
              improve AI model performance.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">4. Data Security</h2>
            <p className="leading-relaxed text-slate-600">
              We implement industry-standard security measures to protect your
              data, including encryption in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">5. Your Rights</h2>
            <p className="leading-relaxed text-slate-600">
              You have the right to access, correct, or delete your personal
              data. Contact us at{" "}
              <a
                href="mailto:hello@tracer.dev"
                className="font-mono text-slate-900 hover:text-blue-600"
              >
                hello@tracer.dev
              </a>{" "}
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              6. Changes to This Policy
            </h2>
            <p className="leading-relaxed text-slate-600">
              We may update this Privacy Policy from time to time. Continued use
              of Circuit Copilot after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
