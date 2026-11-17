import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LineArt } from "@/components/motion/line-art";
import { art } from "@/lib/drawings";
import { BankDetails } from "@/components/site/bank-details";
import { Chip } from "@/components/site/section-intro";
import { scriptures } from "@/lib/site";

/** Giving, on the brand red, with a soft card, the account details and open hands that draw themselves. */
export function Give() {
  return (
    <section data-nav="dark" className="px-2 pb-2 md:px-3 md:pb-3">
      <div className="relative overflow-hidden rounded-[24px] bg-red py-[clamp(3rem,7vw,5rem)] md:rounded-[28px]">
        <div className="container-x">
          <Reveal y={40}>
            <div className="relative grid gap-10 overflow-hidden rounded-[22px] bg-[#fbeeea] p-6 text-night md:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-14">
              <LineArt strokes={art.hands} viewBox="0 0 240 160" width={1.6} color="#a8231c" accent="#a8231c" className="pointer-events-none absolute top-6 right-8 hidden h-36 w-56 opacity-70 lg:block" />
              <div className="relative lg:col-span-6">
                <Chip>Give & outreach</Chip>
                <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[0.98] font-display tracking-[-0.015em]">Give towards the work.</h2>
                <p className="mt-4 max-w-md text-lg text-night/70">Your generosity keeps the doors open and reaches past them: families in need, outreach, and missions where the gospel hasn’t reached yet.</p>
                <blockquote className="mt-6 border-l-2 border-red pl-5">
                  <p className="font-serif text-lg italic">“{scriptures.giving.text}”</p>
                  <footer className="mt-1.5 text-sm font-medium text-night/60">{scriptures.giving.ref}</footer>
                </blockquote>
                <Link href="/give" className="group mt-7 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
                  How your giving is used <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
              <BankDetails className="relative lg:col-span-5 lg:col-start-8 lg:mt-36" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
