import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-icons";
import { NewsletterForm } from "@/components/forms/newsletter";
import { church, gatherings, mapsUrl } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const steps = [
  { label: "I gave my life to Jesus", href: "/salvation" },
  { label: "Prayer request", href: "/prayer" },
  { label: "Share a testimony", href: "/testimony" },
  { label: "Join the workforce", href: "/serve" },
];

const explore = [
  { label: "About us", href: "/about" },
  { label: "Plan a visit", href: "/visit" },
  { label: "Watch online", href: "/watch" },
  { label: "Give", href: "/give" },
  { label: "Pastoral services", href: "/pastoral-care" },
  { label: "Ministry training", href: "/training" },
];

export function Footer() {
  return (
    <footer className="p-2 md:p-3">
      <div className="overflow-hidden rounded-[24px] bg-night text-white md:rounded-[28px]">
        <div className="container-x pt-16 pb-8 md:pt-20">
          {/* Invitation */}
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-light tracking-[-0.05em]">
              Join us this Sunday <span className="text-cream-muted">at 9am.</span>
            </h2>
            <Link
              href="/visit"
              className="group inline-flex h-14 shrink-0 items-center gap-3 self-start rounded-full bg-cream pr-2 pl-7 font-semibold text-night hover:bg-white md:self-auto"
            >
              Plan your visit
              <span className="grid size-10 place-items-center rounded-full bg-night text-cream transition-transform group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </div>

          <div className="grid gap-12 pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo onDark />
              <p className="mt-5 max-w-sm text-white/60">
                {church.address.line1}, {church.address.line2}, {church.address.city}.
              </p>
              <SocialLinks className="mt-6" itemClassName="rounded-full border-white/15 text-white/80 hover:border-white/50 hover:text-white" />
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
              <div>
                <h3 className="text-sm text-white/45">Services</h3>
                <ul className="mt-4 space-y-3">
                  {gatherings.map((g) => (
                    <li key={g.id}>
                      <span className="block">{g.name}</span>
                      <span className="text-white/55">{g.short}, {g.timeLabel}</span>
                    </li>
                  ))}
                  <li>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/70 hover:text-white">
                      Directions <ArrowUpRight className="size-3.5" />
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm text-white/45">Next steps</h3>
                <ul className="mt-4 space-y-2.5">
                  {steps.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-white/75 hover:text-white">{s.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm text-white/45">Explore</h3>
                <ul className="mt-4 space-y-2.5">
                  {explore.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/75 hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 rounded-[20px] bg-white/[0.04] p-6 md:grid-cols-2 md:items-center md:p-8">
            <div>
              <h3 className="text-2xl font-medium tracking-tight">Hear from us</h3>
              <p className="mt-1 text-white/60">Church news and upcoming programmes, by email. Nothing else.</p>
            </div>
            <NewsletterForm />
          </div>

          <p className="mt-10 text-sm text-white/45">
            © <CopyrightYear /> {church.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
