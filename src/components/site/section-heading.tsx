import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <span className="eyebrow flex items-center gap-3 text-glory-500 [.dark-section_&]:text-glory-300">
            <span className="h-px w-8 bg-current" /> {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={cn("text-display text-5xl text-balance md:text-7xl", titleClassName)}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <div className={cn("max-w-xl text-lg leading-relaxed text-muted-foreground", align === "center" && "mx-auto")}>{body}</div>
        </Reveal>
      )}
    </div>
  );
}
