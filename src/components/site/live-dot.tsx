import { cn } from "@/lib/utils";

export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-2 shrink-0 rounded-full bg-[#e0392f]", className)} aria-hidden />;
}
