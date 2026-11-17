"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** A row of cards you can scroll sideways, with arrow buttons and a progress line. */
export function Rail({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setP(max > 0 ? el.scrollLeft / max : 1);
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);
  useEffect(() => {
    const id = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", update);
    };
  }, [update]);
  const go = (d: 1 | -1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: d * (card.offsetWidth + 16), behavior: "smooth" });
  };
  return (
    <div className={className}>
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:w-[min(82vw,22rem)] [&>*]:shrink-0 [&>*]:snap-start"
        style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}
      >
        {children}
      </div>
      <div className="container-x mt-6 flex items-center gap-4">
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-line">
          <div className="h-full origin-left rounded-full bg-ink transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.1, p)})` }} />
        </div>
        <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous" className={cn("grid size-11 place-items-center rounded-full ring-1 ring-line transition hover:ring-ink/40 disabled:opacity-30")}>
          <ArrowLeft className="size-5" />
        </button>
        <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Next" className="grid size-11 place-items-center rounded-full bg-night text-white transition hover:bg-red disabled:opacity-30">
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
