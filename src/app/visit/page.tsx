import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { NextService } from "@/components/site/next-service";
import { Gatherings } from "@/components/sections/gatherings";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { media, visitFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your visit",
  description: "Join us at the Glory Tent, 8 Adenle Road, Gowon Estate, Egbeda, Lagos. Sundays 9AM–12PM, Wednesdays 6PM–7PM.",
};

const expect = [
  { title: "A warm welcome", body: "Our Greeters and Ushering units will meet you at the door and help you find a seat." },
  { title: "About three hours", body: "Sunday Service runs from 9am to 12pm: worship, the Word and prayer." },
  { title: "Come as you are", body: "There’s no dress code. What matters most to us is that you’re here." },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        kicker="Plan your visit"
        title="We’ve saved you a seat"
        intro="Whether it’s your first time in church or you’re looking for a spiritual home, here’s what you need to know before you come to the Glory Tent."
        image={media.prayer ? { src: media.prayer, alt: "Members of the congregation in prayer", caption: "Prayer during Sunday service." } : null}
      >
        <NextService className="text-lg [&_strong]:text-ink" />
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading kicker="Your first Sunday" title="What to expect" />
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {expect.map((e) => (
              <div key={e.title} className="border-t-2 border-ink pt-5">
                <h3 className="heading-3">{e.title}</h3>
                <p className="mt-2 text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
