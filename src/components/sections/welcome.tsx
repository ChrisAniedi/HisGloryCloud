"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { cn } from "@/lib/utils";

export type WelcomeCard = {
  label: string;
  title: string;
  body: string;
  badge: string;
  info: string;
  cta: string;
  href: string;
  image: string;
  position?: string;
  external?: boolean;
  credit?: string;
};

function Card({ c, i, n, progress }: { c: WelcomeCard; i: number; n: number; progress?: MotionValue<number> }) {
  const zero = useScroll().scrollYProgress;
  const p = progress ?? zero;
  // each card's photo settles as the row passes it
  const scale = useTransform(p, [Math.max(0, (i - 1) / n), (i + 1) / n], progress ? [1.16, 1] : [1, 1]);
  return (
    <Link
      href={c.href}
      {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group relative isolate flex h-[min(31rem,64svh)] w-[min(80vw,23rem)] shrink-0 flex-col justify-between overflow-hidden rounded-[26px] bg-night p-3 text-white lg:w-[max(23rem,27vw)] lg:max-w-[27rem]"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <Image src={c.image} alt="" fill sizes="(min-width:1024px) 27vw, 80vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]" style={{ objectPosition: c.position }} />
      </motion.div>
      <span className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,16,13,0.35)_0%,transparent_30%,transparent_50%,rgba(20,16,13,0.55)_100%)]" />

      <div className="flex items-start justify-between gap-3 p-2">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/25 backdrop-blur-md">{c.badge}</span>
        <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-red group-hover:text-white">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* the frosted panel the words sit on */}
      <div className="rounded-[20px] border border-white/25 bg-[linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150 transition-transform duration-500 group-hover:-translate-y-1">
        <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-white/75 uppercase">{c.label}</span>
        <h3 className="mt-1 font-display text-[clamp(1.6rem,2.2vw,2rem)] leading-none">{c.title}</h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/85">{c.body}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-white/20 pt-3.5 text-sm">
          <span className="min-w-0 flex-1 truncate text-white/75">{c.info}</span>
          <span className="shrink-0 font-semibold underline-offset-4 group-hover:underline">{c.cta}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * "Find your place": four ways in, on a row that moves sideways as you scroll down (pinned on
 * large screens), each card's photo settling as it passes. A swipeable row on small screens.
 */
export function Welcome({ cards }: { cards: WelcomeCard[] }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      setWide(lg);
      const t = track.current;
      if (t) setTravel(Math.max(0, t.scrollWidth - t.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const pinned = wide && !reduce && travel > 0;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -travel]);
  const bar = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative" style={pinned ? { height: `calc(100svh + ${travel * 1.6}px)` } : undefined}>
      <div className={cn("flex flex-col justify-center overflow-hidden py-[clamp(3rem,6vw,4.5rem)]", pinned && "sticky top-0 h-svh py-0")}>
        <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Chip>Start here</Chip>
            <h2 className="heading-1 mt-5">Find your place.</h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-md">
            <p className="text-lg text-muted">Get to know the family, join us on Sunday, or worship with us online. Your journey of faith can begin, or begin again, right here.</p>
          </Reveal>
        </div>

        <motion.div
          ref={track}
          className={cn("mt-10 flex gap-4", pinned ? "" : "snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:snap-start")}
          style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)", x: pinned ? x : 0 }}
        >
          {cards.map((c, i) => (
            <Card key={c.href} c={c} i={i} n={cards.length} progress={pinned ? scrollYProgress : undefined} />
          ))}
        </motion.div>

        <div className="container-x mt-8 flex items-center gap-4 text-sm text-muted">
          <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-line">
            <motion.span className="absolute inset-y-0 left-0 rounded-full bg-red" style={{ width: pinned ? bar : "100%" }} />
          </span>
          <span>{pinned ? "Keep scrolling to browse" : "Swipe to browse"}</span>
        </div>
        {cards.some((c) => c.credit) && (
          <p className="container-x mt-2 text-right text-xs text-muted">
            {cards.filter((c) => c.credit).map((c) => `${c.title} photo: ${c.credit}`).join(" · ")}
          </p>
        )}
      </div>
    </section>
  );
}
