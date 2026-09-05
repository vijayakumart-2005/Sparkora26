import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/event";
import { Reveal, SlideSection, SectionHeading } from "./primitives";

export function FAQ() {
  return (
    <SlideSection id="faq" slideIndex="07 // FAQ" slideTag="QUESTIONS">
      <SectionHeading eyebrow="Questions" title="FAQ" subtitle="Everything you need to know about Sparkora'26." />
      <Reveal>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="glass-card rounded-2xl border border-white/10 px-6 transition-all duration-300 hover:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base tracking-[0.06em] uppercase hover:no-underline sm:text-lg text-foreground hover:text-primary transition-colors">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </SlideSection>
  );
}
