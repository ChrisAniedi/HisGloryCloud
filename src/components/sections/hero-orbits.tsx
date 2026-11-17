"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Globe2, HandHeart, Music2 } from "lucide-react";
import { church, media } from "@/lib/site";
import { cn } from "@/lib/utils";

export type HeroTheme = "dark" | "light";

// Ring radii as a share of the half-width of the orbit field.
const RINGS = [0.4, 0.56, 0.72, 0.88];

type Item =
  | { kind: "photo"; src: string; ring: number; angle: number; size: number; position?: string }
  | { kind: "pastor"; src: string; ring: number; angle: number }
  | { kind: "icon"; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; tone: "red" | "plain"; ring: number; angle: number; label: string };

const items: Item[] = [
  // left: kept clear of the words and the card stack
  ...(media.worship ? [{ kind: "photo" as const, src: media.worship, ring: 3, angle: 214, size: 70, position: "45% 30%" }] : []),
  { kind: "photo", src: "/media/face-3.jpg", ring: 2, angle: 194, size: 62 },
  { kind: "icon", Icon: BookOpen, tone: "red", ring: 2, angle: 163, label: "The Word" },
  { kind: "icon", Icon: Music2, tone: "plain", ring: 1, angle: 137, label: "Worship" },
  { kind: "photo", src: "/media/face-2.jpg", ring: 3, angle: 150, size: 58 },
  // right
  ...(media.thanksgiving ? [{ kind: "photo" as const, src: media.thanksgiving, ring: 3, angle: -34, size: 66, position: "50% 25%" }] : []),
  { kind: "photo", src: "/media/face-4.jpg", ring: 2, angle: -12, size: 62 },
  { kind: "icon", Icon: Globe2, tone: "plain", ring: 2, angle: 19, label: "Outreach" },
  { kind: "icon", Icon: HandHeart, tone: "red", ring: 1, angle: 43, label: "Prayer" },
  ...(media.prayer ? [{ kind: "photo" as const, src: media.prayer, ring: 3, angle: 32, size: 56, position: "55% 35%" }] : []),
];

function place(ring: number, angle: number) {
  const r = RINGS[ring] * 50; // % of the field
  const a = (angle * Math.PI) / 180;
  return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` };
}

/**
 * Rings spreading out from the headline like ripples of glory, with the congregation and the
 * life of the church floating on them (a `pastor` item is supported; see media.pastor). A ripple rolls outward every few seconds, a dashed
 * ring turns slowly, and a short arc of light travels two of the rings.
 */
export function HeroOrbits({ theme }: { theme: HeroTheme }) {
  const reduce = useReducedMotion();
  const dark = theme === "dark";
  const line = dark ? "rgba(243,233,215,0.13)" : "rgba(35,29,23,0.09)";
  const arc = dark ? "#f06a5b" : "#a8231c";
  const shadow = dark ? "shadow-[0_14px_36px_-14px_rgba(0,0,0,0.8)]" : "shadow-[0_12px_30px_-12px_rgba(35,29,23,0.35)]";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[42%] left-1/2 -z-10 aspect-square w-[max(1100px,min(1640px,150vw))] -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,#000_52%,transparent_82%)]"
    >
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full overflow-visible">
        {RINGS.map((r, i) => (
          <motion.circle
            key={r}
            cx="500"
            cy="500"
            r={r * 500}
            fill="none"
            stroke={line}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: "500px 500px" }}
            transition={{ duration: 1.6, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {/* ripples rolling outward from the words */}
        {!reduce &&
          [0, 1].map((n) => (
            <motion.circle
              key={`ripple-${n}`}
              cx="500"
              cy="500"
              fill="none"
              stroke={dark ? "rgba(243,214,160,0.55)" : "rgba(168,35,28,0.35)"}
              strokeWidth="1.4"
              initial={{ r: 150, opacity: 0 }}
              animate={{ r: [150, 470], opacity: [0, 0.9, 0] }}
              transition={{ duration: 6, delay: 1.6 + n * 3, repeat: Infinity, repeatDelay: 0, ease: "easeOut", times: [0, 0.15, 1] }}
            />
          ))}
      </svg>

      {/* a dashed ring, turning slowly */}
      <svg viewBox="0 0 1000 1000" className={cn("absolute inset-0 size-full", !reduce && "orbit-turn-rev")}>
        <circle cx="500" cy="500" r={0.64 * 500} fill="none" stroke={line} strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round" />
      </svg>

      {/* arcs of light */}
      {[
        { ring: 1, len: 0.16, dur: "52s", start: 0 },
        { ring: 3, len: 0.1, dur: "70s", start: 180 },
      ].map((a) => {
        const r = RINGS[a.ring] * 500;
        const c = 2 * Math.PI * r;
        return (
          <svg key={a.ring} viewBox="0 0 1000 1000" className={cn("absolute inset-0 size-full", !reduce && "orbit-turn")} style={{ animationDuration: a.dur, rotate: `${a.start}deg` }}>
            <circle cx="500" cy="500" r={r} fill="none" stroke={arc} strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round" strokeDasharray={`${c * a.len} ${c}`} />
          </svg>
        );
      })}

      {items.map((it, i) => {
        const pos = place(it.ring, it.angle);
        const delay = 0.6 + i * 0.07;
        return (
          <motion.div key={i} className="absolute hidden md:block" style={pos} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
            <div className={cn(!reduce && "orbit-bob")} style={{ animationDuration: `${5 + (i % 4) * 1.2}s`, animationDelay: `${-i * 0.8}s` }}>
              {it.kind === "photo" ? (
                <span className={cn("relative block overflow-hidden rounded-full p-1", shadow, dark ? "bg-white/10 ring-1 ring-white/15" : "bg-white ring-1 ring-line")} style={{ width: it.size, height: it.size }}>
                  <span className="relative block size-full overflow-hidden rounded-full">
                    <Image src={it.src} alt="" fill sizes="80px" className="object-cover" style={{ objectPosition: it.position }} />
                  </span>
                </span>
              ) : it.kind === "pastor" ? (
                <span className="flex flex-col items-center gap-2">
                  <span className={cn("relative block size-[96px] rounded-full p-1.5", shadow, dark ? "bg-cream/90" : "bg-white ring-1 ring-line")}>
                    <span className="relative block size-full overflow-hidden rounded-full">
                      <Image src={it.src} alt="" fill sizes="96px" className="object-cover" />
                    </span>
                    <span className={cn("absolute -inset-2 rounded-full border", dark ? "border-cream/30" : "border-red/25")} />
                  </span>
                  <span className={cn("rounded-full px-3 py-1 text-center text-xs leading-tight whitespace-nowrap", shadow, dark ? "bg-white/[0.08] text-white ring-1 ring-white/15 backdrop-blur" : "bg-white text-ink ring-1 ring-line")}>
                    <span className="block font-semibold">{church.leader.name}</span>
                    <span className={dark ? "text-white/60" : "text-muted"}>{church.leader.role}</span>
                  </span>
                </span>
              ) : (
                <span className={cn("flex items-center gap-2 rounded-full py-2 pr-4 pl-2", shadow, dark ? "bg-white/[0.07] ring-1 ring-white/15 backdrop-blur" : "bg-white ring-1 ring-line")}>
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full",
                      dark ? "bg-white/10" : "bg-paper",
                      it.tone === "red" ? (dark ? "text-glow" : "text-red") : dark ? "text-cream" : "text-ink"
                    )}
                  >
                    <it.Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className={cn("text-sm font-medium whitespace-nowrap", dark ? "text-white/90" : "text-ink")}>{it.label}</span>
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
