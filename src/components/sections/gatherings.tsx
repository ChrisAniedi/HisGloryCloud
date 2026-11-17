import { ArrowUpRight, Navigation } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { church, gatherings, mapsEmbedUrl, mapsUrl } from "@/lib/site";

/** Service times and the map: the practical "when and where". */
export function Gatherings({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section-y">
      <div className="container-x">
        {heading && (
          <SectionIntro chip="Plan your visit" title="Come and worship with us" body="New to church, visiting Lagos, or looking for a spiritual home? There’s a seat with your name on it." />
        )}

        <Reveal delay={0.1} className={heading ? "mt-10" : ""}>
          <div className="grid overflow-hidden rounded-[24px] border border-line bg-white lg:grid-cols-12">
            <div className="flex flex-col p-6 md:p-10 lg:col-span-5">
              <ul className="divide-y divide-line">
                {gatherings.map((g) => (
                  <li key={g.id} className="py-6 first:pt-0">
                    <p className="text-sm font-medium text-red">{g.dayLabel}</p>
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-2xl font-medium tracking-tight">{g.name}</h3>
                      <p className="text-2xl font-light tracking-tight">{g.timeLabel}</p>
                    </div>
                    <p className="mt-2 text-muted">{g.description}</p>
                  </li>
                ))}
              </ul>

              <address className="mt-auto border-t border-line pt-6 text-lg not-italic">
                <span className="font-medium">The {church.alias}</span>
                <br />
                <span className="text-muted">
                  {church.address.line1}, {church.address.line2}, {church.address.city}
                </span>
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-night px-5 font-semibold text-white hover:bg-night-soft">
                  <Navigation className="size-4" /> Get directions
                </a>
                {heading && (
                  <a href="/visit" className="group inline-flex h-12 items-center gap-1.5 rounded-full border border-line px-5 font-semibold hover:border-ink/40">
                    What to expect <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </a>
                )}
              </div>
            </div>

            <div className="relative min-h-[22rem] p-2 lg:col-span-7">
              <div className="relative size-full min-h-[22rem] overflow-hidden rounded-[18px] bg-paper">
                <iframe
                  title={`Map showing ${church.name}, ${church.address.full}`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
