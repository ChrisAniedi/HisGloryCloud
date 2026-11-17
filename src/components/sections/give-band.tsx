import Link from "next/link";
import { BankDetails } from "@/components/site/bank-details";
import { scriptures } from "@/lib/site";

export function GiveBand() {
  return (
    <section className="section-y border-t border-line bg-sand">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <p className="kicker">Giving</p>
          <h2 className="heading-2 mt-2">Give towards the work</h2>
          <p className="mt-4 text-lg text-muted">
            Your giving keeps the doors open and reaches past them: to families in need, to outreach, and to missions in
            places the gospel hasn’t reached yet. Transfer from any Nigerian bank.
          </p>
          <blockquote className="mt-7 border-l-[3px] border-red pl-5">
            <p className="font-serif text-lg italic">“{scriptures.giving.text}”</p>
            <footer className="mt-1.5 text-sm font-semibold text-muted">{scriptures.giving.ref}</footer>
          </blockquote>
          <Link href="/give" className="link-arrow mt-6">
            How your giving is used <span aria-hidden>→</span>
          </Link>
        </div>
        <BankDetails className="lg:col-span-6" />
      </div>
    </section>
  );
}
