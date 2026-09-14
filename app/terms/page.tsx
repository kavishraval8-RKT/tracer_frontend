export default function TermsPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
          Terms of Service
        </h1>
        <p className="mb-16 text-xl text-slate-600">
          Last updated: September 14, 2026
        </p>

        <div className="max-w-none space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed text-slate-600">
              By accessing and using Tracer, you accept and
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">2. Use License</h2>
            <p className="leading-relaxed text-slate-600">
              Permission is granted to temporarily use Circuit Copilot for
              personal or commercial circuit design purposes. This is the grant
              of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              3. User Responsibilities
            </h2>
            <p className="leading-relaxed text-slate-600">
              You are responsible for verifying all AI-generated designs before
              manufacturing. Tracer is not liable for errors in generated
              schematics or PCB layouts.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              4. Intellectual Property
            </h2>
            <p className="leading-relaxed text-slate-600">
              Designs created using Circuit Copilot remain your intellectual
              property. Tracer retains rights to the plugin software and AI
              models.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-slate-600">
              Tracer shall not be liable for any damages arising from the use
              or inability to use Circuit Copilot, including but not limited to
              design errors, manufacturing issues, or financial losses.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">6. Contact</h2>
            <p className="leading-relaxed text-slate-600">
              Questions about these Terms? Contact us at{" "}
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
