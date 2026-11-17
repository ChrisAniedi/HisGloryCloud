"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { HeroOrbits, type HeroTheme } from "./hero-orbits";
import { HeroHeadline } from "./hero-headline";
import { HeroStack } from "./hero-stack";
import { LogoMark } from "@/components/site/logo";
import { church, coreValues } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function Rise({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay, ease }}>
      {children}
    </motion.div>
  );
}

/**
 * The opener. The tagline in the middle, rings spreading out from it with the pastor, the
 * congregation and the life of the church floating on them, and three real things to act on
 * stacked underneath. The church's core values close it. `theme` switches dark and light.
 */
export function HeroView({ latest, theme = "light" }: { latest: { title: string; url: string; thumb: string } | null; theme?: HeroTheme }) {
  const dark = theme === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark
          ? "bg-[radial-gradient(60%_55%_at_50%_38%,#33231a_0%,#1d1612_45%,#14100d_100%)] text-white"
          : "bg-[radial-gradient(70%_60%_at_50%_40%,#ffffff_0%,#fbf8f3_45%,var(--color-paper)_100%)] text-ink"
      )}
    >
      <HeroOrbits theme={theme} />
      {dark && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(40%_60%_at_50%_0%,rgba(240,106,91,0.14),transparent)]" />}

      <div className="container-x relative flex min-h-[max(100svh,760px)] flex-col items-center pt-32 text-center md:pt-40">
        <Rise delay={0.15}>
          <p
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm",
              dark ? "bg-white/[0.07] text-white/65 ring-1 ring-white/15 backdrop-blur" : "bg-white text-muted shadow-[0_8px_24px_-14px_rgba(35,29,23,0.4)] ring-1 ring-line"
            )}
          >
            <span className={cn("grid size-7 place-items-center rounded-full", dark ? "bg-cream" : "bg-paper")}>
              <LogoMark className="h-5" />
            </span>
            <span className={cn("font-medium", dark ? "text-white" : "text-ink")}>{church.alias}</span>
            <span className={dark ? "text-white/25" : "text-line"}>|</span>
            Egbeda, Lagos · Since {church.founded.slice(0, 4)}
          </p>
        </Rise>

        <HeroHeadline dark={dark} />

        <Rise delay={0.9}>
          <p className={cn("mx-auto mt-6 max-w-[34rem] text-lg leading-relaxed md:text-xl", dark ? "text-white/70" : "text-muted")}>
            A family of joyful believers who love God deeply and praise Him passionately. Come as you are.
          </p>
        </Rise>

        <Rise delay={1} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/visit"
            className={cn(
              "group inline-flex h-13 items-center gap-2 rounded-full px-6 font-semibold transition-colors",
              dark ? "bg-cream text-night hover:bg-white" : "bg-night text-white hover:bg-red"
            )}
          >
            Plan your visit <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </Link>
          <Link
            href="/watch"
            className={cn(
              "inline-flex h-13 items-center gap-2 rounded-full px-6 font-semibold transition-colors",
              dark ? "bg-white/[0.07] text-white ring-1 ring-white/20 hover:ring-white/50" : "bg-white text-ink ring-1 ring-line hover:ring-ink/30"
            )}
          >
            <Play className="size-4 fill-current" /> Watch online
          </Link>
        </Rise>

        <Rise delay={1.2} className="mt-11 w-full">
          <HeroStack latest={latest} dark={dark} />
        </Rise>

        <Rise delay={1.4} className="mt-auto w-full pt-10 pb-8">
          <p className={cn("text-sm", dark ? "text-white/45" : "text-muted")}>What our hands are given to</p>
          <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3 md:justify-between">
            {coreValues.map((v) => (
              <li
                key={v.title}
                className={cn(
                  "text-[1.35rem] font-medium tracking-[-0.03em] transition-colors md:text-[1.6rem]",
                  dark ? "text-white/30 hover:text-cream" : "text-ink/35 hover:text-ink"
                )}
              >
                {v.title}
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </section>
  );
}
