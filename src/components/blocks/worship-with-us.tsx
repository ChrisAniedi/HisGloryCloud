import { CalendarDays, Clock, MapPin, MonitorPlay, Navigation } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { YouTubeIcon } from "@/components/site/social-icons";
import { church, gatherings, mapsUrl, socials } from "@/lib/site";

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 border-b border-white/10 py-3.5 last:border-b-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-cream">{icon}</span>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/85">{children}</span>
    </li>
  );
}

const Time = ({ children }: { children: React.ReactNode }) => <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-sm font-medium text-white">{children}</span>;

/** "Worship with us": in person at the Glory Tent, or live on YouTube. */
export function WorshipWithUs() {
  const sunday = gatherings.find((g) => g.id === "sunday") ?? gatherings[0];
  const midweek = gatherings.find((g) => g.id === "midweek") ?? gatherings[1];
  return (
    <section data-nav="dark" className="px-2 md:px-3">
      <div className="relative overflow-hidden rounded-[24px] bg-night py-[clamp(4.5rem,9vw,7.5rem)] text-white md:rounded-[28px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(45%_70%_at_50%_0%,rgba(240,106,91,0.16),transparent)]" />
        <div className="container-x relative">
          <SectionIntro onDark chip="Worship with us" title="Come as you are. Worship with us." body="Join us for worship, prayer, the Word and fellowship, as we gather to encounter Jesus together." />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            <Reveal y={30}>
              <div className="h-full rounded-[24px] bg-white/[0.05] p-2 ring-1 ring-white/10">
                <div className="px-5 pt-5 pb-3">
                  <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-cream uppercase"><MapPin className="size-4" /> In person</p>
                  <p className="mt-1 text-white/60">At the {church.alias}, for worship, the Word and community.</p>
                </div>
                <ul className="rounded-[18px] bg-white/[0.05] px-4 py-1">
                  <Row icon={<CalendarDays className="size-4" />}>{sunday.dayLabel} <Time>{sunday.timeLabel}</Time></Row>
                  <Row icon={<Clock className="size-4" />}>{midweek.dayLabel} <Time>{midweek.timeLabel}</Time></Row>
                  <Row icon={<Navigation className="size-4" />}>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-white hover:underline">{church.address.line1}, {church.address.line2}</a>
                  </Row>
                </ul>
              </div>
            </Reveal>
            <Reveal y={30} delay={0.1}>
              <div className="h-full rounded-[24px] bg-white/[0.05] p-2 ring-1 ring-white/10">
                <div className="px-5 pt-5 pb-3">
                  <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-cream uppercase"><MonitorPlay className="size-4" /> Livestream</p>
                  <p className="mt-1 text-white/60">Online, wherever you are in the world.</p>
                </div>
                <ul className="rounded-[18px] bg-white/[0.05] px-4 py-1">
                  <Row icon={<CalendarDays className="size-4" />}>{sunday.dayLabel} <Time>from 9am (WAT)</Time></Row>
                  <Row icon={<YouTubeIcon className="size-4" />}>
                    <a href={socials.youtube.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-white hover:underline">youtube.com/{socials.youtube.handle}</a>
                  </Row>
                  <Row icon={<MonitorPlay className="size-4" />}>Past messages any time on the channel</Row>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
