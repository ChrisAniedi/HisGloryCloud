import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Globe2, HandHeart, Radio, Users } from "lucide-react";
import { AboutHero } from "@/components/blocks/about-hero";
import { SectionIntro, Chip } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/site/logo";
import { church, coreValues, media, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Established November 16, 2013, His Glory Cloud Church exists to spread the gospel of Jesus with signs, wonders and the power of God — from the Glory Tent in Lagos to the ends of the earth.",
};

const valueIcons = [BookOpen, Radio, Globe2, HandHeart, Users];
const reach = ["Lagos", "Africa", "America", "Europe", "The ends of the earth"];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Story */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
              {media.thanksgiving && <Image src={media.thanksgiving} alt="A worshipper singing during a thanksgiving service at the Glory Tent" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_25%]" />}
              <span className="absolute right-5 bottom-5 left-5 rounded-2xl bg-white/92 p-4 backdrop-blur">
                <span className="block text-sm text-muted">Founded</span>
                <span className="block text-2xl font-medium tracking-tight">{church.foundedLabel}</span>
              </span>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionIntro align="left" chip="Our story" title="From the Glory Tent, to the ends of the earth" />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg text-muted">
              <p>
                HGC was founded on {church.foundedLabel}, with its headquarters at the {church.alias} in Gowon Estate, Egbeda, Lagos.
              </p>
              <p>
                From there the church spreads the gospel, broadcasts the Word through media, runs outreach programmes, gives to
                families in need and serves the community around it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm font-medium text-ink">Where we’re going</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {reach.map((r, i) => (
                  <li key={r} className={i === 0 ? "rounded-full bg-night px-4 py-2 text-sm font-medium text-white" : "rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-line"}>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section data-nav="dark" className="px-2 md:px-3">
        <div className="rounded-[24px] bg-night py-[clamp(3.5rem,7vw,5.5rem)] text-white md:rounded-[28px]">
          <div className="container-x grid gap-4 md:grid-cols-2">
            <Reveal className="flex h-full flex-col rounded-[24px] bg-white/[0.05] p-8 ring-1 ring-white/10 md:p-10">
              <Chip onDark>Our mission</Chip>
              <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug font-light tracking-[-0.02em]">
                To raise you, furnish you, bring out the hidden virtues in you, and make a <span className="text-cream">glorious destiny</span> out of you, by teaching and showing you who you are in Christ.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-red p-8 md:p-10">
              <LogoMark onDark className="pointer-events-none absolute -right-8 -bottom-10 h-60 opacity-15" />
              <Chip onDark>Our vision</Chip>
              <p className="mt-6 text-[clamp(2.6rem,5vw,4rem)] leading-none font-light tracking-[-0.05em]">Unseen Heights.</p>
              <blockquote className="mt-6 max-w-md">
                <p className="font-serif text-lg leading-snug italic">“{scriptures.vision.text}”</p>
                <footer className="mt-2 text-sm text-white/75">{scriptures.vision.ref}</footer>
              </blockquote>
              <p className="mt-auto pt-6 text-white/85">Hence, love for God is our mantra at HGC.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-[28px] bg-white p-3 ring-1 ring-line md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:pr-12">
              {media.leader && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sand">
                  <Image src={media.leader} alt={church.leader.name} fill sizes="(min-width:768px) 20rem, 100vw" className="object-cover object-[50%_20%]" />
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgba(20,16,13,0.55))]" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pr-3 pl-1 text-xs font-semibold text-ink backdrop-blur">
                    <span className="grid size-6 place-items-center rounded-full bg-paper"><LogoMark className="h-4" /></span>
                    {church.leader.role}
                  </span>
                </div>
              )}
              <div className={media.leader ? "px-4 pb-6 md:px-0 md:py-8" : "p-8 text-center md:p-14"}>
                <Chip>Leadership</Chip>
                <h2 className="heading-2 mt-5">{church.leader.name}</h2>
                <p className="mt-2 font-medium text-red">{church.leader.role} · “{church.leader.title}”</p>
                <p className="mt-6 max-w-2xl text-lg text-muted">
                  God has raised His servant, Apostle Festus Nwachukwu Edobor, to raise you, furnish you, bring out the hidden
                  virtues in you and make a glorious destiny out of you. Under his leadership, HGC continues to spread the gospel
                  through worship, the Word, media, outreach and philanthropy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="pb-[clamp(3.25rem,6vw,5.25rem)]">
        <div className="container-x">
          <SectionIntro chip="Core values" title="What our hands are given to" />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal key={v.title} delay={i * 0.06} className="h-full">
                  <div className="group flex h-full flex-col rounded-[22px] bg-white p-6 ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(35,29,23,0.45)]">
                    <span className="grid size-11 place-items-center rounded-full bg-red-soft text-red transition-colors group-hover:bg-red group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 text-xl font-medium tracking-tight">{v.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-muted">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
