"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal, RevealWords } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { media, scriptures } from "@/lib/site";

/** The house vision, Unseen Heights (1 Corinthians 2:9): words on the left, a drifting photo on the right. */
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className="pb-[var(--section-gap)]">
      <div className="container-x">
        <div data-nav="dark" className="grid overflow-hidden rounded-[28px] bg-red text-white lg:grid-cols-12">
          <div className="relative p-7 md:p-12 lg:col-span-7 lg:py-14">
            <Reveal>
              <Chip onDark>Our vision</Chip>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] tracking-[-0.015em]">
              <RevealWords text="Unseen Heights." />
            </h2>
            <Reveal delay={0.15}>
              <blockquote className="mt-7 max-w-xl border-l-2 border-white/40 pl-5">
                <p className="font-serif text-[clamp(1.15rem,1.8vw,1.45rem)] leading-snug italic">“{scriptures.vision.text}”</p>
                <footer className="mt-2 text-sm text-white/75">{scriptures.vision.ref}</footer>
              </blockquote>
              <p className="mt-6 max-w-lg text-white/85">Love for God is our mantra at HGC, and we believe the best of what He has prepared is still ahead.</p>
            </Reveal>
          </div>
          <div className="relative min-h-[18rem] overflow-hidden lg:col-span-5">
            {media.worship && (
              <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y }}>
                <Image src={media.worship} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_25%]" />
              </motion.div>
            )}
            <span className="absolute inset-0 bg-gradient-to-r from-red/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
