import { HeroBackdrop } from "@/components/motion/hero-backdrop";
import type { Metadata } from "next";
import { Check, Globe2, Landmark, MessageCircle } from "lucide-react";
import { Chip, SectionIntro } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { LineArt } from "@/components/motion/line-art";
import { CopyButton } from "@/components/site/copy-button";
import { Faq } from "@/components/blocks/faq";
import { VerseBlock } from "@/components/blocks/verse-block";
import { art } from "@/lib/drawings";
import { church, giveFaqs, giving, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: "Give to His Glory Cloud Church. Zenith Bank · His Glory Cloud Church · 1014394130. Your generosity takes the love of Christ beyond our walls.",
};

export default function GivePage() {
  const formatted = giving.accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 md:pt-40">
        <HeroBackdrop />
        <div className="container-x text-center">
          <Reveal>
            <Chip>Give & outreach</Chip>
            <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.95] font-display tracking-[-0.015em]">
              Giving as <span className="text-red">worship.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl">Your generosity is an act of worship to God, and a powerful way to take the love of Christ beyond the four walls of the church.</p>
            <a href="#accounts" className="mt-8 inline-flex h-12 items-center rounded-full bg-red px-7 font-semibold text-white hover:bg-red-dark">Give now</a>
          </Reveal>
        </div>
        <div className="container-x mt-14 grid gap-3 md:grid-cols-3">
          {[
            { label: "Giving", tone: "bg-night", strokes: art.hands, color: "#f3e9d7" },
            { label: "Cheerfully", tone: "bg-red", strokes: art.care, color: "#fff4ef" },
            { label: "Seeds of outreach", tone: "bg-cream", strokes: art.globe, color: "#a8231c" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1} y={30}>
              <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[26px] ${c.tone}`}>
                <LineArt strokes={c.strokes} viewBox={c.strokes === art.hands ? "0 0 240 160" : "0 0 160 160"} color={c.color} accent={c.color} width={1.8} className="h-[60%] w-[70%]" />
                <span className="absolute bottom-4 left-5 font-serif text-lg italic" style={{ color: c.color }}>{c.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="accounts" className="section-y scroll-mt-28">
        <div className="container-x">
          <SectionIntro chip="Ways to give" title="Choose how you want to give" body="Every gift, of any size, makes a difference. Thank you for partnering with us." />
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" y={30}>
              <div className="relative h-full overflow-hidden rounded-[28px] bg-night p-7 text-white md:p-10">
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(240,106,91,0.35),transparent)]" />
                <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-cream uppercase"><Landmark className="size-4" /> Bank transfer · Naira</p>
                <p className="mt-6 text-sm text-white/55">Offerings, tithes and outreach</p>
                <p className="mt-1 text-[clamp(2.4rem,6vw,4rem)] leading-none font-medium tracking-[-0.02em] tabular-nums">{formatted}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CopyButton value={giving.accountNumber} label="Copy account number" className="border-white/20 bg-white/10 text-white hover:border-white/50" />
                </div>
                <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm text-white/55">Bank</dt>
                    <dd className="mt-0.5 text-lg font-medium">{giving.bank}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/55">Account name</dt>
                    <dd className="mt-0.5 text-lg font-medium">{giving.accountName}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
            <div className="grid gap-4 lg:col-span-5">
              <Reveal delay={0.08} y={30}>
                <div className="h-full rounded-[28px] bg-white p-7 ring-1 ring-line">
                  <span className="grid size-11 place-items-center rounded-full bg-red-soft text-red"><Check className="size-5" /></span>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">In person</h3>
                  <p className="mt-1.5 text-muted">During any Sunday or midweek service at the {church.alias}.</p>
                </div>
              </Reveal>
              <Reveal delay={0.16} y={30}>
                <div className="h-full rounded-[28px] bg-white p-7 ring-1 ring-line">
                  <span className="grid size-11 place-items-center rounded-full bg-red-soft text-red"><Globe2 className="size-5" /></span>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">From outside Nigeria</h3>
                  <p className="mt-1.5 text-muted">Message us and we’ll share the best way to give from where you are.</p>
                  <a href="/help#reach-us" className="mt-4 inline-flex items-center gap-1.5 font-semibold text-red"><MessageCircle className="size-4" /> Message us</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section data-nav="dark" className="px-2 md:px-3">
        <div className="rounded-[24px] bg-red py-[clamp(3.5rem,7vw,5.5rem)] text-white md:rounded-[28px]">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Chip onDark>Your giving is changing lives</Chip>
              <h2 className="heading-2 mt-5">Every seed you sow reaches further than you think</h2>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {giving.impact.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.06} className="rounded-[20px] bg-white/10 p-5 text-lg ring-1 ring-white/15">
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={giveFaqs} title="Questions about giving" />
      <VerseBlock reference={scriptures.giving.ref} text={scriptures.giving.text} />
    </>
  );
}
