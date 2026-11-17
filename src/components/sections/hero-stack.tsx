"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Play } from "lucide-react";
import { useServiceStatus } from "@/components/site/use-service-status";
import { formatInLagos, splitDuration } from "@/lib/schedule";
import { church, gatherings, mapsUrl, socials } from "@/lib/site";
import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

type Latest = { title: string; url: string; thumb: string } | null;

function Row({ icon, title, sub, href, external }: { icon: React.ReactNode; title: React.ReactNode; sub: React.ReactNode; href: string; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="flex items-center gap-4 rounded-[18px] bg-white px-4 py-3.5 text-left shadow-[0_18px_40px_-20px_rgba(35,29,23,0.35)] ring-1 ring-line">
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.98rem] text-ink">{title}</span>
        <span className="mt-0.5 block truncate text-sm text-muted">{sub}</span>
      </span>
    </a>
  );
}

/**
 * Three real things, stacked like notifications: the next service, the latest message and where
 * to find us. They take turns at the front; hover the stack to fan it out.
 */
export function HeroStack({ latest, dark = false }: { latest: Latest; dark?: boolean }) {
  const reduce = useReducedMotion();
  const data = useServiceStatus(30_000);
  const [order, setOrder] = useState([0, 1, 2]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reduce || open) return;
    const id = window.setInterval(() => setOrder((o) => [...o.slice(1), o[0]]), 4200);
    return () => window.clearInterval(id);
  }, [reduce, open]);

  const g = data?.status.gathering ?? gatherings[0];
  const live = data?.status.state === "live";
  let when = `${g.dayLabel}, ${g.timeLabel}`;
  let title: React.ReactNode = <><strong className="font-semibold">{g.name}</strong> at the Glory Tent</>;
  if (data?.status.state === "upcoming") {
    const d = splitDuration(data.status.startsAt.getTime() - data.now);
    const inText = d.days > 0 ? `in ${d.days} day${d.days > 1 ? "s" : ""}` : d.hours > 0 ? `in ${d.hours}h ${d.minutes}m` : `in ${d.minutes} min`;
    title = <><strong className="font-semibold">{g.name}</strong> starts {inText}</>;
    when = `${formatInLagos(data.status.startsAt, { weekday: "long" })} · ${g.timeLabel} · ${church.alias}`;
  }
  if (live) title = <><strong className="font-semibold">{g.name}</strong> is on now</>;

  const cards = [
    <Row
      key="service"
      href={live ? socials.youtube.href : "/visit"}
      external={live}
      icon={
        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-paper ring-1 ring-line">
          <LogoMark className="h-7" />
          <span className={cn("absolute -top-0.5 -right-0.5 size-3 rounded-full ring-2 ring-white", live ? "bg-[#e0392f]" : "bg-[#3aa76d]")} />
        </span>
      }
      title={title}
      sub={<span suppressHydrationWarning>{live ? "Join the stream on YouTube" : when}</span>}
    />,
    latest ? (
      <Row
        key="message"
        href={latest.url}
        external
        icon={
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
            <Image src={latest.thumb} alt="" fill sizes="44px" className="object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/30 text-white">
              <Play className="ml-0.5 size-4 fill-current" />
            </span>
          </span>
        }
        title={<>New message: <strong className="font-semibold">{latest.title}</strong></>}
        sub={`${church.leader.name} · YouTube`}
      />
    ) : (
      <Row key="message" href={socials.youtube.href} external icon={<span className="grid size-11 place-items-center rounded-full bg-paper"><Play className="size-4" /></span>} title="Messages on YouTube" sub={socials.youtube.handle} />
    ),
    <Row
      key="place"
      href={mapsUrl}
      external
      icon={
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red-soft text-red">
          <MapPin className="size-5" />
        </span>
      }
      title={<><strong className="font-semibold">{church.address.line1}</strong></>}
      sub={`${church.address.line2}, ${church.address.city} · Directions`}
    />,
  ];

  return (
    <div
      className="relative isolate mx-auto w-full max-w-[30rem] transition-[height] duration-500"
      style={{ height: open ? 3 * 78 + 2 * 10 : 78 + 2 * 22 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* warm glow behind */}
      <div aria-hidden className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[130%] w-[150%] -translate-x-1/2 -translate-y-[40%] rounded-full",
          dark
            ? "bg-[radial-gradient(closest-side,rgba(240,106,91,0.32),rgba(243,214,160,0.12)_50%,transparent)]"
            : "bg-[radial-gradient(closest-side,rgba(240,165,150,0.3),rgba(243,233,215,0.4)_45%,transparent)]"
        )} />
      {order.map((c, pos) => (
        <motion.div
          key={c}
          className="absolute inset-x-0 top-0"
          style={{ zIndex: 3 - pos }}
          animate={
            open
              ? { y: pos * 88, scale: 1, opacity: 1 }
              : { y: pos * 22, scale: 1 - pos * 0.06, opacity: pos === 2 ? 0.75 : 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          {cards[c]}
        </motion.div>
      ))}
    </div>
  );
}
