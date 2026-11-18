import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { LineArt } from "@/components/motion/line-art";
import { art } from "@/lib/drawings";
import { SectionIntro } from "@/components/site/section-intro";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Ministry Training",
    body: "Six to twelve weeks of Spiritual Growth, Biblical Leadership, Evangelism and Discipleship, with a certificate at the end.",
    note: "Next session: 2026",
    href: "/training",
    cta: "About the programme",
    strokes: art.book,
    tone: "bg-cream",
  },
  {
    title: "Pastoral Services",
    body: "Baby dedications, naming ceremonies, marriage thanksgivings, house warmings and counselling, with love and dignity.",
    href: "/pastoral-care",
    cta: "Book a pastoral service",
    strokes: art.care,
    tone: "bg-red-soft",
  },
  {
    title: "Outreach",
    body: "Providing for families in need, sharing the gospel and serving the community around the Glory Tent and beyond.",
    href: "/give",
    cta: "Support the outreach",
    strokes: art.globe,
    tone: "bg-white ring-1 ring-line",
  },
];

/** The church's ministries, each with a hand-drawn picture that draws itself as you scroll. */
export function Ministries() {
  return (
    <section className="pt-[clamp(1rem,3vw,2rem)] pb-[clamp(3.25rem,6vw,5.25rem)]">
      <div className="container-x">
        <SectionIntro chip="Ministries" title="A place to grow, be cared for and serve" body="From the classroom to the community, there’s a way for every member of the family to be part of the work." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1} y={40}>
              <Tilt className="h-full rounded-[26px]">
              <Link href={m.href} className={cn("group flex h-full flex-col rounded-[26px] p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(35,29,23,0.4)]", m.tone)}>
                <div className="grid h-40 place-items-center">
                  <LineArt strokes={m.strokes} className="h-32 w-32 text-ink transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-[1.6rem] tracking-[-0.01em]">{m.title}</h3>
                {m.note && <p className="mt-1 text-sm font-semibold text-red">{m.note}</p>}
                <p className="mt-2 flex-1 text-ink-soft/80">{m.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold">
                  {m.cta} <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
