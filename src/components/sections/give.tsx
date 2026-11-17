import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BankCard } from "@/components/site/bank-card";
import { Button } from "@/components/ui/button";
import { giving, scriptures } from "@/lib/site";

export function Give() {
  return (
    <section className="dark-section section-y relative isolate overflow-hidden bg-ink-900 text-bone-100">
      <div aria-hidden className="absolute top-1/3 left-[-10%] -z-10 size-[36rem] rounded-full bg-glory-500/15 blur-[140px]" />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-glory-300">
              <span className="h-px w-8 bg-current" /> Give & outreach
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-display mt-6 text-5xl md:text-7xl">
              Sow a seed. <em className="text-glory">Shine His light.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-100/60">
              Our mission extends beyond the walls of our church. Your generosity lets us be the hands and feet of Jesus — bringing hope and healing to our community and beyond.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {giving.impact.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug text-bone-100/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-glory-400/15 text-glory-300">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Button asChild variant="glass" size="lg">
              <Link href="/give">
                Why we give <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal delay={0.1}>
            <BankCard />
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l border-glory-400/40 pl-6">
              <p className="font-serif text-2xl leading-snug text-bone-100/85 italic">“{scriptures.giving.text}”</p>
              <footer className="eyebrow mt-4 text-bone-100/40">{scriptures.giving.ref}</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
