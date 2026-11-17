import Image from "next/image";
import { Atmosphere } from "@/components/motion/glory-cloud";
import { LogoMark } from "./logo";
import { cn } from "@/lib/utils";

/**
 * Renders real photography when provided; otherwise an art-directed
 * generative placeholder so layouts never look broken pre-launch.
 */
export function MediaFrame({
  src,
  alt,
  tone = "glory",
  caption,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string | null;
  alt: string;
  tone?: "glory" | "ember" | "dusk" | "dawn";
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-[1.75rem]", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <Atmosphere tone={tone} className="absolute inset-0">
          <div className="absolute inset-0 grid place-items-center">
            <LogoMark mono className="size-14 text-bone-50/25" />
          </div>
          <span className="sr-only">{alt}</span>
        </Atmosphere>
      )}
      {caption && (
        <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-ink-950/50 px-3 py-1.5 text-xs text-bone-100/85 backdrop-blur-md">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
