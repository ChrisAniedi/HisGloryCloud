"use client";

import { ArrowUpRight, CalendarDays, Clock, Navigation } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { HeroBackdrop } from "@/components/motion/hero-backdrop";
import { Chip } from "@/components/site/section-intro";
import { LogoMark } from "@/components/site/logo";
import { FacebookIcon, YouTubeIcon } from "@/components/site/social-icons";
import { useServiceStatus } from "@/components/site/use-service-status";
import { church, gatherings, mapsUrl, socials } from "@/lib/site";

const Time = ({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <span
    className={
      dark
        ? "rounded-full bg-white/10 px-2.5 py-0.5 text-sm font-medium text-white"
        : "rounded-full bg-paper px-2.5 py-0.5 text-sm font-medium text-ink ring-1 ring-line"
    }
  >
    {children}
  </span>
);

/**
 * "Worship with us": the invitation and Psalm 95:6 on the left; in person and the livestream
 * (YouTube and Facebook) on the right. The livestream card lights up while a service is on.
 */
export function WorshipWithUs() {
  const status = useServiceStatus(30_000);
  const live = status?.status.state === "live";
  const sunday = gatherings.find((g) => g.id === "sunday") ?? gatherings[0];
  const midweek = gatherings.find((g) => g.id === "midweek") ?? gatherings[1];

  return (
    <section className="pt-[var(--section-gap)] pb-[clamp(1.5rem,3vw,2.5rem)]">
      <div className="container-x">
        <Reveal y={24}>
          <div className="relative isolate grid gap-10 overflow-hidden rounded-[32px] bg-sand p-5 ring-1 ring-line sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12 xl:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -left-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(240,150,130,0.28),transparent)]"
            />
          <HeroBackdrop panel />
            <LogoMark className="pointer-events-none absolute -bottom-16 left-[30%] -z-10 h-72 opacity-[0.05]" />
            <div className="px-1 pt-2 sm:px-0 sm:pt-0 lg:col-span-5">
              <Reveal>
                <Chip>Worship with us</Chip>
                <h2 className="heading-1 mt-5">Come as you are.</h2>
              </Reveal>
              <div className="mt-8 flex items-start gap-4">
                <Reveal y={10} className="shrink-0">
                  <span className="grid size-12 place-items-center rounded-full bg-white shadow-[0_10px_30px_-16px_rgba(35,29,23,0.4)] ring-1 ring-line">
                    <LogoMark className="h-8" />
                  </span>
                </Reveal>
                <blockquote>
                  <p className="font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug italic">
                    <RevealWords
                      text="“Oh come, let us worship and bow down; let us kneel before the Lord our Maker.”"
                      stagger={0.03}
                    />
                  </p>
                  <Reveal delay={0.3}>
                    <footer className="mt-3 text-sm font-semibold tracking-[0.14em] text-red uppercase">
                      Psalm 95:6
                    </footer>
                  </Reveal>
                </blockquote>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              <Reveal y={30}>
                <Tilt className="h-full rounded-[24px]" max={4}>
                  <div className="flex h-full flex-col rounded-[24px] bg-white p-6 ring-1 ring-line">
                    <p className="text-sm font-semibold tracking-[0.12em] text-red uppercase">
                      In person
                    </p>
                    <p className="mt-1 text-muted">At the {church.alias}</p>
                    <ul className="mt-5 space-y-3 text-[0.98rem]">
                      <li className="flex items-center gap-3">
                        <CalendarDays className="size-4 text-muted" /> Sundays{" "}
                        <Time>{sunday.timeLabel}</Time>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="size-4 text-muted" /> Wednesdays{" "}
                        <Time>{midweek.timeLabel}</Time>
                      </li>
                      <li className="flex items-start gap-3">
                        <Navigation className="mt-1 size-4 shrink-0 text-muted" />{" "}
                        {church.address.line1}, {church.address.line2}
                      </li>
                    </ul>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold"
                    >
                      Get directions{" "}
                      <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                    </a>
                  </div>
                </Tilt>
              </Reveal>
              <Reveal y={30} delay={0.1}>
                <Tilt className="h-full rounded-[24px]" max={4}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-night p-6 text-white">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(240,106,91,0.4),transparent)]"
                    />
                    <p className="relative flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-cream uppercase">
                      <span className="relative flex size-2">
                        {live && (
                          <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5a4f]" />
                        )}
                        <span
                          className={`relative size-2 rounded-full ${live ? "bg-[#ff5a4f]" : "bg-cream/60"}`}
                        />
                      </span>
                      {live ? "Live now" : "Livestream"}
                    </p>
                    <p className="relative mt-1 text-white/60">
                      Wherever you are in the world
                    </p>
                    <p className="relative mt-5 flex items-center gap-3 text-[0.98rem]">
                      <CalendarDays className="size-4 text-white/50" /> Sundays{" "}
                      <Time dark>from 9am (WAT)</Time>
                    </p>
                    <div className="relative mt-auto grid gap-2 pt-6">
                      <a
                        href={socials.youtube.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                      >
                        <YouTubeIcon className="size-5 text-[#ff4b3e]" />
                        <span className="flex-1">
                          <span className="block text-sm font-semibold">
                            YouTube
                          </span>
                          <span className="block text-xs text-white/55">
                            {socials.youtube.handle}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 text-white/60 transition-transform group-hover:rotate-45" />
                      </a>
                      <a
                        href={socials.facebook.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                      >
                        <FacebookIcon className="size-5 text-[#4a8cff]" />
                        <span className="flex-1">
                          <span className="block text-sm font-semibold">
                            Facebook
                          </span>
                          <span className="block text-xs text-white/55">
                            {socials.facebook.handle}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 text-white/60 transition-transform group-hover:rotate-45" />
                      </a>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
