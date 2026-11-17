import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, HandHeart, Megaphone } from "lucide-react";
import { Chip, SectionIntro } from "@/components/site/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { PeggedPhotos } from "@/components/blocks/pegged-photos";
import { Faq } from "@/components/blocks/faq";
import { VerseBlock } from "@/components/blocks/verse-block";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/site/social-icons";
import { departments, generalFaqs, media, socials, stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community",
  description: "Find your family at His Glory Cloud Church: a community devoted to Jesus, growing together in faith, truth and love.",
};

const values = [
  { Icon: HandHeart, title: "Prayer", body: "Prayer is where we meet with God. Our prayer squad stands in agreement with every request." },
  { Icon: BookOpen, title: "Discipleship", body: "Believers grounded in the Word and growing in Christ, through teaching and ministry training." },
  { Icon: Megaphone, title: "Evangelism", body: "Sharing the gospel and taking the love of Christ beyond our walls through outreach." },
];

const channels = [
  { ...socials.youtube, Icon: YouTubeIcon, note: "Services live on Sunday and every message to replay.", tone: "bg-night text-white" },
  { ...socials.instagram, Icon: InstagramIcon, note: "Moments from the Glory Tent through the week.", tone: "bg-red text-white" },
  { ...socials.facebook, Icon: FacebookIcon, note: "News, announcements and programmes.", tone: "bg-white text-ink ring-1 ring-line" },
];

export default function CommunityPage() {
  const photos = [
    media.worship && { src: media.worship, position: "50% 25%" },
    { src: stock.choir.src, position: "50% 30%" },
    media.thanksgiving && { src: media.thanksgiving, position: "50% 25%" },
    { src: stock.drummers.src, position: "50% 45%" },
    media.prayer && { src: media.prayer, position: "55% 35%" },
  ].filter(Boolean) as { src: string; position?: string }[];

  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,165,150,0.25),transparent)]" />
        <div className="container-x text-center">
          <Reveal>
            <Chip>Community</Chip>
            <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,7vw,6.25rem)] leading-[0.95] font-display tracking-[-0.015em]">
              Find your <span className="text-red">family.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl">A community where you can grow spiritually, build real friendships, and walk with others who are passionate about Jesus.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/serve" className="group inline-flex h-12 items-center gap-2 rounded-full bg-night px-6 font-semibold text-white hover:bg-red">
                Join a unit <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link href="/visit" className="inline-flex h-12 items-center rounded-full bg-white px-6 font-semibold ring-1 ring-line hover:ring-ink/30">Come on Sunday</Link>
            </div>
          </Reveal>
        </div>
        <div className="container-x mt-14">
          <PeggedPhotos photos={photos} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionIntro chip="Who we are together" title="A community devoted to Jesus" body="Committed to growing together in faith, truth and love." />
          <div className="mt-12 grid overflow-hidden rounded-[26px] bg-white ring-1 ring-line md:grid-cols-3">
            {values.map(({ Icon, ...v }, i) => (
              <Reveal key={v.title} delay={i * 0.08} className={`p-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}>
                <span className="grid size-11 place-items-center rounded-full bg-red-soft text-red"><Icon className="size-5" strokeWidth={1.75} /></span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{v.title}</h3>
                <p className="mt-2 text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-nav="dark" className="px-2 md:px-3">
        <div className="rounded-[24px] bg-night py-[clamp(4.5rem,9vw,7rem)] text-white md:rounded-[28px]">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Chip onDark>Serve together</Chip>
              <h2 className="heading-2 mt-5">There’s a unit with your name on it</h2>
              <p className="mt-4 text-lg text-white/65">Friendships grow fastest side by side. Join one of our {departments.length} serving units and become part of Christ’s team.</p>
              <Link href="/serve" className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 font-semibold text-night hover:bg-white">
                Join the workforce <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2.5">
                {departments.map((d) => (
                  <li key={d} className="rounded-full bg-white/[0.06] px-5 py-3 text-white/90 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">{d}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionIntro chip="Stay plugged in" title="Stay close through the week" body="Follow along and keep up with everything happening in the HGC family." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {channels.map(({ Icon, ...c }, i) => (
              <Reveal key={c.label} delay={i * 0.08} y={30}>
                <Tilt className="h-full rounded-[26px]"><a href={c.href} target="_blank" rel="noreferrer" className={`group flex h-full min-h-[15rem] flex-col justify-between rounded-[26px] p-7 transition-transform duration-500 hover:-translate-y-1 ${c.tone}`}>
                  <div className="flex items-start justify-between">
                    <Icon className="size-9" />
                    <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">{c.label}</p>
                    <p className="text-[1.6rem] font-medium tracking-[-0.03em]">{c.handle}</p>
                    <p className="mt-2 opacity-80">{c.note}</p>
                  </div>
                </a></Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={generalFaqs} className="pt-0" />
      <VerseBlock reference="Hebrews 10:24–25" text="Let us consider one another in order to stir up love and good works, not forsaking the assembling of ourselves together." />
    </>
  );
}
