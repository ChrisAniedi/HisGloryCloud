"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A card that leans towards the pointer, with a soft light that follows it.
 * Mouse only; touch and reduced-motion visitors get a still card.
 */
export function Tilt({ children, className, max = 6, glare = true }: { children: React.ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const go = useMotionValue(0);
  const light = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set((0.5 - py) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
        go.set(1);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        go.set(0);
      }}
    >
      {children}
      {glare && !reduce && <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" style={{ background: light, opacity: go }} />}
    </motion.div>
  );
}
