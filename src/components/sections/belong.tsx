import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { MediaFrame } from "@/components/site/media-frame";
import { Button } from "@/components/ui/button";
import { departments, gatherings, media, pastoralOccasions } from "@/lib/site";

const stats = [
  { value: 2013, label: "Year the Glory Tent was founded" },
  { value: gatherings.length, label: "Gatherings every week" },
  { value: departments.length, label: "Units where you can serve" },
  { value: pastoralOccasions.length, label: "Pastoral services offered" },
];

export function Belong() {
  return (
    <section className="theme-light section-y relative z-10 rounded-[2.5rem] md:rounded-[3.5rem]">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <MediaFrame
              src={media.community}
              alt="The HGC family worshipping together at the Glory Tent"
              tone="dawn"
              caption="The HGC family · Glory Tent"
              className="aspect-[4/5] w-full"
            />
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-glory-600">
                <span className="h-px w-8 bg-current" /> You belong here
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display mt-6 text-5xl text-balance md:text-7xl">
                Everyone deserves a place to <em className="text-glory-600">belong.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  A family that celebrates your faith, your growth, and your God-given potential. From the moment you walk through our doors, you’ll be surrounded by love, joy, and genuine people who care.
                </p>
                <p>
                  We are a vibrant, spirit-filled church where lives are transformed, leaders are raised, and destinies are shaped for God’s glory.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/about">
                  Our story <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/serve">Join the workforce</Link>
              </Button>
            </Reveal>

            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * i}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <CountUp to={s.value} className="text-display block text-6xl tabular-nums" />
                    <span className="mt-3 block text-sm leading-snug text-muted-foreground">{s.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
