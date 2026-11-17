"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-icons";
import { church, gatherings, mapsUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const main = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Plan a visit", href: "/visit" },
  { label: "Watch online", href: "/watch" },
  { label: "Next steps", href: "/next-steps" },
  { label: "Give", href: "/give" },
];

const steps = [
  { label: "I gave my life to Jesus", href: "/salvation" },
  { label: "Prayer request", href: "/prayer" },
  { label: "Share a testimony", href: "/testimony" },
  { label: "Join the workforce", href: "/serve" },
  { label: "Ministry training", href: "/training" },
  { label: "Pastoral services", href: "/pastoral-care" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** The full menu: every page, the next steps, and when and where to find us. */
export function MenuOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const pathname = usePathname();
  useEffect(() => onOpenChange(false), [pathname, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount id="site-menu" aria-describedby={undefined} asChild>
              <motion.div
                className="fixed inset-0 z-[80] overflow-y-auto bg-night text-white"
                initial={{ clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)" }}
                animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0px 0px)" }}
                exit={{ clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)" }}
                transition={{ duration: 0.7, ease }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="container-x flex min-h-full flex-col pt-[18px] pb-10">
                  <div className="flex h-16 items-center justify-between">
                    <Logo onDark />
                    <Dialog.Close className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/10 pr-4 pl-5 font-semibold ring-1 ring-white/20 ring-inset transition-colors hover:bg-white/20">
                      Close <X className="size-5" />
                    </Dialog.Close>
                  </div>

                  <div className="mt-10 grid flex-1 gap-12 lg:grid-cols-12">
                    <nav aria-label="Main menu" className="lg:col-span-6">
                      <ul>
                        {main.map((m, i) => (
                          <motion.li key={m.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}>
                            <Link
                              href={m.href}
                              className={cn(
                                "group flex items-center justify-between border-b border-white/10 py-3 text-[clamp(2rem,4.4vw,3.4rem)] leading-tight font-light tracking-[-0.04em] transition-colors",
                                pathname === m.href ? "text-cream" : "text-white hover:text-cream"
                              )}
                            >
                              {m.label}
                              <ArrowUpRight className="size-7 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>

                    <motion.div className="lg:col-span-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
                      <h2 className="text-sm text-white/50">Take a next step</h2>
                      <ul className="mt-4 space-y-3">
                        {steps.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} className="text-lg text-white/85 transition-colors hover:text-cream">
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div className="flex flex-col gap-6 lg:col-span-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
                      <div>
                        <h2 className="text-sm text-white/50">Services</h2>
                        <ul className="mt-4 space-y-3">
                          {gatherings.map((g) => (
                            <li key={g.id}>
                              <span className="block text-lg">{g.name}</span>
                              <span className="text-white/60">{g.dayLabel}, {g.timeLabel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex gap-2 text-white/75 hover:text-white">
                        <MapPin className="mt-1 size-4 shrink-0 text-cream" />
                        <span>{church.address.line1}, {church.address.line2}, {church.address.city}</span>
                      </a>
                      <Link href="/visit" className="group inline-flex h-12 items-center justify-between gap-2 self-start rounded-full bg-cream pr-1.5 pl-5 font-semibold text-night hover:bg-white">
                        Plan a visit
                        <span className="grid size-9 place-items-center rounded-full bg-night text-cream transition-transform group-hover:rotate-45">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </Link>
                      <SocialLinks className="mt-auto" itemClassName="rounded-full border-white/15 text-white/80 hover:border-white/50 hover:text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
