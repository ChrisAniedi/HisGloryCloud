import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Flame, MonitorPlay, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionIntro } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { NextStepsList } from "@/components/sections/next-steps-list";
import { VerseBlock } from "@/components/blocks/verse-block";
import { stock } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grow",
  description: "Grow in faith at His Glory Cloud Church: midweek service, ministry training, the workforce and messages to carry into your week.",
};

const paths = [
  { Icon: Sparkles, title: "New in faith", body: "Just given your life to Jesus? Start here, and someone will walk with you from day one.", href: "/salvation", cta: "Start here", tone: "bg-red text-white", span: "lg:col-span-5" },
  { Icon: Flame, title: "Midweek service", body: "One hour on Wednesday evenings, 6 to 7pm: prayer, teaching and a refreshing of the Spirit.", href: "/visit", cta: "Plan to come", tone: "bg-night text-white", span: "lg:col-span-7" },
  { Icon: BookOpen, title: "Ministry training", body: "Six to twelve weeks of Spiritual Growth, Biblical Leadership, Evangelism and Discipleship, with a certificate at the end.", href: "/training", cta: "About the programme", tone: "bg-cream text-night", span: "lg:col-span-7" },
  { Icon: Users, title: "Join the workforce", body: "Choir, media, ushering, protocol, the prayer squad and more. Grow by serving.", href: "/serve", cta: "Find your unit", tone: "bg-white text-night ring-1 ring-line", span: "lg:col-span-5" },
  { Icon: MonitorPlay, title: "Sermons", body: "Messages to carry into your week, whenever you need them.", href: "/sermons", cta: "Watch a message", tone: "bg-red-soft text-night", span: "lg:col-span-12" },
];

export default function GrowPage() {
  return (
    <>
      <PageHero
        kicker="Grow"
        image={stock.choir}
        title={<>Rooted, built up <span className="text-red">and growing.</span></>}
        intro="Wherever you are with God, there’s a next step. Here are the ways to go deeper at HGC, with people ready to walk with you."
      />

      <section className="section-y">
        <div className="container-x">
          <SectionIntro chip="Ways to grow" title="Go deeper, one step at a time" />
          <div className="mt-12 grid gap-3 lg:grid-cols-12">
            {paths.map(({ Icon, ...p }, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08} y={30} className={p.span}>
                <Link href={p.href} className={cn("group flex h-full min-h-[15rem] flex-col justify-between rounded-[26px] p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8", p.tone)}>
                  <Icon className="size-8" strokeWidth={1.5} />
                  <div className="mt-8">
                    <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em]">{p.title}</h2>
                    <p className="mt-2 max-w-lg opacity-80">{p.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
                      {p.cta} <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NextStepsList />
      <VerseBlock reference="Colossians 2:7" text="Rooted and built up in Him and established in the faith, as you have been taught, abounding in it with thanksgiving." />
    </>
  );
}
