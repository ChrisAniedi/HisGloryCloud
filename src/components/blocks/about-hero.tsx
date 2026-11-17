"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { Globe2, HeartHandshake, Sparkles } from "lucide-react";
import { Chip } from "@/components/site/section-intro";
import { media } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;
const W = 1000;
const H = 470;
const CX = 500;
const CY = 520; // the globe's centre sits below the box, so only its top shows
const R = 470;

// Places the church plans to reach, on the globe (x, y in the 1000×470 box).
const pins = [
  { label: "America", x: 150, y: 330, src: "/media/face-2.jpg" },
  { label: "Europe", x: 330, y: 170, src: "/media/face-3.jpg" },
  { label: "Lagos", x: 500, y: 110, src: media.prayer ?? "/media/face-4.jpg", home: true },
  { label: "Africa", x: 670, y: 170, src: media.thanksgiving ?? "/media/face-3.jpg" },
  { label: "The ends of the earth", x: 850, y: 330, src: "/media/face-4.jpg" },
];
// arcs from Lagos to each place, lifted above the surface
const arcs = pins.filter((p) => !p.home).map((p) => `M500 110 Q ${(500 + p.x) / 2} ${Math.min(p.y, 110) - 70} ${p.x} ${p.y}`);

function Meridian({ i, t }: { i: number; t: MotionValue<number> }) {
  const rx = useTransform(t, (v) => Math.abs(Math.cos((i / 9) * Math.PI + v)) * R);
  return <motion.ellipse cx={CX} cy={CY} style={{ rx }} ry={R} fill="none" stroke="rgba(243,233,215,0.12)" strokeWidth="1" />;
}

/** A turning globe: meridians drawn as ellipses whose width follows the spin (motion values, no re-renders). */
function Globe() {
  const reduce = useReducedMotion();
  const t = useMotionValue(0.4);
  useAnimationFrame((time) => {
    if (!reduce) t.set(0.4 + time / 9000);
  });
  const lats = [0.22, 0.45, 0.66, 0.84];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <radialGradient id="globe-fill" cx="50%" cy="15%" r="85%">
          <stop offset="0" stopColor="#5a1c14" />
          <stop offset="0.55" stopColor="#2a130e" />
          <stop offset="1" stopColor="#14100d" />
        </radialGradient>
        <clipPath id="globe-clip"><circle cx={CX} cy={CY} r={R} /></clipPath>
        <pattern id="globe-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="rgba(243,233,215,0.16)" /></pattern>
      </defs>
      <circle cx={CX} cy={CY} r={R + 26} fill="none" stroke="rgba(240,106,91,0.18)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R} fill="url(#globe-fill)" />
      <g clipPath="url(#globe-clip)">
        <rect width={W} height={H} fill="url(#globe-dots)" />
        {Array.from({ length: 9 }, (_, i) => (
          <Meridian key={i} i={i} t={t} />
        ))}
        {lats.map((f) => {
          const y = CY - R * f;
          const half = Math.sqrt(R * R - (CY - y) ** 2);
          return <ellipse key={f} cx={CX} cy={y} rx={half} ry={half * 0.12} fill="none" stroke="rgba(243,233,215,0.1)" strokeWidth="1" />;
        })}
      </g>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(243,233,215,0.25)" strokeWidth="1.2" />
      {arcs.map((d, i) => (
        <g key={d}>
          <motion.path d={d} fill="none" stroke="rgba(243,233,215,0.6)" strokeWidth="1.4" strokeDasharray="4 6" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 1.2 + i * 0.15, ease: [0.65, 0, 0.35, 1] }} />
          {!reduce && (
            <circle r="4" fill="#f06a5b">
              <animateMotion dur={`${3.6 + i * 0.5}s`} begin={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

/** About opener: dark, a big line, three tags, and a turning globe with the places HGC plans to reach. */
export function AboutHero() {
  return (
    <section data-nav="dark" className="px-2 pt-2 md:px-3 md:pt-3">
      <div className="relative overflow-hidden rounded-[24px] bg-night pt-32 text-white md:rounded-[28px] md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,106,91,0.2),transparent)]" />
        <div className="container-x relative text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <Chip onDark>About us</Chip>
          </motion.div>
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.8rem,6.6vw,5.75rem)] leading-[0.98] tracking-[-0.015em]">
            {["One family.", "Every nation.", "His glory."].map((l, i) => (
              <motion.span key={l} className={`block ${i === 2 ? "text-glow" : ""}`} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}>
                {l}
              </motion.span>
            ))}
          </h1>
          <motion.p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Spreading the gospel of our Lord Jesus around the world, with signs, wonders and the power of God as of old, from the Glory Tent in Lagos.
          </motion.p>
          <motion.ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}>
            <li className="flex items-center gap-1.5"><Sparkles className="size-4 text-glow" /> Since 2013</li>
            <li className="flex items-center gap-1.5"><HeartHandshake className="size-4 text-glow" /> One family</li>
            <li className="flex items-center gap-1.5"><Globe2 className="size-4 text-glow" /> To all nations</li>
          </motion.ul>
        </div>

        <motion.div className="relative mx-auto mt-12 aspect-[1000/470] w-[min(1100px,calc(100%-2*var(--gutter)))]" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, delay: 0.3, ease }}>
          <Globe />
          {pins.map((p, i) => (
            <motion.div
              key={p.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 + i * 0.12, ease }}
            >
              <span className="relative">
                {p.home && <span className="absolute -inset-2 animate-ping rounded-full border border-cream/50 [animation-duration:2.6s]" />}
                <span className={`relative block overflow-hidden rounded-full ring-[3px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] ${p.home ? "size-[clamp(3.25rem,7vw,5.25rem)] ring-cream" : "size-[clamp(2.5rem,4.6vw,3.75rem)] ring-white/80"}`}>
                  <Image src={p.src} alt="" fill sizes="84px" className="object-cover" />
                </span>
              </span>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[0.65rem] font-semibold whitespace-nowrap text-night shadow md:text-xs">{p.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
