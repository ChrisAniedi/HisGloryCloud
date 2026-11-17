"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function Word({ w, delay, className }: { w: string; delay: number; className?: string }) {
  return (
    <span className="inline-flex overflow-hidden pt-[0.04em] pb-[0.14em] -mb-[0.1em] align-bottom">
      <motion.span
        className={cn("inline-block", className)}
        initial={{ y: "110%", rotate: 4, filter: "blur(6px)" }}
        animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {w}
      </motion.span>
    </span>
  );
}

/**
 * "Raising Kingdom builders for God's glory." Words rise into place one after another, then a
 * hand-drawn line writes itself under "God's glory." and the phrase warms once.
 */
export function HeroHeadline({ dark }: { dark: boolean }) {
  const reduce = useReducedMotion();
  const first = ["Raising", "Kingdom", "builders"];
  const start = 0.3;
  const step = 0.08;
  const glowAt = start + (first.length + 2) * step + 0.5;

  return (
    <h1 className={cn("mt-7 text-[clamp(2.9rem,min(6.2vw,9.6svh),5.75rem)] leading-[1] font-medium tracking-[-0.045em]", dark ? "text-white" : "text-ink")}>
      <span className="sr-only">Raising Kingdom builders for God’s glory.</span>
      <span aria-hidden className="block">
        <span className="flex flex-wrap justify-center gap-x-[0.24em]">
          {first.map((w, i) => (
            <Word key={w} w={w} delay={start + i * step} />
          ))}
        </span>
        <span className="flex flex-wrap justify-center gap-x-[0.24em]">
          <Word w="for" delay={start + 3 * step} />
          <span className="relative inline-flex gap-x-[0.24em]">
            <Word w="God’s" delay={start + 4 * step} className={dark ? "text-glow" : "text-red"} />
            <Word w="glory." delay={start + 5 * step} className={dark ? "text-glow" : "text-red"} />
            {/* the hand-drawn line */}
            <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.2em] w-full overflow-visible">
              <motion.path
                d="M4 13 C 60 4, 120 4, 170 9 S 260 16, 296 6"
                fill="none"
                stroke={dark ? "#f3e9d7" : "#a8231c"}
                strokeOpacity={dark ? 0.85 : 0.6}
                strokeWidth="3"
                strokeLinecap="round"

                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: glowAt, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-x-[0.2em] -inset-y-[0.1em] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(240,106,91,0.35),transparent)] blur-xl"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0.35], scale: [0.6, 1.15, 1] }}
                transition={{ duration: 2.2, delay: glowAt + 0.3, ease: "easeOut" }}
              />
            )}
          </span>
        </span>
      </span>
    </h1>
  );
}
