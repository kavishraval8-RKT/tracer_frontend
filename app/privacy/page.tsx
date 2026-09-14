import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Tracer collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      summary="How Tracer collects, uses, and protects your data."
      updated="September 14, 2026"
      sections={[
        {
          id: "information-we-collect",
          title: "Information We Collect",
          body: (
            <p>
              We collect information you provide when creating an account, including email address and payment
              information. We also collect usage data to improve our AI models and service quality.
            </p>
          ),
        },
        {
          id: "how-we-use-information",
          title: "How We Use Your Information",
          body: (
            <p>
              Your data is used to provide and improve Tracer services, process payments, send important updates,
              and train our AI models (with proper anonymization).
            </p>
          ),
        },
        {
          id: "design-data",
          title: "Design Data Privacy",
          body: (
            <p>
              Circuit designs you create remain private and are never shared with third parties. Anonymized design
              patterns may be used to improve AI model performance.
            </p>
          ),
        },
        {
          id: "data-security",
          title: "Data Security",
          body: (
            <p>
              We implement industry-standard security measures to protect your data, including encryption in transit
              and at rest.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your Rights",
          body: (
            <p>
              You have the right to access, correct, or delete your personal data. Contact us at{" "}
              <a href="mailto:hello@tracer.dev" className="font-medium text-blue-600 hover:text-blue-700">
                hello@tracer.dev
              </a>{" "}
              to exercise these rights.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to This Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. Continued use of Tracer after changes constitutes
              acceptance of the updated policy.
            </p>
          ),
        },
      ]}
    />
  );
}
