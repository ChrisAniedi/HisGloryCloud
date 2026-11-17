import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Shirt, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCountdown } from "@/components/site/service-countdown";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { church, gatherings, mapsEmbedUrl, mapsUrl, visitFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your visit",
  description: "Join us at the Glory Tent, 8 Adenle Road, Gowon Estate, Egbeda, Lagos. Sundays 9AM–12PM, Wednesdays 6PM–7PM.",
};

const expect = [
  { Icon: Users, title: "A warm welcome", body: "Our Greeters and Ushering units will meet you at the door and help you find a seat." },
  { Icon: Clock, title: "About three hours", body: "Sunday Service runs 9AM–12PM: powerful worship, the Word, and prayer." },
  { Icon: Shirt, title: "Come as you are", body: "There’s no dress code. What matters most to us is that you’re here." },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan your visit"
        lines={[{ text: "We saved" }, { text: "you a seat.", em: true, className: "text-glory" }]}
        body="Whether it’s your first time in church or you’re looking for a spiritual home, here’s everything you need for your first visit to the Glory Tent."
      >
        <div className="max-w-md">
          <ServiceCountdown />
        </div>
      </PageHero>

      <section className="theme-light section-y rounded-[2.5rem] md:rounded-[3.5rem]">
        <div className="container-x">
          <SectionHeading eyebrow="Service times" title={<>Two ways to <em className="text-glory-600">gather</em> each week.</>} />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2" gap={0.1}>
            {gatherings.map((g) => (
              <StaggerItem key={g.id}>
                <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-8 md:p-10">
                  <p className="eyebrow text-glory-600">{g.dayLabel}</p>
                  <h3 className="mt-6 font-serif text-5xl">{g.name}</h3>
                  <p className="mt-2 text-2xl text-muted-foreground">{g.timeLabel}</p>
                  <p className="mt-6 leading-relaxed text-muted-foreground">{g.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-24">
            <SectionHeading eyebrow="What to expect" title={<>Your first Sunday, <em className="text-glory-600">simplified.</em></>} />
            <Stagger className="mt-14 grid gap-4 md:grid-cols-3" gap={0.1}>
              {expect.map(({ Icon, ...e }) => (
                <StaggerItem key={e.title}>
                  <div className="h-full rounded-[1.75rem] border border-border p-8">
                    <span className="grid size-12 place-items-center rounded-2xl bg-ink-900 text-glory-300">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-10 font-serif text-3xl">{e.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{e.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section-y bg-ink-900 text-bone-100">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Getting here" title={<>Find the <em className="text-glory">Glory Tent.</em></>} />
            <Reveal delay={0.1}>
              <address className="mt-10 flex gap-4 not-italic">
                <MapPin className="mt-1 size-5 shrink-0 text-glory-400" />
                <span className="text-xl leading-relaxed">
                  {church.address.line1}
                  <br />
                  {church.address.line2}
                  <br />
                  {church.address.city}, {church.address.country}
                </span>
              </address>
              <Button asChild variant="glory" size="lg" className="mt-10">
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation /> Open in Google Maps
                </a>
              </Button>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10">
              <iframe
                title={`Map to ${church.name}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ink-900 pt-0 text-bone-100">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" eyebrow="FAQ" title={<>Good <em className="text-glory">questions.</em></>} />
          <Reveal className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue="item-0">
              {visitFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
