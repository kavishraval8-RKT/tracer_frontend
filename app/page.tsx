import Hero from "@/components/Hero";
import HowTracerHelps from "@/components/HowTracerHelps";
import InControl from "@/components/InControl";
import PromptToParts from "@/components/PromptToParts";
import AstraBridge from "@/components/AstraBridge";
import TrustMetrics from "@/components/TrustMetrics";
import WorkflowBento from "@/components/WorkflowBento";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <HowTracerHelps />
      <InControl />
      <PromptToParts />
      <AstraBridge />
      <TrustMetrics />
      <WorkflowBento />
      <FAQ />
    </>
  );
}
