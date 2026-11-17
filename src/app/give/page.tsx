import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BankCard } from "@/components/site/bank-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { giving, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give & outreach",
  description: "Support the outreach programs and ministries of His Glory Cloud Church. Zenith Bank · His Glory Cloud Church · 1014394130.",
};

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Give & outreach"
        lines={[{ text: "Beyond" }, { text: "these walls.", em: true, className: "text-glory" }]}
        body="We are committed to reaching those in need, spreading the Gospel, and serving our community. Your generous giving is crucial to fulfilling the Great Commission."
      />

      <section className="bg-ink-900 pb-[clamp(5rem,10vw,9rem)] text-bone-100">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <BankCard />
            <p className="mt-6 text-sm text-bone-100/50">Transfer from any Nigerian bank. Tap “Copy number” to paste it straight into your banking app.</p>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Your gift enables us to" title={<>Every seed <em className="text-glory">bears fruit.</em></>} />
            <Stagger className="mt-10 grid gap-3" gap={0.08}>
              {giving.impact.map((item, i) => (
                <StaggerItem key={item}>
                  <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-ink-850 p-5">
                    <span className="font-mono text-xs text-glory-400">0{i + 1}</span>
                    <p className="text-bone-100/85">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="theme-light section-y rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {[scriptures.giving, scriptures.harvest].map((s, i) => (
            <Reveal key={s.ref} delay={i * 0.1}>
              <blockquote className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-8 md:p-12">
                <p className="eyebrow text-glory-600">{i === 0 ? "The call to give" : "The promise"}</p>
                <p className="mt-8 font-serif text-3xl leading-tight italic md:text-4xl">“{s.text}”</p>
                <footer className="eyebrow mt-auto pt-8 text-muted-foreground">{s.ref}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <Reveal className="container-x mt-16 text-center">
          <p className="text-display mx-auto max-w-3xl text-4xl md:text-6xl">
            Thank you for standing with us in <em className="text-glory-600">faith and in action.</em>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Together, we can make a difference that echoes into eternity — shining God’s light in the world, one life at a time.
          </p>
        </Reveal>
      </section>
    </>
  );
}
