"use client";

import { motion, useReducedMotion } from "motion/react";
import { RevealWords, Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/site/logo";

const ease = [0.65, 0, 0.35, 1] as const;

/** A quiet pause between sections: an ornament and a verse. */
export function Interlude() {
  const reduce = useReducedMotion();
  const line = (origin: "left" | "right") => (
    <motion.span
      aria-hidden
      className={origin === "left" ? "h-px flex-1 bg-gradient-to-l from-red/50 to-transparent" : "h-px flex-1 bg-gradient-to-r from-red/50 to-transparent"}
      style={{ transformOrigin: origin === "left" ? "right" : "left" }}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease }}
    />
  );

  return (
    <section className="relative py-[clamp(4rem,9vw,7rem)]">
      <div className="container-x">
        <div className="mx-auto flex max-w-3xl items-center gap-5">
          {line("left")}
          <Reveal y={10}>
            <span className="grid size-14 place-items-center rounded-full bg-white ring-1 ring-line shadow-[0_10px_30px_-16px_rgba(35,29,23,0.4)]">
              <LogoMark className="h-9" />
            </span>
          </Reveal>
          {line("right")}
        </div>
        <blockquote className="mx-auto mt-10 max-w-4xl text-center">
          <p className="font-serif text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.2] text-ink italic">
            <RevealWords text="“Oh come, let us worship and bow down; let us kneel before the Lord our Maker.”" stagger={0.035} />
          </p>
          <Reveal delay={0.3}>
            <footer className="mt-5 text-sm font-semibold tracking-[0.16em] text-red uppercase">Psalm 95:6</footer>
          </Reveal>
        </blockquote>
      </div>
    </section>
  );
}
