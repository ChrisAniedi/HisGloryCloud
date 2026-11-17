"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

import type { Stroke } from "@/lib/drawings";

export type { Stroke };

/** A drawing made of single strokes that draws itself once it is scrolled into view. */
export function LineArt({
  strokes,
  viewBox = "0 0 160 160",
  className,
  color = "currentColor",
  accent = "#a8231c",
  width = 2,
}: {
  strokes: Stroke[];
  viewBox?: string;
  className?: string;
  color?: string;
  accent?: string;
  width?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <svg aria-hidden viewBox={viewBox} fill="none" className={cn("overflow-visible", className)}>
      {strokes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke={s.accent ? accent : color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={s.fill ? (s.accent ? accent : color) : "none"}
          fillOpacity={s.fill ? 0.12 : 0}
          initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ pathLength: { duration: 1.6, delay: 0.15 + i * 0.12, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay: 0.15 + i * 0.12 } }}
        />
      ))}
    </svg>
  );
}
