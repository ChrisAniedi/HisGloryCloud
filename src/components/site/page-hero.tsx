import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GloryCloud } from "@/components/motion/glory-cloud";
import { SplitHeadline } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Interior page hero: shorter, same atmosphere as home for continuity. */
export function PageHero({
  eyebrow,
  lines,
  body,
  children,
  crumb,
  className,
}: {
  eyebrow: string;
  lines: { text: string; em?: boolean; className?: string }[];
  body?: React.ReactNode;
  children?: React.ReactNode;
  crumb?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden pt-40 pb-20 text-bone-50 md:pt-48 md:pb-28", className)}>
      <GloryCloud intensity={0.75} className="-z-10" />
      <div className="container-x">
        <Reveal y={10}>
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-bone-100/50">
            <Link href="/" className="transition-colors hover:text-bone-50">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-bone-100/80">{crumb ?? eyebrow}</span>
          </nav>
        </Reveal>
        <Reveal y={10} delay={0.05}>
          <p className="eyebrow mb-6 text-glory-300">{eyebrow}</p>
        </Reveal>
        <SplitHeadline lines={lines} delay={0.1} className="text-display max-w-5xl text-[clamp(3.25rem,9vw,8.5rem)]" />
        {body && (
          <Reveal delay={0.45}>
            <div className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-100/70 md:text-xl">{body}</div>
          </Reveal>
        )}
        {children && <Reveal delay={0.55} className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
