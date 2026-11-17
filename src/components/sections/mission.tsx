"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { LogoMark } from "@/components/site/logo";

const TEXT =
  "Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for real worship, a passion for the church of Christ, and a mission to see God’s kingdom established across the earth.";
const ACCENT = new Set(["Jesus,", "worship,", "kingdom", "earth."]);

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 2) / n], [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(w) ? "text-cream" : undefined}>
      {w}{" "}
    </motion.span>
  );
}

/** Our mission: a compact dark card; the statement lights up word by word as you scroll. */
export function Mission() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });
  const full = useTransform(scrollYProgress, () => 1);
  const words = TEXT.split(" ");
  return (
    <section ref={ref} className="pb-[clamp(4rem,8vw,7rem)]">
      <div className="container-x">
        <div data-nav="dark" className="relative grid gap-8 overflow-hidden rounded-[28px] bg-night p-7 text-white md:p-12 lg:grid-cols-12 lg:gap-12">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(240,106,91,0.22),transparent)]" />
          <LogoMark onDark className="pointer-events-none absolute -right-6 -bottom-10 h-56 opacity-[0.07]" />
          <Reveal className="relative lg:col-span-3">
            <Chip onDark>Our mission</Chip>
            <p className="mt-5 max-w-xs text-white/55">Why HGC exists, in one sentence.</p>
          </Reveal>
          <div className="relative lg:col-span-9">
            <p className="text-[clamp(1.45rem,2.6vw,2.25rem)] leading-[1.25] font-light tracking-[-0.025em]">
              <span className="sr-only">{TEXT}</span>
              <span aria-hidden>
                {words.map((w, i) => (
                  <Word key={i} w={w} i={i} n={words.length} p={reduce ? full : scrollYProgress} />
                ))}
              </span>
            </p>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="group inline-flex h-11 items-center gap-2 rounded-full bg-cream px-5 font-semibold text-night transition-colors hover:bg-white">
                Our story <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link href="/visit" className="inline-flex h-11 items-center rounded-full px-5 font-semibold ring-1 ring-white/20 transition-colors hover:ring-white/50">Come on Sunday</Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
