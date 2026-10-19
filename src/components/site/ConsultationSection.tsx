import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ConsultationForm } from "@/components/site/ConsultationForm";

// Draft answers for studio approval; no fees or delivery commitments are implied.
const FAQS = [
  { question: "What can SEA help me with?", answer: "Our disciplines include architectural design, interior design, landscape design, structural design, project management and BIM services." },
  { question: "What should I share about my project?", answer: "Tell us where the project is located, what you would like to create and any site details you already have. An estimated budget can also help frame the conversation." },
  { question: "Can I enquire before my plans are final?", answer: "You can share an early idea as well as a developed brief. Include the questions you are still considering in your project details." },
  { question: "How are the scope and fees decided?", answer: "Scope and fees depend on the requirements of each project. Share your brief so these can be discussed with the studio." },
  { question: "What if I need more than one service?", answer: "Choose the service closest to your needs and mention any other disciplines in your project details." },
];

export function ConsultationSection() {
  return (
    <section id="contact" tabIndex={-1} className="panel-light bg-services-bg">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="mb-14 flex items-center gap-4 text-brand-teal" data-reveal>
          <span className="h-px w-10 bg-brand-teal" aria-hidden />
          <p className="text-sm uppercase">05 — A conversation starts here</p>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div data-reveal>
            <p className="mb-4 text-sm uppercase text-brand-teal">FAQs</p>
            <h2 className="font-display text-6xl font-light leading-[1.05] text-brand-deep sm:text-7xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem]">
              A little clarity.<br /><span className="italic text-brand-teal">Before we begin.</span>
            </h2>
            <Accordion type="single" collapsible defaultValue="faq-0" className="mt-10 border-t border-border">
              {FAQS.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="gap-5 py-6 text-lg text-brand-deep sm:text-xl lg:text-2xl xl:text-[1.7rem] hover:no-underline hover:text-brand-teal [&>svg]:text-brand-teal">
                    <span className="flex items-start gap-5">
                      <span className="pt-1 text-xs font-normal text-brand-teal" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9 pr-7 pb-6 leading-7 text-ink">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="lg:border-l lg:border-border lg:pl-12 xl:pl-16" data-reveal>
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="mb-4 text-sm uppercase text-brand-teal">Consultation</p>
                <h2 className="font-display text-6xl font-light leading-[1.05] text-brand-deep sm:text-7xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem]">Let's shape<br /><span className="italic text-brand-teal">your next space.</span></h2>
              </div>
              <ArrowUpRight className="mt-8 hidden size-10 shrink-0 text-brand-teal sm:block" strokeWidth={1} aria-hidden />
            </div>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}