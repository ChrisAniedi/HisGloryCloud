import Link from "next/link";
import { cn } from "@/lib/utils";

/** HGC mark: a pillar of light rising out of the cloud (Exodus 13:21). */
export function LogoMark({ className, mono = false }: { className?: string; mono?: boolean }) {
  if (mono)
    return (
      <svg viewBox="0 0 40 40" fill="none" className={cn("size-9", className)} aria-hidden>
        <rect x="18.4" y="3" width="3.2" height="18" rx="1.6" fill="currentColor" />
        <path d="M11 9.5 13.2 12M29 9.5 26.8 12M7.5 16h3M29.5 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 33.5a5.6 5.6 0 0 1 3.1-10.3 8.4 8.4 0 0 1 16-.6 5.4 5.4 0 0 1 4.9 10.9z" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" fill="none" className={cn("size-9", className)} aria-hidden>
      <defs>
        <linearGradient id="hgc-g" x1="20" y1="2" x2="20" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7E3B8" />
          <stop offset="0.55" stopColor="#E8B86B" />
          <stop offset="1" stopColor="#B07A2C" />
        </linearGradient>
        <radialGradient id="hgc-r" cx="20" cy="14" r="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7E3B8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F7E3B8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="14" r="14" fill="url(#hgc-r)" />
      <rect x="18.4" y="3" width="3.2" height="18" rx="1.6" fill="url(#hgc-g)" />
      <path d="M11 9.5 13.2 12M29 9.5 26.8 12M7.5 16h3M29.5 16h3" stroke="url(#hgc-g)" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M8 33.5a5.6 5.6 0 0 1 3.1-10.3 8.4 8.4 0 0 1 16-.6 5.4 5.4 0 0 1 4.9 10.9z"
        fill="url(#hgc-g)"
      />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="His Glory Cloud Church — home">
      <LogoMark className="transition-transform duration-700 ease-[var(--ease-glory)] group-hover:-translate-y-0.5" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.35rem] tracking-tight">His Glory Cloud</span>
          <span className="eyebrow mt-1 !text-[0.58rem] text-current/55">Church · Glory Tent</span>
        </span>
      )}
    </Link>
  );
}
