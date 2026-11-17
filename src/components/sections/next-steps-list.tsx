import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { nextStepLinks } from "@/lib/site";

/** "Take the next step", in the church's own words, as a list of big rows. */
export function NextStepsList() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Chip>Next step</Chip>
            <h2 className="heading-2 mt-5">
              Take the next step. <span className="text-muted">We’re with you every step of the way.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">A real person from our team reads every form and gets back to you, usually within the week.</p>
          </div>
        </Reveal>
        <ul className="border-t border-line lg:col-span-7">
          {nextStepLinks.map((s, i) => (
            <Reveal as="li" key={s.href} delay={i * 0.06}>
              <Link href={s.href} className="group relative flex items-center gap-6 overflow-hidden border-b border-line py-7 md:py-8">
                <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100" />
                <span className="flex-1 transition-transform duration-500 group-hover:translate-x-3">
                  <span className="block text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-medium tracking-[-0.035em]">{s.title}</span>
                  <span className="mt-1 block text-lg text-muted">{s.body}</span>
                </span>
                <span className="mr-3 grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors duration-300 group-hover:bg-red group-hover:text-white group-hover:ring-red">
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
