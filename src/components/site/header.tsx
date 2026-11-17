"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, church, gatherings, socials } from "@/lib/site";
import { SocialLinks } from "./social-icons";
import { useServiceStatus } from "./use-service-status";
import { LiveDot } from "./live-dot";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const live = useServiceStatus(15_000)?.status.state === "live";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 rounded-full px-3 pl-5 text-bone-100 transition-all duration-500 ease-[var(--ease-glory)] md:h-[4.25rem]",
          scrolled
            ? "border border-white/10 bg-ink-950/65 shadow-2xl shadow-black/30 backdrop-blur-2xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
            {nav.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors",
                    isActive(item.href) ? "text-ink-950" : "text-bone-100/75 hover:text-bone-50"
                  )}
                >
                  {item.label}
                </Link>
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bone-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {live && (
            <a
              href={socials.youtube.href}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-ember-500/40 bg-ember-500/15 px-4 py-2 text-xs font-medium text-ember-400 sm:flex"
            >
              <LiveDot /> Live now
            </a>
          )}
          <Button asChild variant="glory" size="sm" className="hidden h-10 px-5 sm:inline-flex">
            <Link href="/visit">
              Plan a visit
              <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md transition-colors hover:bg-white/10 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-ink-950 p-0 text-bone-100 sm:max-w-lg">
              <div className="relative flex h-full flex-col overflow-y-auto px-7 pt-24 pb-8">
                <div aria-hidden className="pointer-events-none absolute -top-40 right-[-30%] size-[34rem] rounded-full bg-glory-500/25 blur-[120px]" />
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.6 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group flex items-center justify-between border-b border-white/10 py-4 font-serif text-4xl transition-colors",
                            (item.href === "/" ? pathname === "/" : isActive(item.href)) ? "text-glory-300" : "hover:text-glory-200"
                          )}
                        >
                          {item.label}
                          <ArrowRight className="size-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-10 grid grid-cols-2 gap-3">
                  {gatherings.map((g) => (
                    <div key={g.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="eyebrow !text-[0.6rem] text-glory-300">{g.short}</p>
                      <p className="mt-2 text-sm text-bone-100/80">{g.timeLabel}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-bone-100/55">{church.address.full}</p>

                <div className="mt-auto flex items-center justify-between pt-10">
                  <SocialLinks />
                  <Button asChild variant="glory" size="sm">
                    <Link href="/visit" onClick={() => setOpen(false)}>Plan a visit</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
