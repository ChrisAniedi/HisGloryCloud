import { PageHero } from "./page-hero";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Split layout for every "next step": story on the left, form on the right. */
export function FormPage({
  eyebrow,
  crumb,
  lines,
  body,
  aside,
  formTitle,
  formIntro,
  children,
}: {
  eyebrow: string;
  crumb?: string;
  lines: { text: string; em?: boolean; className?: string }[];
  body: React.ReactNode;
  aside: React.ReactNode;
  formTitle: string;
  formIntro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} crumb={crumb} lines={lines} body={body} />
      <section className="relative bg-ink-900 pb-[clamp(5rem,10vw,9rem)] text-bone-100">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">{aside}</div>
          </aside>
          <Reveal className="lg:col-span-7">
            <div className={cn("relative rounded-[2rem] border border-white/10 bg-ink-850/80 p-6 shadow-2xl shadow-black/30 sm:p-10")}>
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-glory-300/50 to-transparent" />
              <h2 className="font-serif text-4xl">{formTitle}</h2>
              {formIntro && <p className="mt-3 text-muted-foreground">{formIntro}</p>}
              <div className="mt-10">{children}</div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function AsideScripture({ text, refText }: { text: string; refText: string }) {
  return (
    <Reveal>
      <blockquote className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-glory-500/15 via-transparent to-transparent p-8">
        <p className="font-serif text-2xl leading-snug text-bone-50 italic md:text-3xl">“{text}”</p>
        <footer className="eyebrow mt-5 text-glory-300">{refText}</footer>
      </blockquote>
    </Reveal>
  );
}

export function AsideList({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Reveal delay={0.1} className="mt-10">
      <h3 className="eyebrow text-bone-100/50">{title}</h3>
      <ol className="mt-6 space-y-6">
        {items.map((it, i) => (
          <li key={it.title} className="flex gap-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-glory-400/40 font-mono text-xs text-glory-300">{i + 1}</span>
            <div>
              <p className="font-medium text-bone-50">{it.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-bone-100/55">{it.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
