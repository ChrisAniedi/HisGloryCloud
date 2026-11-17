import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { MediaFrame } from "@/components/site/media-frame";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { church, coreValues, media, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Established November 16, 2013, His Glory Cloud Church exists to spread the gospel of Jesus with signs, wonders and the power of God — from the Glory Tent in Lagos to the ends of the earth.",
};

const reach = ["Africa", "America", "Europe", "The ends of the earth"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={[{ text: "A people of" }, { text: "His glory.", em: true, className: "text-glory" }]}
        body={`${church.name} — ${church.chapel} — has a mission to spread the gospel of our Lord Jesus around the world with signs, wonders and manifestations of the power of God as of old.`}
      />

      {/* Story */}
      <section className="section-y bg-ink-900 pt-0 text-bone-100">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-glory-300">Est.</p>
              <p className="text-display mt-4 text-8xl text-bone-50 md:text-9xl">2013</p>
              <p className="mt-4 text-bone-100/55">Founded {church.foundedLabel}, with headquarters at the {church.alias}, Lagos.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ScrollText
              className="text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.15] font-medium tracking-[-0.02em]"
              highlight={["gospel", "glory", "earth"]}
              text="From the Glory Tent, HGC is spreading the gospel, broadcasting the Word through media, conducting outreach programs, engaging in philanthropy and contributing to community — with plans to reach Africa, America, Europe and the ends of the earth."
            />
            <Reveal className="mt-12 flex flex-wrap gap-2">
              {reach.map((r, i) => (
                <span key={r} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm">
                  <span className="font-mono text-[10px] text-glory-400">0{i + 1}</span> {r}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="theme-light section-y rounded-[2.5rem] md:rounded-[3.5rem]">
        <div className="container-x">
          <SectionHeading eyebrow="Why we exist" title={<>Mission <em className="text-glory-600">&amp;</em> vision</>} />
          <Stagger className="mt-14 grid gap-4 lg:grid-cols-2" gap={0.12}>
            <StaggerItem>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-8 md:p-12">
                <p className="eyebrow text-glory-600">Our mission</p>
                <p className="mt-8 font-serif text-3xl leading-tight md:text-4xl">
                  To raise you, furnish you, bring out the hidden virtues in you, and make a <em className="text-glory-600">glorious destiny</em> out of you — by teaching and showing you who you are in Christ.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-900 p-8 text-bone-50 md:p-12">
                <div aria-hidden className="absolute -top-20 -right-20 size-80 rounded-full bg-glory-400/25 blur-[90px]" />
                <p className="eyebrow relative text-glory-300">Our vision</p>
                <p className="text-display relative mt-8 text-6xl md:text-7xl">
                  Unseen <em className="text-glory">Heights.</em>
                </p>
                <p className="relative mt-6 font-serif text-xl leading-snug text-bone-100/75 italic">“{scriptures.vision.text}”</p>
                <p className="eyebrow relative mt-4 text-bone-100/40">{scriptures.vision.ref}</p>
                <p className="relative mt-auto pt-8 text-bone-100/60">Hence, love for God is our mantra at HGC.</p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y bg-ink-900 text-bone-100">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <MediaFrame src={media.leader} alt={church.leader.name} tone="dusk" caption={church.leader.role} className="aspect-[4/5] w-full" />
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Leadership"
              title={
                <>
                  {church.leader.name.replace(" Edobor", "")} <em className="text-glory">Edobor</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-4 font-serif text-2xl text-glory-300 italic">“{church.leader.title}”</p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-100/65">
                God has raised His servant, Apostle Festus Nwachukwu Edobor, to raise you, furnish you, bring out the hidden virtues in you and make a glorious destiny out of you. Under his leadership, HGC continues to spread the gospel through worship, the Word, media, outreach and philanthropy.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section-y bg-ink-900 pt-0 text-bone-100">
        <div className="container-x">
          <SectionHeading eyebrow="Core values" title={<>What our hands <em className="text-glory">are given to.</em></>} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.08}>
            {coreValues.map((v, i) => (
              <StaggerItem key={v.title} className="h-full">
                <SpotlightCard className="flex h-full min-h-[18rem] flex-col rounded-[1.5rem] border border-white/10 bg-ink-850 p-7">
                  <span className="font-mono text-xs text-glory-400">0{i + 1}</span>
                  <h3 className="mt-auto pt-10 font-serif text-3xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-100/55">{v.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
