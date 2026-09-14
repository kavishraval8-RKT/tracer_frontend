import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does Tracer overwrite my routing?",
    answer:
      "No. Tracer only touches the nets you ask it to. Every edit is staged in the Changes tab, and nothing is written to your board until you choose Keep.",
  },
  {
    question: "Is my IP safe?",
    answer:
      "Yes. We run strict zero-retention policies: your schematics and layouts are never used to train OpenAI, Anthropic, or Google models. Local-only processing is available on the Enterprise tier.",
  },
  {
    question: "Can it read my existing custom design rules?",
    answer:
      "Yes. Tracer reads your .kicad_pro and .kicad_dru files, so it follows your differential pair, track width, and clearance constraints.",
  },
  {
    question: "Do I need to leave KiCad?",
    answer:
      "No. Tracer runs as a plugin inside KiCad 7 and 8. There's nothing to export and no third-party web app.",
  },
  {
    question: "Is Tracer free?",
    answer:
      "The Hobby plan is free and needs no credit card. Basic and Pro add higher limits for daily professional use.",
  },
];

export default function FAQ() {
  return (
    <section className="px-6 pt-16 pb-8 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
