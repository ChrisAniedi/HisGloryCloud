import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Interior page header: plain title and intro, with an optional photo beside it. */
export function PageHero({
  kicker,
  title,
  intro,
  crumb,
  image,
  children,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumb?: string;
  image?: { src: string; alt: string; caption?: string } | null;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-line pt-20 md:pt-24", className)}>
      <div className={cn("container-x grid gap-10 py-12 md:py-16", image && "lg:grid-cols-12 lg:items-center lg:gap-14")}>
        <div className={cn(image ? "lg:col-span-7" : "max-w-3xl")}>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">Home</Link>
            <span className="px-2" aria-hidden>/</span>
            <span aria-current="page">{crumb ?? kicker}</span>
          </nav>
          <p className="kicker">{kicker}</p>
          <h1 className="heading-1 mt-3">{title}</h1>
          {intro && <div className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sand lg:aspect-[4/5]">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            {image.caption && <figcaption className="mt-2.5 text-sm text-muted">{image.caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
