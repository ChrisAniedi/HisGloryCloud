import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HandHeart, HeartHandshake, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Faq } from "@/components/blocks/faq";
import { SocialLinks, WhatsAppIcon } from "@/components/site/social-icons";
import { church, gatherings, generalFaqs, mapsUrl, pastoralOccasions, stock, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & support",
  description: "Prayer, counselling and pastoral care at His Glory Cloud Church. Find out how to reach us and get the help you need.",
};

export default function HelpPage() {
  const wa = waLink("Hello HGC, I would like some help.");
  const ways = [
    { Icon: HandHeart, title: "Ask for prayer", body: "Whatever you’re carrying, send it in. Our prayer squad will stand in agreement with you, and it can stay confidential.", href: "/prayer", cta: "Send a prayer request", tone: "bg-night text-white" },
    { Icon: HeartHandshake, title: "Counselling & pastoral care", body: "Talk to a pastor about life, family, faith or a hard season, or book a dedication, thanksgiving or house warming.", href: "/pastoral-care", cta: "Book a pastoral service", tone: "bg-red text-white" },
    wa
      ? { Icon: WhatsAppIcon, title: "Message us on WhatsApp", body: "For quick questions and support. Someone from the team will reply.", href: wa, cta: "Open WhatsApp", tone: "bg-cream text-night", external: true }
      : { Icon: MessageCircle, title: "Message us", body: "Send us a message on Instagram or Facebook and someone from the team will reply.", href: "#reach-us", cta: "Ways to reach us", tone: "bg-cream text-night" },
  ];

  return (
    <>
      <PageHero
        kicker="Help & support"
        image={stock.babyDedication}
        title={<>We’re here <span className="text-red">for you.</span></>}
        intro="Prayer, counselling and pastoral care for every season of life. You don’t have to carry it alone."
      />

      <section className="section-y">
        <div className="container-x">
          <SectionIntro chip="How we can help" title="Reach out in the way that suits you" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {ways.map(({ Icon, ...w }, i) => (
              <Reveal key={w.title} delay={i * 0.08} y={30}>
                <Tilt className="h-full rounded-[26px]"><Link href={w.href} {...("external" in w && w.external ? { target: "_blank", rel: "noreferrer" } : {})} className={`group flex h-full min-h-[19rem] flex-col justify-between rounded-[26px] p-7 transition-transform duration-500 hover:-translate-y-1 ${w.tone}`}>
                  <Icon className="size-8" />
                  <div>
                    <h2 className="text-[1.7rem] leading-tight font-medium tracking-[-0.03em]">{w.title}</h2>
                    <p className="mt-2 opacity-80">{w.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
                      {w.cta} <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link></Tilt>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-4">
            <div className="rounded-[26px] bg-white p-7 ring-1 ring-line md:p-8">
              <p className="font-medium">Pastoral services include</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pastoralOccasions.map((o) => (
                  <li key={o} className="rounded-full bg-paper px-4 py-2 text-sm ring-1 ring-line">{o}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="reach-us" className="pb-[var(--section-gap)]">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-10 rounded-[28px] bg-night p-8 text-white md:p-12 lg:grid-cols-3">
              <div>
                <p className="text-sm text-white/55">Visit us</p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-2 flex gap-2 text-lg hover:underline">
                  <MapPin className="mt-1 size-5 shrink-0 text-cream" /> {church.address.full}
                </a>
              </div>
              <div>
                <p className="text-sm text-white/55">Service times</p>
                <ul className="mt-2 space-y-1 text-lg">
                  {gatherings.map((g) => (
                    <li key={g.id}>{g.name}: <span className="text-white/70">{g.dayLabel}, {g.timeLabel}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-white/55">Message us</p>
                <SocialLinks className="mt-3" itemClassName="rounded-full border-white/15 text-white/80 hover:border-white/50 hover:text-white" />
                <p className="mt-3 text-white/60">Instagram, Facebook and YouTube.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={generalFaqs} className="pt-0" />
    </>
  );
}
