import { cn } from "@/lib/utils";

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
      {kicker && <p className={cn("kicker", onDark && "!text-red-on-ink")}>{kicker}</p>}
      <h2 className="heading-2 mt-2">{title}</h2>
      {body && <div className={cn("mt-4 text-lg", onDark ? "text-on-ink-muted" : "text-muted")}>{body}</div>}
    </div>
  );
}
