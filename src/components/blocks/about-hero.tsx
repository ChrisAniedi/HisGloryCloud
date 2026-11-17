"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Globe2, HeartHandshake, Sparkles } from "lucide-react";
import { Chip } from "@/components/site/section-intro";
import { LogoMark } from "@/components/site/logo";
import { media } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

// Places the church plans to reach, pinned on the dome (x, y as % of a 1000×500 box).
const pins = [
  { label: "America", x: 17, y: 70, src: "/media/face-2.jpg" },
  { label: "Africa", x: 33, y: 42, src: media.thanksgiving ?? "/media/face-3.jpg" },
  { label: "Lagos", x: 50, y: 24, src: media.prayer ?? "/media/face-4.jpg", home: true },
  { label: "Europe", x: 67, y: 42, src: "/media/face-3.jpg" },
  { label: "The ends of the earth", x: 83, y: 70, src: "/media/face-4.jpg" },
];
const PATH = "M170 350 C 230 260, 260 230, 330 210 C 400 190, 440 130, 500 120 C 560 130, 600 190, 670 210 C 740 230, 770 260, 830 350";

/** About opener: a big line, three tags, and a dome with the places we plan to reach, joined by a dashed path. */
export function AboutHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,165,150,0.25),transparent)]" />
      <div className="container-x text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <Chip>About us</Chip>
        </motion.div>
        <h1 className="mx-auto mt-6 max-w-5xl text-[clamp(3rem,7.6vw,6.75rem)] leading-[0.95] font-medium tracking-[-0.05em]">
          {["One family.", "Every nation.", "His glory."].map((l, i) => (
            <motion.span key={l} className={`block ${i === 2 ? "text-red" : ""}`} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}>
              {l}
            </motion.span>
          ))}
        </h1>
        <motion.p className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          Spreading the gospel of our Lord Jesus around the world, with signs, wonders and the power of God as of old, from the Glory Tent in Lagos.
        </motion.p>
        <motion.ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}>
          <li className="flex items-center gap-1.5"><Sparkles className="size-4 text-red" /> Since 2013</li>
          <li className="flex items-center gap-1.5"><HeartHandshake className="size-4 text-red" /> One family</li>
          <li className="flex items-center gap-1.5"><Globe2 className="size-4 text-red" /> To all nations</li>
        </motion.ul>
      </div>

      {/* the dome */}
      <div className="relative mx-auto mt-14 aspect-[2/1] w-[min(1100px,calc(100%-2*var(--gutter)))] overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 aspect-square rounded-full bg-night [background-image:radial-gradient(rgba(243,233,215,0.14)_1px,transparent_1.6px)] [background-size:16px_16px]"
          initial={{ y: "18%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
        >
          <span className="absolute inset-[8%] rounded-full border border-dashed border-white/10" />
          <span className="absolute inset-[22%] rounded-full border border-white/[0.07]" />
          <span className="absolute top-[30%] left-1/2 -translate-x-1/2 opacity-20"><LogoMark onDark className="h-24" /></span>
        </motion.div>
        <svg aria-hidden viewBox="0 0 1000 500" className="absolute inset-0 size-full">
          <motion.path d={PATH} fill="none" stroke="rgba(243,233,215,0.55)" strokeWidth="1.6" strokeDasharray="5 7" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, ease: [0.65, 0, 0.35, 1] }} />
        </svg>
        {pins.map((p, i) => (
          <motion.div
            key={p.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.1 + i * 0.15, ease }}
          >
            <span className={`relative block overflow-hidden rounded-full ring-[3px] ${p.home ? "size-[clamp(3.5rem,7vw,5.5rem)] ring-cream" : "size-[clamp(2.75rem,5vw,4rem)] ring-white/80"}`}>
              <Image src={p.src} alt="" fill sizes="88px" className="object-cover" />
            </span>
            {p.home && <span className="absolute -inset-2 animate-ping rounded-full border border-cream/40 [animation-duration:2.8s]" />}
            <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-night shadow md:text-xs">{p.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
