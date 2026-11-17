import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { MediaFrame } from "@/components/site/media-frame";
import { CtaBand } from "@/components/site/cta-band";
import { church, coreValues, media, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Established November 16, 2013, His Glory Cloud Church exists to spread the gospel of Jesus with signs, wonders and the power of God — from the Glory Tent in Lagos to the ends of the earth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="A people of His glory"
        intro={`${church.name}, also called ${church.chapel}, exists to spread the gospel of our Lord Jesus around the world, with signs, wonders and the power of God as of old.`}
        image={media.thanksgiving ? { src: media.thanksgiving, alt: "A worshipper singing during a thanksgiving service", caption: "Thanksgiving service at the Glory Tent." } : null}
      />

      {/* Story */}
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="kicker">Our story</p>
            <h2 className="heading-2 mt-2">Since {church.foundedLabel}</h2>
          </div>
          <div className="space-y-5 text-lg text-muted lg:col-span-8">
            <p>
              HGC was founded on {church.foundedLabel}, with its headquarters at the {church.alias} in Gowon Estate, Egbeda, Lagos.
            </p>
            <p>
              From there the church spreads the gospel, broadcasts the Word through media, runs outreach programmes, gives to
              families in need and serves the community around it. The plan is to carry that work to Africa, America, Europe
              and the ends of the earth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section-y border-y border-line bg-sand">
        <div className="container-x grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="border-t-2 border-ink pt-5">
            <p className="kicker">Our mission</p>
            <p className="mt-4 font-serif text-2xl leading-snug md:text-[1.75rem]">
              To raise you, furnish you, bring out the hidden virtues in you, and make a glorious destiny out of you, by
              teaching and showing you who you are in Christ.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <p className="kicker">Our vision</p>
            <p className="heading-2 mt-3">Unseen Heights</p>
            <blockquote className="mt-4">
              <p className="font-serif text-xl leading-snug italic">“{scriptures.vision.text}”</p>
              <footer className="mt-2 text-sm font-semibold text-muted">{scriptures.vision.ref}</footer>
            </blockquote>
            <p className="mt-5 text-muted">Hence, love for God is our mantra at HGC.</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y">
        <div className={`container-x grid gap-12 lg:items-center lg:gap-16 ${media.leader ? "lg:grid-cols-12" : ""}`}>
          {media.leader && (
            <MediaFrame src={media.leader} alt={church.leader.name} caption={church.leader.role} className="lg:col-span-5" frameClassName="aspect-[4/5]" />
          )}
          <div className={media.leader ? "lg:col-span-7" : "max-w-3xl"}>
            <SectionHeading kicker="Leadership" title={church.leader.name} />
            <p className="mt-2 text-lg text-muted">
              {church.leader.role} · “{church.leader.title}”
            </p>
            <p className="mt-6 text-lg text-muted">
              God has raised His servant, Apostle Festus Nwachukwu Edobor, to raise you, furnish you, bring out the hidden
              virtues in you and make a glorious destiny out of you. Under his leadership, HGC continues to spread the gospel
              through worship, the Word, media, outreach and philanthropy.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section-y border-t border-line">
        <div className="container-x">
          <SectionHeading kicker="Core values" title="What our hands are given to" />
          <dl className="mt-10 border-t border-ink/15">
            {coreValues.map((v) => (
              <div key={v.title} className="grid gap-1 border-b border-ink/15 py-5 md:grid-cols-12 md:gap-8">
                <dt className="heading-3 md:col-span-4">{v.title}</dt>
                <dd className="text-lg text-muted md:col-span-8">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
