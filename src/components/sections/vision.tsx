"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Embers } from "@/components/motion/embers";
import { scriptures } from "@/lib/site";

/** Scroll-scrubbed reveal of the house vision: UNSEEN HEIGHTS (1 Cor 2:9). */
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.82, 1]);
  const glow = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const lineScale = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  return (
    <section ref={ref} className="relative isolate -mt-14 overflow-hidden bg-ink-950 pt-[calc(clamp(6rem,14vw,12rem)+3.5rem)] pb-[clamp(6rem,14vw,12rem)] text-bone-50">
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute top-1/2 left-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,227,184,0.35),rgba(214,156,69,0.12)_50%,transparent)] blur-2xl"
      />
      <Embers density={40} className="absolute inset-0 -z-10 size-full opacity-70" />
      <div className="grain" />

      <motion.div style={{ y }} className="container-x text-center">
        <p className="eyebrow text-glory-300">Our vision is simply</p>
        <motion.h2 style={{ scale }} className="text-display mt-8 text-[clamp(4.5rem,15vw,15rem)] leading-[0.82]">
          Unseen
          <br />
          <em className="text-glory pr-[0.06em]">Heights.</em>
        </motion.h2>
        <motion.div style={{ scaleX: lineScale }} className="mx-auto mt-14 h-px w-40 bg-gradient-to-r from-transparent via-glory-300 to-transparent" />
        <blockquote className="mx-auto mt-10 max-w-3xl">
          <p className="font-serif text-2xl leading-snug text-bone-100/85 italic md:text-4xl">“{scriptures.vision.text}”</p>
          <footer className="eyebrow mt-6 text-bone-100/45">{scriptures.vision.ref}</footer>
        </blockquote>
        <p className="mx-auto mt-10 max-w-lg text-bone-100/55">
          Hence, love for God is our mantra at HGC — and we believe the best of what He has prepared is still ahead.
        </p>
      </motion.div>
    </section>
  );
}
