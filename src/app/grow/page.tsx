import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, CalendarRange, Coins, Flame, GraduationCap, MonitorPlay, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Chip, SectionIntro } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { LineArt } from "@/components/motion/line-art";
import { TrainingForm } from "@/components/forms/forms";
import { Faq } from "@/components/blocks/faq";
import { VerseBlock } from "@/components/blocks/verse-block";
import { art } from "@/lib/drawings";
import { stock, trainingFaqs } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grow · Ministry Training",
  description: "Ministry Training at His Glory Cloud Church: spiritual knowledge, leadership skills and hands-on ministry experience. Next session in 2026.",
};

const facts = [
  { Icon: CalendarRange, k: "Length", v: "6 to 12 weeks, depending on the level" },
  { Icon: BookOpen, k: "Format", v: "Teaching sessions and practical ministry" },
  { Icon: Award, k: "At the end", v: "A Certificate of Completion" },
  { Icon: Coins, k: "Cost", v: "Mostly free; some advanced courses ask a small fee for materials" },
];
const courses = ["Spiritual Growth", "Biblical Leadership", "Evangelism", "Church Administration", "Discipleship", "Ministry Ethics"];

const more = [
  { Icon: Sparkles, title: "New in faith", body: "Just given your life to Jesus? Start here, and someone will walk with you from day one.", href: "/salvation", cta: "Start here", tone: "bg-red text-white" },
  { Icon: Flame, title: "Midweek service", body: "One hour on Wednesday evenings, 6 to 7pm: prayer, teaching and a refreshing of the Spirit.", href: "/visit", cta: "Plan to come", tone: "bg-night text-white" },
  { Icon: Users, title: "Join the workforce", body: "Choir, media, ushering, protocol, the prayer squad and more. Grow by serving.", href: "/serve", cta: "Find your unit", tone: "bg-white text-night ring-1 ring-line" },
  { Icon: MonitorPlay, title: "Sermons", body: "Messages to carry into your week, whenever you need them.", href: "/sermons", cta: "Watch a message", tone: "bg-cream text-night" },
];

export default function GrowPage() {
  return (
    <>
      <PageHero
        kicker="Grow · Ministry Training"
        image={stock.choir}
        title={<>Equipped to build <span className="text-red">the Kingdom.</span></>}
        intro="Our Ministry Training Program gives believers spiritual knowledge, leadership skills and hands-on ministry experience, so they can serve well in God’s kingdom."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="#register" className="inline-flex h-12 items-center rounded-full bg-red px-6 font-semibold text-white hover:bg-red-dark">Register your interest</a>
          <span className="rounded-full bg-red-soft px-3 py-1.5 text-sm font-semibold text-red">Next session: 2026</span>
        </div>
      </PageHero>

      {/* The programme */}
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Chip>The programme</Chip>
              <h2 className="heading-2 mt-5">Grounded in the Word. Ready for the work.</h2>
              <p className="mt-4 text-lg text-muted">For anyone with a passion to know God more and serve, whether you’re a new believer or already serving in a unit.</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid place-items-center rounded-[26px] bg-cream py-8">
              <LineArt strokes={art.book} className="h-36 w-36 text-ink" />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {facts.map(({ Icon, ...f }, i) => (
                <Reveal key={f.k} delay={i * 0.06} y={24}>
                  <Tilt className="h-full rounded-[22px]" max={5}>
                    <div className="h-full rounded-[22px] bg-white p-6 ring-1 ring-line">
                      <span className="grid size-10 place-items-center rounded-full bg-red-soft text-red"><Icon className="size-5" strokeWidth={1.75} /></span>
                      <p className="mt-5 text-sm text-muted">{f.k}</p>
                      <p className="mt-1 text-lg font-medium tracking-tight">{f.v}</p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-3 rounded-[22px] bg-night p-6 text-white">
              <p className="flex items-center gap-2 text-sm text-white/60"><GraduationCap className="size-4" /> Courses include</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {courses.map((c) => (
                  <li key={c} className="rounded-full bg-white/[0.08] px-4 py-2 text-sm ring-1 ring-white/10">{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="scroll-mt-28 pb-[clamp(3.25rem,6vw,5.25rem)]">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Chip>Register</Chip>
            <h2 className="heading-2 mt-5">Register your interest</h2>
            <p className="mt-4 text-lg text-muted">The next session starts in 2026. Leave your details and we’ll let you know as soon as registration opens.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[26px] bg-white p-6 ring-1 ring-line sm:p-9">
              <TrainingForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={trainingFaqs} title="About the programme" chip="Questions" className="pt-0" />

      {/* More ways to grow */}
      <section className="pb-[clamp(3.25rem,6vw,5.25rem)]">
        <div className="container-x">
          <SectionIntro chip="More ways to grow" title="Go deeper, one step at a time" />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {more.map(({ Icon, ...p }, i) => (
              <Reveal key={p.title} delay={i * 0.06} y={30}>
                <Tilt className="h-full rounded-[24px]">
                  <Link href={p.href} className={cn("group flex h-full min-h-[16rem] flex-col justify-between rounded-[24px] p-6", p.tone)}>
                    <Icon className="size-7" strokeWidth={1.5} />
                    <div className="mt-8">
                      <h3 className="font-display text-[1.5rem] tracking-[-0.01em]">{p.title}</h3>
                      <p className="mt-2 opacity-80">{p.body}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold">
                        {p.cta} <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </div>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VerseBlock reference="Colossians 2:7" text="Rooted and built up in Him and established in the faith, as you have been taught, abounding in it with thanksgiving." />
    </>
  );
}
