"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// grid cells (column, row) that glow softly in turn
const cells = [
  [3, 1], [8, 2], [13, 1], [5, 4], [16, 3], [10, 5], [1, 3], [19, 1], [7, 6], [14, 6],
];

/**
 * Hero backdrop: a faded grid that dissolves towards the edges, a warm light drifting slowly
 * behind it, a few cells that glow in turn, and a light running along one grid line.
 * Use inside a `relative overflow-hidden` hero. `dark` switches the line colour for night heroes.
 */
export function HeroBackdrop({ dark = false, panel = false, className }: { dark?: boolean; panel?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const line = dark ? "rgba(243,233,215,0.05)" : panel ? "rgba(35,29,23,0.06)" : "rgba(35,29,23,0.04)";
  const cell = panel ? 48 : 64;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* drifting light */}
      {!panel && <motion.div
        className={cn(
          "absolute top-[-14rem] left-1/2 h-[38rem] w-[62rem] -translate-x-1/2 rounded-full",
          dark ? "bg-[radial-gradient(closest-side,rgba(240,106,91,0.24),transparent)]" : "bg-[radial-gradient(closest-side,rgba(240,150,130,0.26),transparent)]"
        )}
        animate={reduce ? undefined : { x: ["-56%", "-44%", "-56%"], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />}
      {/* the grid, faded out towards the edges and the bottom */}
      <div
        className={cn("absolute inset-0", panel ? "[mask-image:radial-gradient(ellipse_85%_90%_at_60%_50%,#000_35%,transparent_95%)]" : "[mask-image:radial-gradient(ellipse_70%_75%_at_50%_20%,#000_25%,transparent_80%)]")}
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: "center top",
        }}
      >
        {!reduce && (
          <>
            {cells.map(([c, r], i) => (
              <motion.span
                key={i}
                className={cn("absolute", dark ? "bg-cream/[0.05]" : panel ? "bg-red/[0.07]" : "bg-red/[0.045]")}
                style={{ width: cell - 1, height: cell - 1, left: `calc(50% + ${(c - 10) * cell - cell / 2 + 1}px)`, top: r * cell + 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3.2, delay: i * 1.1, repeat: Infinity, repeatDelay: cells.length * 1.1 - 3.2 }}
              />
            ))}
            {/* a light running along a grid line */}
            <motion.span
              className={cn("absolute h-px w-40", dark ? "bg-[linear-gradient(90deg,transparent,rgba(243,233,215,0.45),transparent)]" : "bg-[linear-gradient(90deg,transparent,rgba(168,35,28,0.4),transparent)]")}
              style={{ top: cell * 3 }}
              initial={{ left: "-10rem" }}
              animate={{ left: "100%" }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
            <motion.span
              className={cn("absolute w-px h-40", dark ? "bg-[linear-gradient(180deg,transparent,rgba(243,233,215,0.4),transparent)]" : "bg-[linear-gradient(180deg,transparent,rgba(168,35,28,0.35),transparent)]")}
              style={{ left: `calc(50% + ${3.5 * cell}px)` }}
              initial={{ top: "-10rem" }}
              animate={{ top: "100%" }}
              transition={{ duration: 6, delay: 4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            />
          </>
        )}
      </div>
    </div>
  );
}
