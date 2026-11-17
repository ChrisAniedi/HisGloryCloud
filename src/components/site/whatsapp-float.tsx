"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./social-icons";
import { waLink } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;
const SEEN = "hgc-help-hint";

/**
 * A round WhatsApp button in the corner of every page, for prayer, counselling and help.
 * The label slides out on hover; once a visit a small note appears beside it. Without a
 * WhatsApp number configured (site.ts `contact`), it opens the pastoral care page instead.
 */
export function WhatsAppFloat() {
  const [hint, setHint] = useState(false);
  const href = waLink("Hello HGC, I would like some help (prayer / counselling).");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen) return;
    const show = setTimeout(() => {
      setHint(true);
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {}
    }, 9000);
    const hide = setTimeout(() => setHint(false), 18000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const cls =
    "group relative flex h-14 items-center rounded-full bg-night px-[18px] text-white shadow-[0_18px_40px_-14px_rgba(20,16,13,0.7)] ring-1 ring-white/10 transition-[padding,background-color] duration-500 ease-[var(--ease-out-soft)] hover:bg-ink-soft hover:pr-6";
  const inner = (
    <>
      <span aria-hidden className="absolute top-1/2 left-[28px] size-8 -translate-1/2 animate-ping rounded-full bg-[#25d366]/25 [animation-duration:2.6s]" />
      <span className="relative grid size-[22px] place-items-center text-[#25d366]">
        <WhatsAppIcon className="size-[22px]" />
      </span>
      <span className="max-w-0 overflow-hidden text-[0.93rem] font-medium whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-500 group-hover:ml-3 group-hover:max-w-[180px] group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-[180px] group-focus-visible:opacity-100">
        {href ? "Chat with us" : "Need help?"}
      </span>
    </>
  );

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            className="relative mb-2 hidden max-w-[250px] rounded-2xl rounded-br-md bg-white p-4 pr-9 text-[0.9rem] text-ink shadow-[0_20px_50px_-20px_rgba(35,29,23,0.5)] ring-1 ring-line sm:block"
          >
            <p className="font-semibold">Need prayer or counselling?</p>
            <p className="mt-1 text-muted">{href ? "Message our pastoral team on WhatsApp." : "Our pastoral team is here for you."}</p>
            <button type="button" onClick={() => setHint(false)} aria-label="Dismiss" className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-muted hover:bg-paper">
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2, ease }}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with His Glory Cloud Church on WhatsApp (opens WhatsApp)" className={cls}>
            {inner}
          </a>
        ) : (
          <Link href="/pastoral-care" aria-label="Need help? Contact our pastoral team" className={cls}>
            {inner}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
