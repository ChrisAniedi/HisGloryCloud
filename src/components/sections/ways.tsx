import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, MapPin, Navigation, Play, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { getLatestMessages } from "@/lib/youtube";
import { church, gatherings, mapsUrl, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

function Card({ title, body, href, cta, external, className, children }: { title: string; body: string; href: string; cta: string; external?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn("group flex flex-col overflow-hidden rounded-[26px] bg-white ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(35,29,23,0.35)]", className)}
    >
      <div className="relative m-2 h-60 overflow-hidden rounded-[20px] bg-paper">{children}</div>
      <div className="flex flex-1 flex-col px-6 pt-3 pb-6">
        <h3 className="text-[1.4rem] font-medium tracking-[-0.025em]">{title}</h3>
        <p className="mt-1.5 flex-1 text-muted">{body}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
          {cta} <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

const midweek = gatherings.find((g) => g.id === "midweek") ?? gatherings[1];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** Four ways to be part of HGC, each with a small picture of what it is like. */
export async function Ways() {
  const [latest] = await getLatestMessages(1);
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionIntro chip="Gather with us" title="Every week at the Glory Tent" body="In the room or online, on Sunday or midweek, there’s a place for you in what God is doing at HGC." />

        <div className="mt-12 grid gap-3 lg:grid-cols-12">
          {/* the Glory Tent: a little map */}
          <Reveal className="lg:col-span-7">
            <Card title="At the Glory Tent" body="Sundays from 9am in Gowon Estate, Egbeda. Greeters meet you at the door." href={mapsUrl} external cta="Get directions" className="h-full">
              <svg aria-hidden viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
                <rect width="600" height="240" fill="#f1ebe1" />
                {[["M-10 70 L620 40", 14], ["M-10 180 L620 150", 10], ["M140 -10 L190 260", 12], ["M420 -10 L380 260", 16], ["M260 -10 C 280 90, 240 160, 300 260", 8]].map(([d, w], i) => (
                  <path key={i} d={d as string} stroke="#fffdf8" strokeWidth={w as number} fill="none" strokeLinecap="round" />
                ))}
                <rect x="440" y="70" width="110" height="60" rx="10" fill="#e3ecd9" />
                <rect x="30" y="100" width="90" height="50" rx="10" fill="#e8e1d4" />
              </svg>
              <span className="absolute top-[46%] left-[46%] -translate-1/2">
                <span className="absolute inset-0 -m-4 animate-ping rounded-full bg-red/25 [animation-duration:2.6s]" />
                <span className="relative grid size-11 place-items-center rounded-full bg-red text-white shadow-lg">
                  <MapPin className="size-5" />
                </span>
              </span>
              <span className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-[0_12px_30px_-14px_rgba(35,29,23,0.4)] ring-1 ring-line backdrop-blur sm:left-auto sm:w-80">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-ink"><Navigation className="size-4" /></span>
                <span className="min-w-0 text-sm">
                  <span className="block truncate font-semibold">{church.address.line1}</span>
                  <span className="block truncate text-muted">{church.address.line2}, {church.address.city}</span>
                </span>
              </span>
            </Card>
          </Reveal>

          {/* YouTube: a little player */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <Card title="Live on YouTube" body="Every Sunday service streams live, wherever you are in the world." href={socials.youtube.href} external cta="Watch live" className="h-full">
              {latest && <Image src={latest.thumb} alt="" fill sizes="(min-width:1024px) 35vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#e0392f] px-2.5 py-1 text-xs font-semibold text-white">
                <span className="size-1.5 animate-pulse rounded-full bg-white" /> LIVE · Sundays 9am
              </span>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-14 place-items-center rounded-full bg-white/90 text-night transition-transform duration-500 group-hover:scale-110">
                  <Play className="ml-0.5 size-5 fill-current" />
                </span>
              </span>
              <span className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-xs text-white/85">
                <span>Sunday Service</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                  <span className="block h-full w-[42%] rounded-full bg-[#e0392f] transition-[width] duration-1000 group-hover:w-[64%]" />
                </span>
                <span>{socials.youtube.handle}</span>
              </span>
            </Card>
          </Reveal>

          {/* midweek: the week */}
          <Reveal delay={0.04} className="lg:col-span-5">
            <Card title="Midweek service" body="One hour on Wednesday evenings: prayer, teaching and a refreshing of the Spirit." href="/visit" cta="Plan to come" className="h-full">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(60%_70%_at_50%_40%,#fffdf8,#f1ebe1)]">
                <ol className="flex gap-2">
                  {DAYS.map((d, i) => (
                    <li key={i} className="flex flex-col items-center gap-2 text-xs text-muted">
                      {d}
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-full text-sm font-semibold transition-transform duration-500",
                          i === midweek.day ? "bg-night text-white shadow-lg group-hover:-translate-y-1" : i === 0 ? "bg-white text-ink ring-1 ring-line" : "bg-white/60 text-ink/30"
                        )}
                      >
                        {i === midweek.day ? "6p" : i === 0 ? "9a" : "·"}
                      </span>
                    </li>
                  ))}
                </ol>
                <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium shadow-sm ring-1 ring-line">
                  {midweek.name} · {midweek.timeLabel}
                </span>
              </div>
            </Card>
          </Reveal>

          {/* prayer: the request form, in miniature */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <Card title="Ask for prayer" body="Send a request any time. Our prayer squad will stand in agreement with you." href="/prayer" cta="Send a request" className="h-full">
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(60%_70%_at_50%_40%,#fffdf8,#f1ebe1)] p-5">
                <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-[0_16px_40px_-20px_rgba(35,29,23,0.45)] ring-1 ring-line">
                  <p className="text-sm font-medium">What can we pray about?</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Healing", "Family", "Finances", "Career", "Guidance"].map((t, i) => (
                      <span key={t} className={cn("rounded-full px-3 py-1 text-xs font-medium ring-1", i === 1 ? "bg-night text-white ring-night" : "bg-paper text-ink-soft ring-line")}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2.5 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><Lock className="size-3.5" /> Kept confidential if you ask</span>
                    <span className="grid size-8 place-items-center rounded-full bg-red text-white transition-transform duration-500 group-hover:translate-x-1">
                      <Send className="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
