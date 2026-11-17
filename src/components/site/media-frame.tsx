import Image from "next/image";
import { LogoMark } from "./logo";
import { cn } from "@/lib/utils";

/** A photo with an optional caption underneath. Without a photo, a plain placeholder. */
export function MediaFrame({
  src,
  alt,
  caption,
  className,
  frameClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  onDark = false,
}: {
  src?: string | null;
  alt: string;
  caption?: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
  onDark?: boolean;
}) {
  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden rounded-md", onDark ? "bg-ink-soft" : "bg-sand", frameClassName)}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <LogoMark className="h-16 opacity-30" />
            <span className="sr-only">{alt}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className={cn("mt-2.5 text-sm", onDark ? "text-on-ink-muted" : "text-muted")}>{caption}</figcaption>}
    </figure>
  );
}
