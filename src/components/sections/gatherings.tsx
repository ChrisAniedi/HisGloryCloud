import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Button } from "@/components/ui/button";
import { church, gatherings, mapsEmbedUrl, mapsUrl } from "@/lib/site";

export function Gatherings() {
  return (
    <section className="dark-section section-y relative overflow-hidden bg-ink-900 text-bone-100">
      <div aria-hidden className="pointer-events-none absolute top-0 right-[-10%] size-[40rem] rounded-full bg-glory-500/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Gather with us"
          title={<>Come as you are. <em className="text-glory">There’s a place for you.</em></>}
          body="Whether you’re new to church, visiting, or looking for a spiritual home — you are welcome here."
        />

        <Stagger className="mt-16 grid gap-4 lg:grid-cols-2" gap={0.12}>
          {gatherings.map((g) => {
            const [time, meridiem] = g.timeLabel.split(" –")[0].split(" ");
            return (
              <StaggerItem key={g.id}>
                <SpotlightCard className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-ink-850 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-glory-300">{g.dayLabel}</p>
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-bone-100/60">
                      <Clock className="size-3" /> {g.timeLabel}
                    </span>
                  </div>
                  <div className="mt-12 flex items-end gap-3">
                    <span className="text-display text-[clamp(6rem,14vw,11rem)] leading-[0.75] text-bone-50">{time.replace(":00", "")}</span>
                    <span className="mb-2 font-serif text-4xl text-glory-300 italic">{meridiem}</span>
                  </div>
                  <h3 className="mt-8 font-serif text-4xl">{g.name}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-bone-100/60">{g.description}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-4">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-850 lg:grid-cols-5">
            <div className="flex flex-col p-8 md:p-10 lg:col-span-2">
              <span className="grid size-12 place-items-center rounded-2xl bg-glory-400 text-ink-950">
                <MapPin className="size-5" />
              </span>
              <p className="eyebrow mt-8 text-glory-300">The {church.alias}</p>
              <address className="mt-3 font-serif text-3xl leading-tight not-italic md:text-4xl">
                {church.address.line1},<br />
                {church.address.line2},<br />
                {church.address.city}.
              </address>
              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                <Button asChild variant="glory">
                  <a href={mapsUrl} target="_blank" rel="noreferrer">
                    <Navigation /> Get directions
                  </a>
                </Button>
                <Button asChild variant="glass">
                  <Link href="/visit">
                    What to expect <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[22rem] lg:col-span-3">
              <iframe
                title={`Map to ${church.name}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.25)]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-850 via-transparent to-transparent lg:via-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
