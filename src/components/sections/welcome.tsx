"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";

export type WelcomeCard = { label: string; title: string; href: string; image: string; position?: string; external?: boolean };

function Card({ c, i }: { c: WelcomeCard; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  return (
    <Reveal delay={i * 0.1} y={40}>
      <Link
        ref={ref}
        href={c.href}
        {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group relative block aspect-[4/5] overflow-hidden rounded-[26px] bg-night text-white"
      >
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          <Image src={c.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: c.position }} />
        </motion.div>
        <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/60" />
        <span className="absolute top-6 left-6">
          <span className="block text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">{c.label}</span>
          <span className="mt-1 block text-[1.9rem] leading-tight font-medium tracking-[-0.03em]">{c.title}</span>
        </span>
        <span className="absolute right-6 bottom-6 grid size-12 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-night">
          <ArrowUpRight className="size-5" />
        </span>
      </Link>
    </Reveal>
  );
}

/** "Welcome home": three ways in, as tall photo cards that settle into place as you scroll. */
export function Welcome({ cards }: { cards: WelcomeCard[] }) {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Chip>Welcome to the Glory Tent</Chip>
            <h2 className="mt-5 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">Welcome home.</h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-lg text-muted">Dive into the Word, our services and our community. Your journey of faith can begin, or begin again, right here.</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Card key={c.href} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
