import { gatherings, type Gathering } from "./site";

/** Lagos is UTC+1 year-round (no DST), so a fixed offset is exact. */
const LAGOS_OFFSET_MS = 60 * 60 * 1000;

export type ServiceStatus =
  | { state: "live"; gathering: Gathering; endsAt: Date }
  | { state: "upcoming"; gathering: Gathering; startsAt: Date };

/** Returns the service that is live now, or the next one to start. */
export function getServiceStatus(now: Date = new Date()): ServiceStatus {
  // Shift into "Lagos wall-clock" space and use UTC getters on it.
  const lagos = new Date(now.getTime() + LAGOS_OFFSET_MS);
  const dayStartUtc = Date.UTC(lagos.getUTCFullYear(), lagos.getUTCMonth(), lagos.getUTCDate());

  let best: ServiceStatus | null = null;

  for (let offset = 0; offset <= 7; offset++) {
    const dayUtc = dayStartUtc + offset * 86_400_000;
    const weekday = new Date(dayUtc).getUTCDay();

    for (const g of gatherings) {
      if (g.day !== weekday) continue;
      const start = dayUtc + (g.start[0] * 60 + g.start[1]) * 60_000 - LAGOS_OFFSET_MS;
      const end = dayUtc + (g.end[0] * 60 + g.end[1]) * 60_000 - LAGOS_OFFSET_MS;
      const t = now.getTime();

      if (t >= start && t < end) return { state: "live", gathering: g, endsAt: new Date(end) };
      if (start > t && (!best || (best.state === "upcoming" && start < best.startsAt.getTime()))) {
        best = { state: "upcoming", gathering: g, startsAt: new Date(start) };
      }
    }
    if (best) return best;
  }
  // Unreachable with at least one weekly gathering.
  return { state: "upcoming", gathering: gatherings[0], startsAt: now };
}

export function splitDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3_600),
    minutes: Math.floor((s % 3_600) / 60),
    seconds: s % 60,
  };
}

export function formatInLagos(date: Date, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lagos", hour12: true, ...opts }).format(date);
}
