"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { GloryCloud } from "@/components/motion/glory-cloud";
import { SplitHeadline } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { ServiceCountdown } from "@/components/site/service-countdown";
import { YouTubeIcon } from "@/components/site/social-icons";
import { church, media } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-bone-50">
      <motion.div style={{ scale }} className="absolute inset-0 -z-10">
        <GloryCloud video={media.heroVideo} poster={media.heroPoster} />
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-x flex flex-1 flex-col justify-end pt-36 pb-10 md:pb-14">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="eyebrow mb-8 flex items-center gap-3 text-glory-200"
            >
              <span className="h-px w-10 bg-glory-300/70" />
              {church.alias} · Egbeda, Lagos
            </motion.p>

            <SplitHeadline
              delay={0.3}
              className="text-display text-[clamp(3.6rem,10.5vw,10.5rem)] text-bone-50"
              lines={[
                { text: "Raising Kingdom" },
                { text: "Builders for" },
                { text: "God’s Glory.", em: true, className: "text-glory pr-[0.08em]" },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-bone-100/75 md:text-xl"
            >
              A family of joyful believers who love God deeply, praise passionately, and raise visionary kingdom leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild variant="glory" size="xl">
                  <Link href="/visit">
                    Plan your visit
                    <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="glass" size="xl">
                <Link href="/watch">
                  <YouTubeIcon className="size-5 text-ember-400" />
                  Watch online
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 1.2, ease: EASE }}
            className="lg:col-span-4"
          >
            <ServiceCountdown />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-14 hidden items-center justify-between border-t border-white/10 pt-6 text-xs text-bone-100/45 md:flex"
        >
          <span className="eyebrow !text-[0.62rem]">Est. {church.foundedLabel}</span>
          <span className="flex items-center gap-2 eyebrow !text-[0.62rem]">
            <ArrowDown className="size-3.5 animate-bounce" /> Scroll to explore
          </span>
          <span className="eyebrow !text-[0.62rem]">1 Cor 2:9 — Unseen Heights</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
