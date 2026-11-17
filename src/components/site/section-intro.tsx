import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** The label chip that sits over a section heading, as in the hero. */
export function Chip({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1 pr-3.5 pl-2 text-sm font-medium",
        onDark ? "bg-white/[0.07] text-white/80 ring-1 ring-white/15" : "bg-white text-ink-soft shadow-[0_6px_18px_-12px_rgba(35,29,23,0.4)] ring-1 ring-line",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", onDark ? "bg-glow" : "bg-red")} />
      {children}
    </span>
  );
}

/** Chip, heading and a line of intro, centred (or left-aligned beside an action). */
export function SectionIntro({
  chip,
  title,
  body,
  align = "center",
  onDark = false,
  className,
}: {
  chip: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <Chip onDark={onDark}>{chip}</Chip>
      <h2 className="heading-2 mt-5">{title}</h2>
      {body && <p className={cn("mt-4 text-lg", align === "center" && "mx-auto max-w-xl", onDark ? "text-white/65" : "text-muted")}>{body}</p>}
    </Reveal>
  );
}
