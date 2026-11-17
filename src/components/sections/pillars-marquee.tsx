import { Marquee } from "@/components/motion/marquee";
import { church } from "@/lib/site";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="mx-8 size-6 shrink-0 text-glory-400 md:mx-12 md:size-8" aria-hidden>
      <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function PillarsMarquee() {
  const items = [...church.pillars, ...church.pillars];
  return (
    <section aria-label="Our pillars" className="relative border-y border-white/10 bg-ink-900 py-8 text-bone-100 md:py-10">
      <Marquee speed={50}>
        {items.map((p, i) => (
          <span key={i} className="flex items-center">
            <span className={`text-display whitespace-nowrap text-5xl md:text-7xl ${i % 2 ? "italic text-glory" : ""}`}>{p}</span>
            <Star />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
