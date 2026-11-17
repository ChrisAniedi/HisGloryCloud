import { ArrowUpRight, Play } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Atmosphere } from "@/components/motion/glory-cloud";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "@/components/site/social-icons";
import { socials } from "@/lib/site";

const channels = [
  { ...socials.youtube, Icon: YouTubeIcon, note: "Live services & messages" },
  { ...socials.instagram, Icon: InstagramIcon, note: "Moments from the Glory Tent" },
  { ...socials.facebook, Icon: FacebookIcon, note: "Community & announcements" },
];

export function Watch() {
  return (
    <section className="dark-section section-y relative bg-ink-900 pt-0 text-bone-100">
      <div className="container-x">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Watch online"
            title={<>Church, <em className="text-glory">wherever you are.</em></>}
          />
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-lg leading-relaxed text-bone-100/60">
              Can’t make it to the Glory Tent? Join us live on YouTube every Sunday from 9AM (WAT) — from Lagos to London to anywhere in the world.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <a
            href={socials.youtube.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-[2rem] focus-visible:outline-offset-4"
            aria-label="Watch His Glory Cloud Church live on YouTube"
          >
            <Atmosphere tone="ember" className="aspect-[4/5] sm:aspect-video">
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="relative grid size-24 place-items-center md:size-32">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-bone-50/30 [animation-duration:2.6s]" />
                  <span className="relative grid size-24 place-items-center rounded-full bg-bone-50 text-ink-950 shadow-2xl transition-transform duration-700 ease-[var(--ease-glory)] group-hover:scale-110 md:size-32">
                    <Play className="ml-1 size-8 fill-current md:size-10" />
                  </span>
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-ember-400">
                    <YouTubeIcon className="size-4" /> {socials.youtube.handle}
                  </p>
                  <p className="mt-3 font-serif text-4xl md:text-6xl">Sunday Service, live.</p>
                </div>
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm backdrop-blur-md transition-colors group-hover:bg-white/20 md:self-auto">
                  Open the channel <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Atmosphere>
          </a>
        </Reveal>

        <Stagger className="mt-4 grid gap-4 md:grid-cols-3" gap={0.08}>
          {channels.map(({ Icon, ...c }) => (
            <StaggerItem key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-ink-850 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-white/[0.06] transition-colors group-hover:bg-glory-400 group-hover:text-ink-950">
                  <Icon className="size-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-bone-50">{c.label}</span>
                  <span className="block text-sm text-bone-100/50">{c.note}</span>
                </span>
                <ArrowUpRight className="size-5 text-bone-100/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-glory-300" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
