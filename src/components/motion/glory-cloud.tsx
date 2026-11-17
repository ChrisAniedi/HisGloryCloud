"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Embers } from "./embers";
import { cn } from "@/lib/utils";

/**
 * The signature atmosphere: light breaking through a cloud of glory.
 * Layers (back → front): optional Higgsfield video · god-rays · drifting
 * cloud volumes · rising embers · grain · vignette.
 */
export function GloryCloud({
  video,
  poster,
  intensity = 1,
  embers = true,
  className,
}: {
  video?: string | null;
  poster?: string | null;
  intensity?: number;
  embers?: boolean;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const fx = useTransform(sx, (v) => v * 30);
  const fy = useTransform(sy, (v) => v * 20);
  const bx = useTransform(sx, (v) => v * -14);
  const by = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-ink-950", className)}>
      {video && (
        <video
          className="absolute inset-0 size-full object-cover opacity-60 mix-blend-screen"
          src={video}
          poster={poster ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* God-rays from above */}
      <div
        className="absolute top-[-60%] left-1/2 aspect-square w-[180%] max-w-[2600px] animate-rays opacity-[0.55] blur-2xl"
        style={{
          transform: "translateX(-50%)",
          opacity: 0.5 * intensity,
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(247,227,184,0.0) 0deg, rgba(247,227,184,0.22) 4deg, rgba(247,227,184,0.0) 9deg, rgba(247,227,184,0) 17deg)",
          maskImage: "radial-gradient(closest-side, black 0%, black 25%, transparent 70%)",
        }}
      />

      {/* Back cloud volume */}
      <motion.div className="absolute inset-0" style={{ x: bx, y: by }}>
        <div
          className="absolute top-[8%] left-[-10%] h-[70%] w-[70%] animate-drift-b rounded-full blur-[100px]"
          style={{ background: "radial-gradient(closest-side, rgba(176,122,44,0.55), transparent)", opacity: intensity }}
        />
        <div
          className="absolute top-[20%] right-[-15%] h-[75%] w-[65%] animate-drift-c rounded-full blur-[110px]"
          style={{ background: "radial-gradient(closest-side, rgba(246,70,72,0.22), transparent)", opacity: intensity }}
        />
      </motion.div>

      {/* Front cloud volume — the bright core */}
      <motion.div className="absolute inset-0" style={{ x: fx, y: fy }}>
        <div
          className="absolute top-[-18%] left-1/2 h-[75%] w-[70%] -translate-x-1/2 animate-drift-a rounded-full blur-[80px]"
          style={{ background: "radial-gradient(closest-side, rgba(247,227,184,0.75), rgba(232,184,107,0.25) 55%, transparent)", opacity: intensity }}
        />
        <div
          className="absolute top-[35%] left-[20%] h-[45%] w-[40%] animate-drift-c rounded-full blur-[90px]"
          style={{ background: "radial-gradient(closest-side, rgba(244,239,230,0.18), transparent)", opacity: intensity }}
        />
      </motion.div>

      {embers && <Embers className="absolute inset-0 size-full" />}

      <div className="grain" />
      {/* Vignette + floor fade into page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,6,5,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink-900" />
    </div>
  );
}

/** Lightweight static variant for cards & media placeholders (no JS). */
export function Atmosphere({
  tone = "glory",
  className,
  children,
}: {
  tone?: "glory" | "ember" | "dusk" | "dawn";
  className?: string;
  children?: React.ReactNode;
}) {
  const palettes = {
    glory: ["rgba(247,227,184,0.6)", "rgba(176,122,44,0.55)", "rgba(246,70,72,0.15)"],
    ember: ["rgba(255,107,109,0.45)", "rgba(176,122,44,0.45)", "rgba(247,227,184,0.25)"],
    dusk: ["rgba(232,184,107,0.35)", "rgba(90,60,120,0.35)", "rgba(246,70,72,0.2)"],
    dawn: ["rgba(255,255,255,0.55)", "rgba(240,207,140,0.55)", "rgba(214,156,69,0.35)"],
  }[tone];

  return (
    <div className={cn("relative isolate overflow-hidden bg-ink-950", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/4 left-1/4 h-[90%] w-[80%] animate-drift-a rounded-full blur-[70px]" style={{ background: `radial-gradient(closest-side, ${palettes[0]}, transparent)` }} />
        <div className="absolute bottom-[-30%] left-[-20%] h-[90%] w-[70%] animate-drift-b rounded-full blur-[80px]" style={{ background: `radial-gradient(closest-side, ${palettes[1]}, transparent)` }} />
        <div className="absolute top-[10%] right-[-25%] h-[80%] w-[60%] animate-drift-c rounded-full blur-[80px]" style={{ background: `radial-gradient(closest-side, ${palettes[2]}, transparent)` }} />
        <div className="grain" />
      </div>
      {children}
    </div>
  );
}
