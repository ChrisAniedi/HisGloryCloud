"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Chip } from "@/components/site/section-intro";
import { media, stock } from "@/lib/site";

const photos = [
  { src: stock.choir.src, pos: "50% 30%" },
  { src: media.worship, pos: "50% 25%" },
  { src: stock.worshipService.src, pos: "50% 40%" },
  { src: media.prayer, pos: "55% 35%" },
  { src: stock.drummers.src, pos: "50% 45%" },
  { src: media.thanksgiving, pos: "50% 25%" },
  { src: stock.babyDedication.src, pos: "50% 30%" },
].filter((p): p is { src: string; pos: string } => !!p.src);

const tilt = [-9, 5, -4, 7, -6, 4, -8];
const lift = [26, 6, 30, 0, 22, 8, 32];

function Polaroid({ p, i, count, spread }: { p: { src: string; pos: string }; i: number; count: number; spread: MotionValue<number> }) {
  const offset = i - (count - 1) / 2;
  const x = useTransform(spread, (s) => `${offset * 74 * s}%`);
  const y = lift[i % lift.length];
  return (
    <motion.div
      className="absolute bottom-[-1.5rem] w-[clamp(9rem,17vw,15rem)] rounded-[10px] bg-[#f7f2ea] p-2 pb-8 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.75)]"
      style={{ x, rotate: tilt[i % tilt.length], zIndex: 10 - Math.abs(Math.round(offset)) }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: 0.1 + Math.abs(offset) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: y - 18, rotate: 0, zIndex: 20 }}
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[6px] bg-sand">
        <Image src={p.src} alt="" fill sizes="240px" className="object-cover grayscale-[35%]" style={{ objectPosition: p.pos }} />
      </span>
    </motion.div>
  );
}

/** The closing invitation before the footer: a big line and a fan of photos that spreads as it comes into view. */
export function ClosingBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const spread = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.72, 1]);

  return (
    <section ref={ref} data-nav="dark" className="px-2 md:px-3">
      <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(70%_80%_at_50%_0%,#5a1610_0%,#2a0f0c_55%,#14100d_100%)] pt-[clamp(4.5rem,9vw,7rem)] text-center text-white md:rounded-[28px]">
        <div className="container-x">
          <Chip onDark>Every Sunday at 9am</Chip>
          <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,8vw,7rem)] leading-[0.92] font-medium tracking-[-0.05em]">Come worship with us.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">Raising Kingdom builders for God’s glory, at the Glory Tent in Egbeda and online wherever you are.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/visit" className="group inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 font-semibold text-night transition-colors hover:bg-white">
              Plan your visit <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link href="/sermons" className="inline-flex h-12 items-center rounded-full px-6 font-semibold ring-1 ring-white/25 transition-colors hover:ring-white/60">
              Watch a sermon
            </Link>
          </div>
        </div>

        <div aria-hidden className="relative mx-auto mt-14 flex h-[clamp(12rem,24vw,19rem)] max-w-[100rem] items-end justify-center">
          {photos.map((p, i) => (
            <Polaroid key={p.src + i} p={p} i={i} count={photos.length} spread={spread} />
          ))}
        </div>
      </div>
    </section>
  );
}
