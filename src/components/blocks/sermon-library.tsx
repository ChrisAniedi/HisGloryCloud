"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SermonCard } from "./sermon-card";
import type { Message } from "@/lib/youtube";
import { socials } from "@/lib/site";

const PAGE = 9;

/** The sermon grid with a search box. Titles come from the church's YouTube channel. */
export function SermonLibrary({ items }: { items: Message[] }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? items.filter((m) => m.title.toLowerCase().includes(t)) : items;
  }, [items, q]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <label htmlFor="sermon-search" className="sr-only">Search sermons</label>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" />
        <input
          id="sermon-search"
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShown(PAGE);
          }}
          placeholder="Search sermons by title"
          className="h-14 w-full rounded-full bg-white pr-12 pl-13 text-lg shadow-[0_14px_36px_-22px_rgba(35,29,23,0.45)] ring-1 ring-line outline-none placeholder:text-muted focus:ring-2 focus:ring-red/40"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full hover:bg-paper">
            <X className="size-4" />
          </button>
        )}
      </div>

      <p className="mt-10 text-sm text-muted" aria-live="polite">
        {q ? `${list.length} ${list.length === 1 ? "message" : "messages"} for “${q}”` : `The latest ${items.length} messages`}
      </p>

      <motion.ul layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.slice(0, shown).map((m) => (
            <motion.li key={m.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
              <SermonCard m={m} showDate className="h-full" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <p className="mt-8 rounded-[20px] bg-white p-8 text-center text-muted ring-1 ring-line">
          Nothing here yet for “{q}”. Try another word, or{" "}
          <a href={socials.youtube.href} target="_blank" rel="noreferrer" className="font-semibold text-red underline underline-offset-4">search the full channel on YouTube</a>.
        </p>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {shown < list.length && (
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="inline-flex h-12 items-center rounded-full bg-night px-6 font-semibold text-white hover:bg-red">
            Show more
          </button>
        )}
        <a href={socials.youtube.href} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center rounded-full bg-white px-6 font-semibold ring-1 ring-line hover:ring-ink/30">
          Every message on YouTube
        </a>
      </div>
    </div>
  );
}
