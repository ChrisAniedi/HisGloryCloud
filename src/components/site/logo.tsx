import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The HGC heart-and-dove mark, cropped from the church's own logo. */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Image
      src={onDark ? "/media/hgc-mark-light.png" : "/media/hgc-mark.png"}
      alt=""
      width={151}
      height={222}
      className={cn("h-10 w-auto", className)}
    />
  );
}

export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="His Glory Cloud Church, home">
      <LogoMark onDark={onDark} />
      <span className="flex flex-col leading-tight">
        <span className="text-[0.98rem] font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-[1.08rem]">His Glory Cloud Church</span>
        <span className={cn("text-[0.78rem]", onDark ? "text-white/60" : "text-muted")}>Glory Tent · Egbeda, Lagos</span>
      </span>
    </Link>
  );
}
