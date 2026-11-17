"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { CopyButton } from "./copy-button";
import { LogoMark } from "./logo";
import { giving } from "@/lib/site";

/** A tactile, tilt-on-hover "glory card" holding the giving details. */
export function BankCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(600px circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 45%)`;

  const formatted = giving.accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.6/1] w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/15 p-7 text-ink-950 shadow-[0_40px_120px_-30px_rgba(214,156,69,0.55)] md:p-9"
      >
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(135deg,#f7e3b8_0%,#e8b86b_38%,#b07a2c_70%,#e8b86b_100%)]" />
        <div className="grain !opacity-20" />
        <motion.div aria-hidden className="absolute inset-0" style={{ background: sheen }} />
        <div aria-hidden className="absolute -right-16 -bottom-24 size-72 rounded-full border border-ink-950/10" />
        <div aria-hidden className="absolute -right-4 -bottom-12 size-48 rounded-full border border-ink-950/10" />

        <div className="relative flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow !text-[0.6rem] text-ink-950/60">Bank</p>
              <p className="mt-1 text-lg font-semibold">{giving.bank}</p>
            </div>
            <LogoMark mono className="size-11 text-ink-950/75" />
          </div>

          <div className="mt-auto">
            <p className="eyebrow !text-[0.6rem] text-ink-950/60">Account number</p>
            <p className="mt-2 font-mono text-[clamp(1.6rem,4.5vw,2.6rem)] font-medium tracking-[0.06em] tabular-nums">{formatted}</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow !text-[0.6rem] text-ink-950/60">Account name</p>
                <p className="mt-1 font-medium">{giving.accountName}</p>
              </div>
              <CopyButton value={giving.accountNumber} label="Copy number" className="border-ink-950/25 bg-ink-950/5 hover:bg-ink-950/10" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
