import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";

const paths = [
  {
    href: "/training",
    title: "Ministry training",
    note: "Next session in 2026",
    body: "Six to twelve weeks of Spiritual Growth, Biblical Leadership, Evangelism, Discipleship and more, with a certificate at the end.",
    cta: "About the programme",
  },
  {
    href: "/pastoral-care",
    title: "Pastoral services",
    body: "Baby dedications, naming ceremonies, marriage thanksgivings, house warmings and counselling. Let us stand with you.",
    cta: "Book a pastoral service",
  },
  {
    href: "/serve",
    title: "Join the workforce",
    body: "Choir, media, protocol, ushering, the prayer squad and more. There are eleven units, so there’s a place for you.",
    cta: "Find your unit",
  },
];

export function Grow({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        {heading && (
          <SectionHeading kicker="Grow with us" title="Planted, rooted and raised" body="Ways to go deeper once you’ve found your feet." />
        )}
        <div className={`grid gap-10 md:grid-cols-3 md:gap-8 ${heading ? "mt-10" : ""}`}>
          {paths.map((p) => (
            <div key={p.href} className="border-t-2 border-ink pt-5">
              <h3 className="heading-3">{p.title}</h3>
              {p.note && <p className="mt-1 text-sm font-semibold text-red">{p.note}</p>}
              <p className="mt-3 text-muted">{p.body}</p>
              <Link href={p.href} className="link-arrow mt-4">
                {p.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
