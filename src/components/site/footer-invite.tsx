"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Chip } from "./section-intro";
import { media, stock } from "@/lib/site";

const photos = [stock.choir.src, media.worship, stock.worshipService.src, media.prayer, media.thanksgiving].filter(Boolean) as string[];
const tilt = [-10, -4, 2, 7, 12];

/** The top of the footer: the closing invitation, with a hand of photos that fans open on hover. */
export function FooterInvite() {
  const reduce = useReducedMotion();
  return (
    <div className="container-x pt-14 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <motion.div className="lg:col-span-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <Chip onDark>Every Sunday at 9am</Chip>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.015em]">Come worship with us.</h2>
          <p className="mt-4 max-w-md text-white/65">At the Glory Tent in Egbeda, or online wherever you are. There’s a seat with your name on it.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/visit" className="group inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 font-semibold text-night transition-colors hover:bg-white">
              Plan your visit <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link href="/sermons" className="inline-flex h-12 items-center rounded-full px-6 font-semibold ring-1 ring-white/20 transition-colors hover:ring-white/50">Watch a sermon</Link>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="group/fan relative mx-auto h-[15rem] w-full max-w-[34rem] lg:col-span-6"
          initial="rest"
          whileInView="in"
          whileHover="open"
          viewport={{ once: true, margin: "-10%" }}
        >
          {photos.map((src, i) => {
            const mid = (photos.length - 1) / 2;
            const o = i - mid;
            return (
              <motion.span
                key={src + i}
                className="absolute bottom-0 left-1/2 block w-[9.5rem] origin-bottom rounded-[10px] bg-[#f7f2ea] p-1.5 pb-6 shadow-[0_24px_40px_-18px_rgba(0,0,0,0.8)] md:w-[11rem]"
                style={{ zIndex: 10 - Math.abs(o) }}
                variants={{
                  rest: { x: "-50%", rotate: 0, y: 40, opacity: 0 },
                  in: { x: `calc(-50% + ${o * 3.2}rem)`, rotate: tilt[i], y: Math.abs(o) * 8, opacity: 1, transition: { duration: reduce ? 0 : 0.9, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] } },
                  open: { x: `calc(-50% + ${o * 5.6}rem)`, rotate: tilt[i] * 1.25, y: Math.abs(o) * 14 - 10, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 20 } },
                }}
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-sand">
                  <Image src={src} alt="" fill sizes="180px" className="object-cover" />
                </span>
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
