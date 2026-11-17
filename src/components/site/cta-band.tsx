import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Atmosphere } from "@/components/motion/glory-cloud";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { gatherings } from "@/lib/site";

export function CtaBand({
  title = (
    <>
      This Sunday could <em className="text-glory">change everything.</em>
    </>
  ),
  body = `Join us every ${gatherings[0].short}, ${gatherings[0].timeLabel} — we saved you a seat.`,
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="bg-ink-900 pb-[clamp(5rem,10vw,8rem)] text-bone-50">
      <div className="container-x">
        <Reveal>
          <Atmosphere tone="glory" className="rounded-[2.5rem] px-6 py-20 text-center md:px-16 md:py-28">
            <h2 className="text-display mx-auto max-w-4xl text-5xl text-balance md:text-8xl">{title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-bone-100/75">{body}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button asChild variant="glory" size="xl">
                  <Link href="/visit">
                    Plan your visit <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="glass" size="xl">
                <Link href="/next-steps">Explore next steps</Link>
              </Button>
            </div>
          </Atmosphere>
        </Reveal>
      </div>
    </section>
  );
}
