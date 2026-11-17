import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo, LogoMark } from "./logo";
import { SocialLinks } from "./social-icons";
import { NewsletterForm } from "@/components/forms/newsletter";
import { church, gatherings, mapsUrl } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const columns = [
  {
    title: "HGC Church",
    links: [
      { label: "About us", href: "/about" },
      { label: "Grow", href: "/grow" },
      { label: "Sermons", href: "/sermons" },
      { label: "Give", href: "/give" },
      { label: "Community", href: "/community" },
      { label: "Plan a visit", href: "/visit" },
    ],
  },
  {
    title: "Next steps",
    links: [
      { label: "I gave my life to Jesus", href: "/salvation" },
      { label: "Join the workforce", href: "/serve" },
      { label: "Ministry training", href: "/training" },
      { label: "Share a testimony", href: "/testimony" },
    ],
  },
  {
    title: "Help & support",
    links: [
      { label: "Prayer request", href: "/prayer" },
      { label: "Counselling & pastoral care", href: "/pastoral-care" },
      { label: "Contact & FAQs", href: "/help" },
    ],
  },
];

/** Footer: the links, when and where, and the church's name fading away at the bottom. */
export function Footer() {
  return (
    <footer data-nav="dark" className="p-2 md:p-3">
      <div className="relative isolate overflow-hidden rounded-[24px] bg-night text-white md:rounded-[28px]">
        <LogoMark onDark className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-[30rem] opacity-[0.05] md:h-[40rem]" />
        <div className="container-x pt-16 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo onDark />
              <p className="mt-6 max-w-sm text-white/60">Raising Kingdom builders for God’s glory. A family of joyful believers in Egbeda, Lagos, since {church.founded.slice(0, 4)}.</p>
              <ul className="mt-6 space-y-1.5 text-white/75">
                {gatherings.map((g) => (
                  <li key={g.id}>
                    <span className="text-white">{g.name}</span> · {g.short}s, {g.timeLabel}
                  </li>
                ))}
                <li>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                    {church.address.line1}, {church.address.line2} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
              {columns.map((c) => (
                <div key={c.title}>
                  <h3 className="font-medium">{c.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-white/60 transition-colors hover:text-white">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-medium">Stay connected</h3>
              <SocialLinks className="mt-4" itemClassName="rounded-full border-white/15 text-white/80 hover:border-white/50 hover:text-white" />
              <p className="mt-6 text-white/60">News and programmes by email. Nothing else.</p>
              <NewsletterForm className="mt-3" stacked />
            </div>
          </div>

          <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/45">
            © <CopyrightYear /> {church.name}. All rights reserved.
          </p>
        </div>

        {/* the church's name, fading away */}
        <p
          aria-hidden
          className="pointer-events-none -mt-[1vw] -mb-[4.2vw] bg-[linear-gradient(180deg,rgba(243,233,215,0.16)_0%,rgba(243,233,215,0.07)_45%,transparent_85%)] bg-clip-text text-center text-[15.5vw] leading-[1] font-semibold tracking-[-0.065em] whitespace-nowrap text-transparent select-none"
        >
          His Glory Cloud
        </p>
      </div>
    </footer>
  );
}
