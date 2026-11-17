"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal, RevealWords } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { media, scriptures } from "@/lib/site";

/** The house vision, Unseen Heights (1 Corinthians 2:9), over a worship photo that drifts as you scroll. */
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.25, 1.12, 1.25]);

  return (
    <section ref={ref} data-nav="dark" className="px-2 md:px-3">
      <div className="relative isolate overflow-hidden rounded-[24px] bg-night py-[clamp(6rem,14vw,11rem)] text-white md:rounded-[28px]">
        {media.worship && (
          <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ y, scale }}>
            <Image src={media.worship} alt="" fill sizes="100vw" className="object-cover object-[50%_30%]" />
          </motion.div>
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,16,13,0.92)_0%,rgba(20,16,13,0.7)_45%,rgba(60,14,10,0.45)_100%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#a8231c]/20 mix-blend-multiply" />
        <div className="container-x">
          <Reveal>
            <Chip onDark>Our vision</Chip>
          </Reveal>
          <h2 className="mt-6 text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.9] font-light tracking-[-0.055em]">
            <RevealWords text="Unseen Heights." />
          </h2>
          <Reveal delay={0.2} className="mt-10 grid gap-8 md:grid-cols-12">
            <blockquote className="md:col-span-7">
              <p className="font-serif text-[clamp(1.4rem,2.4vw,2rem)] leading-snug italic">“{scriptures.vision.text}”</p>
              <footer className="mt-3 font-medium text-white/70">{scriptures.vision.ref}</footer>
            </blockquote>
            <p className="text-lg text-white/80 md:col-span-4 md:col-start-9 md:self-end">
              Love for God is our mantra at HGC, and we believe the best of what He has prepared is still ahead.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
