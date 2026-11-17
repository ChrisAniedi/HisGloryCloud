"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Masked line-by-line rise for display headlines.
 * Pass lines as an array; wrap emphasis in <em> via the `em` flag.
 */
export function SplitHeadline({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
  inView = false,
}: {
  lines: { text: string; em?: boolean; className?: string }[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  inView?: boolean;
}) {
  const MotionTag = motion[Tag];
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.22em] -mb-[0.22em] px-[0.04em] -mx-[0.04em]", lineClassName)}>
          <motion.span
            className={cn("block will-change-transform", line.em && "italic", line.className)}
            variants={{
              hidden: { y: "110%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE } },
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
