import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { Rail } from "@/components/blocks/sermon-rail";
import { SermonCard } from "@/components/blocks/sermon-card";
import { getLatestMessages } from "@/lib/youtube";

/** "Fuel your faith": the latest messages from the YouTube channel, on a row you can scroll. */
export async function Messages() {
  const items = await getLatestMessages(8);
  if (!items.length) return null;
  return (
    <section className="section-y overflow-hidden">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal className="max-w-2xl">
          <Chip>Sermons</Chip>
          <h2 className="mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.045em]">Fuel your faith.</h2>
          <p className="mt-4 text-lg text-muted">Every message is preached to deepen your faith and draw you closer to Jesus. Watch the latest, or catch up on what you missed.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link href="/sermons" className="group inline-flex h-12 items-center gap-2 rounded-full bg-red px-6 font-semibold text-white transition-colors hover:bg-red-dark">
            See all sermons <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.15} y={40}>
        <Rail className="mt-12">
          {items.map((m) => (
            <SermonCard key={m.id} m={m} />
          ))}
        </Rail>
      </Reveal>
    </section>
  );
}
