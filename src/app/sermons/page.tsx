import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip, SectionIntro } from "@/components/site/section-intro";
import { SermonLibrary } from "@/components/blocks/sermon-library";
import { WorshipWithUs } from "@/components/blocks/worship-with-us";
import { VerseBlock } from "@/components/blocks/verse-block";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/site/social-icons";
import { getLatestMessages } from "@/lib/youtube";
import { church, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sermons",
  description: `Messages from ${church.leader.name} and His Glory Cloud Church. Watch the latest sermons and grow through the Word.`,
};

const platforms = [
  { ...socials.youtube, Icon: YouTubeIcon, note: "Full services live every Sunday, and every message to replay any time.", tone: "bg-[#e0392f] text-white" },
  { ...socials.instagram, Icon: InstagramIcon, note: "Short clips from the messages and moments from the Glory Tent.", tone: "bg-night text-white" },
  { ...socials.facebook, Icon: FacebookIcon, note: "News, announcements and highlights through the week.", tone: "bg-white text-ink ring-1 ring-line" },
];

export default async function SermonsPage() {
  const items = await getLatestMessages(15);
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-[clamp(5rem,10vw,9rem)] md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,165,150,0.25),transparent)]" />
        <div className="container-x">
          <Reveal className="text-center">
            <Chip>Sermons</Chip>
            <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.95] font-medium tracking-[-0.05em]">
              Grow through <span className="text-red">the Word.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl">Be strengthened, equipped and transformed through the preaching of God’s Word, by {church.leader.name}.</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <SermonLibrary items={items} />
          </Reveal>
        </div>
      </section>

      <section className="pb-[clamp(5rem,10vw,9rem)]">
        <div className="container-x">
          <SectionIntro chip="Watch anywhere" title="Listen anywhere. Any time." body="Follow along through the week, wherever you are." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {platforms.map(({ Icon, ...p }, i) => (
              <Reveal key={p.label} delay={i * 0.08} y={30}>
                <a href={p.href} target="_blank" rel="noreferrer" className={cn("group flex h-full min-h-[16rem] flex-col justify-between rounded-[26px] p-7 transition-transform duration-500 hover:-translate-y-1", p.tone)}>
                  <div className="flex items-start justify-between">
                    <Icon className="size-9" />
                    <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  <div>
                    <p className="text-[1.75rem] font-medium tracking-[-0.03em]">{p.label}</p>
                    <p className="mt-1 text-sm opacity-70">{p.handle}</p>
                    <p className="mt-3 opacity-80">{p.note}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WorshipWithUs />
      <VerseBlock reference="2 Timothy 3:16–17" text="All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness, that the man of God may be complete, thoroughly equipped for every good work." />
    </>
  );
}
