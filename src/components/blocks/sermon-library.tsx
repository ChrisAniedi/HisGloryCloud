"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SermonCard } from "./sermon-card";
import { FacebookIcon, YouTubeIcon } from "@/components/site/social-icons";
import type { Message } from "@/lib/youtube";
import { socials } from "@/lib/site";
import { cn } from "@/lib/utils";

const PAGE = 9;

/** Sermon topics. Each filters the messages shown here by words in their titles, and links to
 *  the same search on the church's YouTube channel, where the full archive lives. */
const TOPICS: { label: string; words: string[]; query: string }[] = [
  { label: "All", words: [], query: "" },
  { label: "Faith", words: ["faith", "believe", "trust"], query: "faith" },
  { label: "Prayer life", words: ["pray", "prayer", "altar"], query: "prayer" },
  { label: "Remembrance", words: ["remember", "remembrance", "forgotten", "forget"], query: "remember" },
  { label: "Purpose & destiny", words: ["purpose", "destiny", "season", "story", "final", "standing"], query: "destiny" },
  { label: "Deliverance", words: ["deliver", "free", "coming out", "abandon", "confront", "evidence"], query: "deliverance" },
  { label: "The Holy Spirit", words: ["spirit", "holy ghost", "anoint", "fire"], query: "holy spirit" },
  { label: "Grace & mercy", words: ["grace", "mercy", "apolog", "forgive"], query: "grace" },
  { label: "The Word", words: ["word", "scripture", "bible", "vessel"], query: "word" },
  { label: "The Kingdom", words: ["kingdom", "glory", "reason", "god"], query: "kingdom" },
];

/** The sermon library: search, topic chips (as on bhmglobal.org/sermons) and a grid of messages. */
export function SermonLibrary({ items }: { items: Message[] }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [shown, setShown] = useState(PAGE);
  const chips = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((m) => {
      const title = m.title.toLowerCase();
      const okTopic = topic.words.length === 0 || topic.words.some((w) => title.includes(w));
      return okTopic && (!t || title.includes(t));
    });
  }, [items, q, topic]);

  const ytSearch = (term: string) => `${socials.youtube.href}/search?query=${encodeURIComponent(term)}`;
  const archiveTerm = q.trim() || topic.query;
  const scrollChips = (d: 1 | -1) => chips.current?.scrollBy({ left: d * 280, behavior: "smooth" });

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
          placeholder="Search sermons"
          className="h-14 w-full rounded-full bg-white pr-12 pl-13 text-lg shadow-[0_14px_36px_-22px_rgba(35,29,23,0.45)] ring-1 ring-line outline-none placeholder:text-muted focus:ring-2 focus:ring-red/40"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full hover:bg-paper">
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* topic chips */}
      <div className="relative mt-10 flex items-center gap-2">
        <button type="button" onClick={() => scrollChips(-1)} aria-label="Scroll topics left" className="hidden size-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line hover:ring-ink/30 md:grid">
          <ChevronLeft className="size-4" />
        </button>
        <div ref={chips} role="tablist" aria-label="Sermon topics" className="flex flex-1 gap-2 overflow-x-auto py-1 [mask-image:linear-gradient(90deg,transparent,#000_24px,#000_calc(100%-24px),transparent)] px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOPICS.map((t) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={t.label === topic.label}
              onClick={() => {
                setTopic(t);
                setShown(PAGE);
              }}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold tracking-wide whitespace-nowrap uppercase transition-colors",
                t.label === topic.label ? "text-white" : "text-ink-soft ring-1 ring-line hover:bg-white"
              )}
            >
              {t.label === topic.label && <motion.span layoutId="topic-pill" className="absolute inset-0 -z-10 rounded-full bg-red" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => scrollChips(1)} aria-label="Scroll topics right" className="hidden size-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line hover:ring-ink/30 md:grid">
          <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "message" : "messages"}
        {topic.words.length ? ` on ${topic.label.toLowerCase()}` : ""}
        {q ? ` matching “${q}”` : ""} from the latest uploads
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

      {/* the full archive for this topic */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-night p-6 text-white sm:flex-row sm:items-center md:p-7">
        <div>
          <p className="font-display text-xl">{archiveTerm ? `More on “${q.trim() || topic.label}”` : "The full archive"}</p>
          <p className="mt-1 text-white/60">Every message is on the church’s YouTube channel and Facebook page.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={archiveTerm ? ytSearch(archiveTerm) : socials.youtube.href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-semibold text-night hover:bg-cream">
            <YouTubeIcon className="size-5 text-[#e0392f]" /> {archiveTerm ? "Search on YouTube" : "Open YouTube"}
          </a>
          <a href={socials.facebook.href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full px-5 font-semibold ring-1 ring-white/25 hover:ring-white/60">
            <FacebookIcon className="size-5" /> Facebook
          </a>
        </div>
      </div>

      {shown < list.length && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="inline-flex h-12 items-center rounded-full bg-night px-6 font-semibold text-white hover:bg-red">
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
