"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Chip } from "./section-intro";
import { LogoMark } from "./logo";
import type { Photo } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Inner page header: breadcrumb, chip, title and intro on the left; a photo on the right that
 * eases in and drifts as you scroll, with a small "Sundays at the Glory Tent" tag and the photo credit.
 */
export function PageHero({
  kicker,
  title,
  intro,
  crumb,
  image,
  children,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumb?: string;
  image?: Photo | null;
  children?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden border-b border-line pt-32 pb-14 md:pt-40 md:pb-20", className)}>
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,165,150,0.22),transparent)]" />
      <div className={cn("container-x grid gap-12", image && "lg:grid-cols-12 lg:items-center lg:gap-16")}>
        <motion.div
          className={cn(image ? "lg:col-span-6" : "mx-auto max-w-3xl text-center")}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease }}
        >
          <nav aria-label="Breadcrumb" className={cn("mb-6 flex items-center gap-1.5 text-sm text-muted", !image && "justify-center")}>
            <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span aria-current="page">{crumb ?? kicker}</span>
          </nav>
          <Chip>{kicker}</Chip>
          <h1 className="mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] leading-[1] font-display tracking-[-0.015em]">{title}</h1>
          {intro && <div className={cn("mt-6 max-w-xl text-lg text-muted md:text-xl", !image && "mx-auto")}>{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>

        {image && (
          <motion.figure className="lg:col-span-6" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.15, ease }}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-sand shadow-[0_40px_80px_-40px_rgba(35,29,23,0.45)]">
              <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y }}>
                <Image src={image.src} alt={image.alt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: image.position }} />
              </motion.div>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full bg-white/90 py-1.5 pr-4 pl-1.5 text-sm font-medium text-ink shadow-lg backdrop-blur">
                <span className="grid size-8 place-items-center rounded-full bg-paper"><LogoMark className="h-5" /></span>
                Sundays 9am · Glory Tent
              </span>
            </div>
            {image.credit && (
              <figcaption className="mt-2.5 text-right text-xs text-muted">
                Photo:{" "}
                {image.creditHref ? (
                  <a href={image.creditHref} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">{image.credit}</a>
                ) : (
                  image.credit
                )}
              </figcaption>
            )}
          </motion.figure>
        )}
      </div>
    </section>
  );
}
