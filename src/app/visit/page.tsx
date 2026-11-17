import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { NextService } from "@/components/site/next-service";
import { Gatherings } from "@/components/sections/gatherings";
import { FirstSunday } from "@/components/sections/first-sunday";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { visitFaqs, stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your visit",
  description: "Join us at the Glory Tent, 8 Adenle Road, Gowon Estate, Egbeda, Lagos. Sundays 9AM–12PM, Wednesdays 6PM–7PM.",
};


export default function VisitPage() {
  return (
    <>
      <PageHero
        kicker="Plan your visit"
        image={stock.worshipService}
        title="We’ve saved you a seat"
        intro="Whether it’s your first time in church or you’re looking for a spiritual home, here’s what you need to know before you come to the Glory Tent."
      >
        <NextService className="text-lg [&_strong]:text-ink" />
      </PageHero>

      <FirstSunday cta={false} />

      <Gatherings />

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" kicker="Questions" title="Before you come" />
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line">
              {visitFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
