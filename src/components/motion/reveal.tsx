"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and un-blurs its children into place.
 * `onMount` plays straight away (for the hero); otherwise it waits until scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  onMount = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  onMount?: boolean;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(10px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <Comp
      className={className}
      initial={hidden}
      {...(onMount ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "0px 0px -12% 0px" } })}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** A line of text whose words arrive one after another. */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  onMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.35em", filter: "blur(8px)" }}
            {...(onMount
              ? { animate: { opacity: 1, y: 0, filter: "blur(0px)" } }
              : { whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
