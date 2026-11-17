import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-icons";
import { NewsletterForm } from "@/components/forms/newsletter";
import { church, gatherings, mapsUrl, scriptures } from "@/lib/site";

const steps = [
  { label: "Salvation", href: "/salvation" },
  { label: "Prayer request", href: "/prayer" },
  { label: "Share a testimony", href: "/testimony" },
  { label: "Join the workforce", href: "/serve" },
];

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const explore = [
  { label: "About us", href: "/about" },
  { label: "Plan a visit", href: "/visit" },
  { label: "Watch online", href: "/watch" },
  { label: "Give & outreach", href: "/give" },
  { label: "Pastoral services", href: "/pastoral-care" },
  { label: "Ministry training", href: "/training" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-ink-950 text-bone-100">
      <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-glory-500/15 blur-[140px]" />
      <div className="grain" />

      <div className="container-x pt-24 pb-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-glory-300">Stay close</p>
            <h2 className="text-display mt-5 text-5xl md:text-6xl">
              Join our community <em className="text-glory">of believers.</em>
            </h2>
            <NewsletterForm className="mt-8 max-w-md" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            <div>
              <h3 className="eyebrow text-bone-100/45">Gather</h3>
              <ul className="mt-5 space-y-4 text-sm">
                {gatherings.map((g) => (
                  <li key={g.id}>
                    <p className="text-bone-50">{g.name}</p>
                    <p className="text-bone-100/55">{g.short} · {g.timeLabel}</p>
                  </li>
                ))}
                <li>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1 text-bone-100/55 transition-colors hover:text-glory-300">
                    <span>{church.address.line1},<br />{church.address.line2}, {church.address.city}</span>
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-bone-100/45">Next steps</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {steps.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-bone-100/70 transition-colors hover:text-glory-300">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-bone-100/45">Explore</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-bone-100/70 transition-colors hover:text-glory-300">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Signature wordmark */}
        <div className="relative mt-24 select-none" aria-hidden>
          <p className="text-display text-center text-[clamp(4rem,17vw,17rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(244,239,230,0.28)]">
            Unseen <em className="text-glory [-webkit-text-stroke:0]">Heights</em>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center font-serif text-lg text-bone-100/50 italic">
          “{scriptures.vision.text}” <span className="not-italic text-bone-100/35">— {scriptures.vision.ref}</span>
        </p>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <Logo />
          <SocialLinks />
          <p className="text-xs text-bone-100/40">© <CopyrightYear /> {church.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
