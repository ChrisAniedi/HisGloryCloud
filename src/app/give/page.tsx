import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BankDetails } from "@/components/site/bank-details";
import { giving, scriptures } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give & outreach",
  description: "Support the outreach programs and ministries of His Glory Cloud Church. Zenith Bank · His Glory Cloud Church · 1014394130.",
};

export default function GivePage() {
  return (
    <>
      <PageHero
        kicker="Give & outreach"
        title="Giving that reaches beyond our walls"
        intro="We are committed to reaching people in need, spreading the gospel and serving our community. Your giving is how that work gets done."
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="heading-3">Give by bank transfer</h2>
            <p className="mt-2 text-muted">Transfer from any Nigerian bank. Tap “Copy number” to paste it into your banking app.</p>
            <BankDetails className="mt-6" />
          </div>
          <div className="lg:col-span-6">
            <h2 className="heading-3">What your gift does</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {giving.impact.map((item) => (
                <li key={item} className="flex gap-3 py-4 text-lg">
                  <span className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-red" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-line bg-sand">
        <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
          {[scriptures.giving, scriptures.harvest].map((s) => (
            <blockquote key={s.ref} className="border-l-[3px] border-red pl-6">
              <p className="font-serif text-2xl leading-snug italic">“{s.text}”</p>
              <footer className="mt-3 font-semibold text-muted">{s.ref}</footer>
            </blockquote>
          ))}
        </div>
        <p className="container-x mt-14 max-w-3xl text-lg text-muted">
          Thank you for standing with us in faith and in action. Together we can shine God’s light in the world, one life at a time.
        </p>
      </section>
    </>
  );
}
