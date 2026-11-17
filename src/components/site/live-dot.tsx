import { cn } from "@/lib/utils";

export function LiveDot({ className, color = "bg-ember-500" }: { className?: string; color?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden>
      <span className={cn("absolute inset-0 animate-pulse-ring rounded-full", color)} />
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}
