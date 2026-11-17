import { Reveal, RevealWords } from "@/components/motion/reveal";

/** A verse set large at the end of a page: the reference on the left, the words on the right. */
export function VerseBlock({ text, reference }: { text: string; reference: string }) {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="text-[clamp(2rem,4vw,3.4rem)] leading-none font-display tracking-[-0.01em] text-ink/30">{reference}</p>
        </Reveal>
        <blockquote className="lg:col-span-8">
          <p className="font-serif text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.2] italic">
            <RevealWords text={`“${text}”`} stagger={0.03} />
          </p>
        </blockquote>
      </div>
    </section>
  );
}
