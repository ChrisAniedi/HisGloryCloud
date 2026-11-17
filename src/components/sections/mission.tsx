"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";

const TEXT =
  "Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for real worship, a passion for the church of Christ, and a mission to see God’s kingdom established across the earth.";
const ACCENT = new Set(["Jesus,", "worship,", "kingdom", "earth."]);

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 2) / n], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(w) ? "text-cream" : undefined}>
      {w}{" "}
    </motion.span>
  );
}

/** Our mission, on a dark band, lighting up word by word as you read down the page. */
export function Mission() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.45"] });
  const full = useTransform(scrollYProgress, () => 1);
  const words = TEXT.split(" ");
  return (
    <section ref={ref} data-nav="dark" className="px-2 md:px-3">
      <div className="relative overflow-hidden rounded-[24px] bg-night py-[clamp(4.5rem,11vw,8.5rem)] text-white md:rounded-[28px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(45%_70%_at_50%_0%,rgba(240,106,91,0.18),transparent)]" />
        <div className="container-x relative text-center">
          <Reveal>
            <Chip onDark>Our mission</Chip>
          </Reveal>
          <p className="mx-auto mt-8 max-w-5xl text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.14] font-light tracking-[-0.035em]">
            <span className="sr-only">{TEXT}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} w={w} i={i} n={words.length} p={reduce ? full : scrollYProgress} />
              ))}
            </span>
          </p>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/about" className="group inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 font-semibold text-night transition-colors hover:bg-white">
              Our story <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link href="/visit" className="inline-flex h-12 items-center rounded-full px-6 font-semibold ring-1 ring-white/20 transition-colors hover:ring-white/50">
              Come on Sunday
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
