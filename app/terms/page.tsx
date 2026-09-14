import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Tracer.",
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      summary="The terms that apply when you use Tracer."
      updated="September 14, 2026"
      sections={[
        {
          id: "acceptance",
          title: "Acceptance of Terms",
          body: (
            <p>
              By accessing and using Tracer, you accept and agree to be bound by these Terms of Service. If you do
              not agree to these terms, please do not use our services.
            </p>
          ),
        },
        {
          id: "license",
          title: "Use License",
          body: (
            <p>
              Permission is granted to temporarily use Tracer for personal or commercial circuit design purposes.
              This is the grant of a license, not a transfer of title.
            </p>
          ),
        },
        {
          id: "responsibilities",
          title: "User Responsibilities",
          body: (
            <p>
              You are responsible for verifying all AI-generated designs before manufacturing. Tracer is not liable
              for errors in generated schematics or PCB layouts.
            </p>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual Property",
          body: (
            <p>
              Designs created using Tracer remain your intellectual property. Tracer retains rights to the plugin
              software and AI models.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of Liability",
          body: (
            <p>
              Tracer shall not be liable for any damages arising from the use or inability to use Tracer, including
              but not limited to design errors, manufacturing issues, or financial losses.
            </p>
          ),
        },
      ]}
    />
  );
}
