import { ScrollText } from "@/components/motion/scroll-text";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { welcomeStatements } from "@/lib/site";

export function Intro() {
  return (
    <section className="section-y relative bg-ink-900 text-bone-100">
      <div className="container-x">
        <p className="eyebrow mb-10 flex items-center gap-3 text-glory-300">
          <span className="h-px w-8 bg-current" /> A church that believes in Jesus
        </p>
        <ScrollText
          className="max-w-6xl font-sans text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[1.08] font-medium tracking-[-0.025em]"
          highlight={["jesus", "worship", "kingdom", "earth"]}
          text="Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, are passionate about the church of Christ, and are on a mission to see God’s kingdom established across the earth."
        />

        <Stagger className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {welcomeStatements.map((s, i) => (
            <StaggerItem key={s.title} className="group relative flex flex-col bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-850 md:min-h-[22rem]">
              <span className="font-mono text-xs text-glory-400">0{i + 1}</span>
              <h3 className="mt-auto pt-16 font-serif text-3xl leading-[1.05] text-bone-50">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-bone-100/60">{s.body}</p>
              <span aria-hidden className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-glory-400 to-transparent transition-transform duration-700 ease-[var(--ease-glory)] group-hover:scale-x-100" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
