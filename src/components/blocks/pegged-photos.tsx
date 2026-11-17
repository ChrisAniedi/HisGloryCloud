"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/** Photos hung on a string with pegs, swaying gently. */
export function PeggedPhotos({ photos }: { photos: { src: string; position?: string }[] }) {
  const reduce = useReducedMotion();
  const tilt = [-7, 5, -3, 6, -5];
  const drop = [10, 34, 46, 30, 8];
  return (
    <div aria-hidden className="relative mx-auto h-[clamp(15rem,26vw,22rem)] w-full max-w-6xl">
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-24 w-full">
        <motion.path d="M-10 10 Q 500 120 1010 10" fill="none" stroke="#3a322a" strokeWidth="1.5" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }} />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-around px-[3%]">
        {photos.slice(0, 5).map((p, i) => (
          <motion.div
            key={p.src + i}
            className="relative w-[18%] origin-top"
            style={{ marginTop: drop[i] }}
            initial={{ opacity: 0, y: -40, rotate: 0 }}
            animate={reduce ? { opacity: 1, y: 0, rotate: tilt[i] } : { opacity: 1, y: 0, rotate: [tilt[i], tilt[i] * -0.4, tilt[i]] }}
            transition={reduce ? { duration: 0.6 } : { opacity: { duration: 0.6, delay: 0.6 + i * 0.12 }, y: { duration: 0.8, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }, rotate: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
          >
            <span className="absolute -top-3 left-1/2 z-10 h-7 w-3.5 -translate-x-1/2 rounded-[3px] bg-[#c9932f] shadow" />
            <span className="block rounded-[8px] bg-[#fbf7f0] p-2 pb-7 shadow-[0_20px_40px_-18px_rgba(35,29,23,0.55)]">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px] bg-sand">
                <Image src={p.src} alt="" fill sizes="220px" className="object-cover" style={{ objectPosition: p.position }} />
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
