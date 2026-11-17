"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPin, X } from "lucide-react";
import { SocialLinks } from "./social-icons";
import { church, mapsUrl, nextStepLinks } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

/** "Take the next step": a side panel with the four next steps, as on the church's current site. */
export function NextStepPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const pathname = usePathname();
  useEffect(() => onOpenChange(false), [pathname, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[85] bg-night/50 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount aria-describedby={undefined} asChild>
              <motion.div
                className="fixed inset-y-0 right-0 z-[86] flex w-full max-w-[30rem] flex-col overflow-y-auto bg-paper text-ink shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center justify-between px-7 pt-6">
                  <span className="text-sm font-medium text-muted">Next step</span>
                  <Dialog.Close className="grid size-11 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-white" aria-label="Close">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <div className="flex flex-1 flex-col px-7 pt-6 pb-8">
                  <Dialog.Title className="text-[2rem] leading-[1.05] font-medium tracking-[-0.035em]">
                    Take the next step. <span className="text-muted">We’re with you every step of the way.</span>
                  </Dialog.Title>

                  <ul className="mt-8 space-y-2.5">
                    {nextStepLinks.map((s, i) => (
                      <motion.li key={s.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease }}>
                        <Link href={s.href} className="group flex items-center gap-4 rounded-[18px] bg-white p-4 ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-20px_rgba(35,29,23,0.45)]">
                          <span className="min-w-0 flex-1">
                            <span className="block text-lg font-medium tracking-tight">{s.title}</span>
                            <span className="mt-0.5 block text-[0.95rem] text-muted">{s.body}</span>
                          </span>
                          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-red transition-colors group-hover:bg-red group-hover:text-white">
                            <ArrowRight className="size-4" />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div className="mt-auto pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
                    <div className="rounded-[20px] bg-night p-6 text-white">
                      <p className="text-sm text-white/55">Join us every Sunday</p>
                      <p className="mt-1 text-2xl font-medium tracking-tight">9am – 12pm</p>
                      <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-4 flex gap-2 text-white/75 hover:text-white">
                        <MapPin className="mt-1 size-4 shrink-0 text-cream" />
                        {church.address.full.replace(", Nigeria", "")}
                      </a>
                      <SocialLinks className="mt-5" itemClassName="rounded-full border-white/15 text-white/80 hover:border-white/50 hover:text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
