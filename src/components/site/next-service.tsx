"use client";

import { useServiceStatus } from "./use-service-status";
import { formatInLagos } from "@/lib/schedule";
import { socials } from "@/lib/site";
import { LiveDot } from "./live-dot";
import { cn } from "@/lib/utils";

/** One plain sentence: when the next service is, or that one is on now. */
export function NextService({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const data = useServiceStatus(30_000);

  if (!data) return <p className={cn("min-h-6", className)} aria-hidden />;

  if (data.status.state === "live") {
    return (
      <p className={cn("flex flex-wrap items-center gap-x-2", className)}>
        <LiveDot />
        <span>
          {data.status.gathering.name} is on now.{" "}
          <a href={socials.youtube.href} target="_blank" rel="noreferrer" className={cn("font-semibold underline underline-offset-4", onDark ? "text-red-on-ink" : "text-red")}>
            Watch live on YouTube
          </a>
        </span>
      </p>
    );
  }

  const when = formatInLagos(data.status.startsAt, { weekday: "long", day: "numeric", month: "long" });
  const time = formatInLagos(data.status.startsAt, { hour: "numeric", minute: "2-digit" }).replace(":00", "").replace(" ", "").toLowerCase();
  return (
    <p className={className}>
      Next service: <strong className="font-semibold">{data.status.gathering.name}</strong>, {when} at {time}
    </p>
  );
}
