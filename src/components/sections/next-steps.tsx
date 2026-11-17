import Link from "next/link";
import { ArrowUpRight, HandHeart, Flame, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Atmosphere } from "@/components/motion/glory-cloud";
import { nextSteps } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = { salvation: Sparkles, prayer: Flame, testimony: HandHeart, serve: Users } as const;
const layout = {
  salvation: "lg:col-span-6 lg:row-span-2 min-h-[26rem] lg:min-h-[36rem]",
  prayer: "lg:col-span-6 min-h-[17rem]",
  testimony: "lg:col-span-3 min-h-[17rem]",
  serve: "lg:col-span-3 min-h-[17rem]",
} as const;

export function NextSteps() {
  return (
    <section className="theme-light section-y relative z-10 -mt-10 rounded-[2.5rem] md:-mt-14 md:rounded-[3.5rem]">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Next steps"
            title={<>Take the next step. <em className="text-glory-600">We’re with you</em> every step of the way.</>}
            className="max-w-4xl"
          />
          <p className="max-w-sm text-muted-foreground lg:pb-3">
            Wherever you are on your journey with God, there’s a clear, simple way forward — and real people ready to walk it with you.
          </p>
        </div>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2" gap={0.1}>
          {nextSteps.map((s, i) => {
            const Icon = icons[s.slug];
            const featured = s.slug === "salvation";
            return (
              <StaggerItem key={s.slug} className={cn(layout[s.slug], featured && "md:col-span-2 lg:col-span-6")}>
                <Link href={s.href} className="group block h-full rounded-[1.75rem] focus-visible:outline-offset-4">
                  {featured ? (
                    <Atmosphere tone="glory" className="flex h-full flex-col rounded-[1.75rem] p-8 text-bone-50 md:p-10">
                      <CardBody i={i} Icon={Icon} s={s} featured />
                    </Atmosphere>
                  ) : (
                    <SpotlightCard
                      color="rgba(214,156,69,0.18)"
                      className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-8 transition-[border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-ink-900/25"
                    >
                      <CardBody i={i} Icon={Icon} s={s} />
                    </SpotlightCard>
                  )}
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function CardBody({
  s,
  i,
  Icon,
  featured,
}: {
  s: (typeof nextSteps)[number];
  i: number;
  Icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl",
            featured ? "bg-white/10 text-glory-200 backdrop-blur-md" : "bg-ink-900 text-glory-300"
          )}
        >
          <Icon className="size-5" />
        </span>
        <span className={cn("font-mono text-xs", featured ? "text-bone-100/50" : "text-muted-foreground")}>0{i + 1} / 04</span>
      </div>
      <div className="mt-auto pt-10">
        <p className={cn("eyebrow", featured ? "text-glory-200" : "text-glory-600")}>{s.eyebrow}</p>
        <h3 className={cn("mt-3 font-serif leading-[1.02] text-balance", featured ? "text-5xl md:text-6xl" : "text-3xl md:text-[2.1rem]")}>
          {s.title}
        </h3>
        <p className={cn("mt-4 max-w-md text-[15px] leading-relaxed", featured ? "text-bone-100/75" : "text-muted-foreground")}>{s.blurb}</p>
        <span
          className={cn(
            "mt-7 inline-flex items-center gap-3 text-sm font-medium",
            featured ? "text-bone-50" : "text-foreground"
          )}
        >
          {s.cta}
          <span
            className={cn(
              "grid size-10 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-glory)] group-hover:rotate-45",
              featured ? "bg-glory-400 text-ink-950" : "bg-ink-900 text-bone-50 group-hover:bg-glory-500"
            )}
          >
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </div>
    </>
  );
}
