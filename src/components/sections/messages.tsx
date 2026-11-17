import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { getLatestMessages, channelUrl } from "@/lib/youtube";
import { church } from "@/lib/site";

const fmt = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(iso));

/** The newest messages from the church's YouTube channel. */
export async function Messages() {
  const items = await getLatestMessages(4);
  if (!items.length) return null;
  const [first, ...rest] = items;

  return (
    <section data-nav="dark" className="px-2 md:px-3">
      <div className="relative isolate overflow-hidden rounded-[24px] bg-night py-[clamp(3.5rem,8vw,6rem)] text-white md:rounded-[28px]">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Chip onDark>From {church.leader.name}</Chip>
              <h2 className="heading-2 mt-5">Latest messages</h2>
            </div>
            <a href={channelUrl} target="_blank" rel="noreferrer" className="group inline-flex h-12 items-center gap-2 self-start rounded-full border border-white/20 px-5 font-medium hover:border-white/50 md:self-auto">
              All messages on YouTube <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <a href={first.url} target="_blank" rel="noreferrer" className="group block">
                <span className="relative block aspect-video overflow-hidden rounded-[18px] bg-night-soft">
                  <Image src={first.thumb} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-5 left-5 grid size-16 place-items-center rounded-full bg-cream text-night transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 size-6 fill-current" />
                  </span>
                </span>
                <span className="mt-4 block text-sm text-white/50">{fmt(first.published)}</span>
                <span className="mt-1 block text-2xl font-medium tracking-tight group-hover:underline group-hover:underline-offset-4 md:text-[1.75rem]">{first.title}</span>
              </a>
            </Reveal>

            <ul className="grid gap-5 lg:col-span-5">
              {rest.map((m, i) => (
                <Reveal as="li" key={m.id} delay={0.08 * (i + 1)}>
                  <a href={m.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-4 sm:grid-cols-[13rem_1fr]">
                    <span className="relative block aspect-video overflow-hidden rounded-[14px] bg-night-soft">
                      <Image src={m.thumb} alt="" fill sizes="13rem" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full bg-black/60 backdrop-blur">
                        <Play className="ml-0.5 size-3.5 fill-current" />
                      </span>
                    </span>
                    <span>
                      <span className="block text-sm text-white/50">{fmt(m.published)}</span>
                      <span className="mt-1 line-clamp-3 block text-lg leading-snug font-medium tracking-tight group-hover:underline group-hover:underline-offset-4">{m.title}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
