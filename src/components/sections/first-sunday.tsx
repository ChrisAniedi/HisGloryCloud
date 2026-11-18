"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, DoorOpen, HandHeart, Music2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";

const steps = [
  { Icon: DoorOpen, time: "From 8:45am", title: "Arrive and be welcomed", body: "Our Greeters and Ushers meet you at the door of the Glory Tent and help you find a seat. Come as you are." },
  { Icon: Music2, time: "9am – 12pm", title: "Worship and the Word", body: "Praise and worship, the Word preached with fire, and prayer. Three hours that pass more quickly than you’d think." },
  { Icon: HandHeart, time: "After the service", title: "Say hello", body: "Let a greeter know it’s your first time. If you’d like prayer or a chat with a pastor, just ask." },
];

/** What a first Sunday is like, as three steps along a line that draws itself. */
export function FirstSunday({ cta = true, className = "section-y" }: { cta?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className={className}>
      <div className="container-x">
        <SectionIntro chip="Your first Sunday" title="Never been before? Here’s what to expect" body="No dress code, nothing to sign up for. Just come, and we’ll take care of the rest." />

        <div className="relative mt-14">
          <motion.span
            aria-hidden
            className="absolute top-7 right-[16%] left-[16%] hidden h-px origin-left bg-[repeating-linear-gradient(90deg,var(--color-red)_0_6px,transparent_6px_12px)] opacity-50 md:block"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(({ Icon, ...s }, i) => (
              <Reveal as="li" key={s.title} delay={0.2 + i * 0.15} className="relative flex flex-col items-center text-center">
                <span className="relative grid size-14 place-items-center rounded-full bg-white text-red shadow-[0_12px_30px_-14px_rgba(35,29,23,0.45)] ring-1 ring-line">
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
                <span className="mt-5 rounded-full bg-red-soft px-3 py-1 text-xs font-semibold text-red">{s.time}</span>
                <h3 className="mt-3 text-[1.45rem] font-medium tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-2 max-w-xs text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {cta && (
        <Reveal delay={0.4} className="mt-12 flex justify-center">
          <Link href="/visit" className="group inline-flex h-12 items-center gap-2 rounded-full bg-night px-6 font-semibold text-white transition-colors hover:bg-red">
            Plan your visit <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </Link>
        </Reveal>
        )}
      </div>
    </section>
  );
}
