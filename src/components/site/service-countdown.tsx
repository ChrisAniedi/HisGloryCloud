"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useServiceStatus } from "./use-service-status";
import { splitDuration, formatInLagos } from "@/lib/schedule";
import { church, mapsUrl, socials } from "@/lib/site";
import { LiveDot } from "./live-dot";
import { cn } from "@/lib/utils";

function Digit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[1.1em] overflow-hidden font-serif text-4xl tabular-nums leading-none md:text-5xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="eyebrow mt-2 !text-[0.58rem] text-bone-100/45">{label}</span>
    </div>
  );
}

/** The 3-second answer to "when & where?" — live-aware. */
export function ServiceCountdown({ className }: { className?: string }) {
  const data = useServiceStatus();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/12 bg-ink-950/45 p-5 text-bone-100 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-6",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glory-300/60 to-transparent" />

      {!data ? (
        <div className="h-[184px] animate-pulse rounded-2xl bg-white/[0.03]" aria-busy="true" aria-label="Loading service times" />
      ) : data.status.state === "live" ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 eyebrow text-ember-400">
              <LiveDot /> Live now
            </span>
            <span className="text-xs text-bone-100/50">
              until {formatInLagos(data.status.endsAt, { hour: "numeric", minute: "2-digit" })} WAT
            </span>
          </div>
          <p className="font-serif text-3xl leading-tight md:text-4xl">
            {data.status.gathering.name} <em className="text-glory-300">is happening</em>
          </p>
          <a
            href={socials.youtube.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl bg-ember-500 px-5 py-4 font-medium text-white transition-colors hover:bg-ember-400"
          >
            Join the stream on YouTube
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex shrink-0 items-center gap-2 eyebrow text-glory-300">
              <LiveDot color="bg-glory-400" /> Next<span className="hidden sm:inline"> gathering</span>
            </span>
            <span className="text-right text-xs text-bone-100/55">
              {formatInLagos(data.status.startsAt, { weekday: "short", day: "numeric", month: "short" })} ·{" "}
              {formatInLagos(data.status.startsAt, { hour: "numeric", minute: "2-digit" })} WAT
            </span>
          </div>
          <p className="font-serif text-2xl leading-none md:text-[1.75rem]">{data.status.gathering.name}</p>
          {(() => {
            const d = splitDuration(data.status.startsAt.getTime() - data.now);
            return (
              <div className="grid grid-cols-4 gap-2 border-y border-white/10 py-4" role="timer" aria-live="off">
                <Digit value={d.days} label="Days" />
                <Digit value={d.hours} label="Hrs" />
                <Digit value={d.minutes} label="Min" />
                <Digit value={d.seconds} label="Sec" />
              </div>
            );
          })()}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 text-sm text-bone-100/70 transition-colors hover:text-bone-50"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-glory-400" />
            <span className="flex-1">
              {church.address.line1}, {church.address.line2}, {church.address.city}
            </span>
            <ArrowUpRight className="size-4 shrink-0 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
        </div>
      )}
    </div>
  );
}
