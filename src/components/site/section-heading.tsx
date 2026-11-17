import { Chip } from "./section-intro";
import { cn } from "@/lib/utils";

/** Section heading for inner pages: label chip, heading and an optional line of intro. */
export function SectionHeading({
  kicker,
  title,
  body,
  className,
  onDark = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && <Chip onDark={onDark}>{kicker}</Chip>}
      <h2 className={cn("heading-2", kicker && "mt-5")}>{title}</h2>
      {body && <div className={cn("mt-4 text-lg", onDark ? "text-white/65" : "text-muted")}>{body}</div>}
    </div>
  );
}
