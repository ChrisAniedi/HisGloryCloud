import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, HandHeart, MessageCircleHeart, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { media } from "@/lib/site";
import { cn } from "@/lib/utils";

type Card = {
  href: string;
  kicker: string;
  title: string;
  body: string;
  span: string;
  image?: string | null;
  imagePos?: string;
  tone?: "red" | "night" | "cream" | "white";
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const cards: Card[] = [
  { href: "/salvation", kicker: "New life", title: "I just gave my life to Jesus", body: "Welcome to the family. We’ll walk with you as you grow.", span: "lg:col-span-7", image: media.thanksgiving, imagePos: "object-[50%_30%]" },
  { href: "/prayer", kicker: "Prayer", title: "I need someone to pray with me", body: "Our prayer squad will stand in agreement with you.", span: "lg:col-span-5", image: media.prayer, imagePos: "object-[55%_40%]" },
  { href: "/testimony", kicker: "Testimony", title: "God did something for me", body: "Share it, and build someone else’s faith.", span: "lg:col-span-3", tone: "red", Icon: MessageCircleHeart },
  { href: "/serve", kicker: "Workforce", title: "I want to serve", body: "Choir, media, ushering, protocol and more.", span: "lg:col-span-3", tone: "night", Icon: Users },
  { href: "/training", kicker: "Training", title: "Equip me to lead", body: "Ministry training. Next session in 2026.", span: "lg:col-span-3", tone: "cream", Icon: BookOpen },
  { href: "/pastoral-care", kicker: "Pastoral care", title: "Stand with my family", body: "Dedications, thanksgivings, counselling.", span: "lg:col-span-3", tone: "white", Icon: HandHeart },
];

const tones = {
  red: "bg-red text-white",
  night: "bg-night text-white",
  cream: "bg-cream text-night",
  white: "bg-white text-night border border-line",
} as const;

/** "Take your next step": photo cards for the big moments, colour cards for the rest. */
export function NextSteps({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section-y">
      <div className="container-x">
        {heading && (
          <SectionIntro chip="Next steps" title="Wherever you are with God, take the next step" body="A real person from our team reads every form and gets back to you." />
        )}

        <div className={cn("grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-12", heading && "mt-12")}>
          {cards.map((c, i) => {
            const photo = !!c.image;
            return (
              <Reveal key={c.href} delay={0.05 * i} className={cn(c.span, photo && "col-span-2")}>
                <Link
                  href={c.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[22px] p-5 md:p-7",
                    photo ? "min-h-[22rem] justify-end text-white md:min-h-[26rem]" : cn("min-h-[15rem] justify-between md:min-h-[17rem]", tones[c.tone ?? "white"])
                  )}
                >
                  {photo && (
                    <>
                      <Image src={c.image!} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className={cn("-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.04]", c.imagePos)} />
                      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                    </>
                  )}
                  {!photo && c.Icon && <c.Icon className="size-7" strokeWidth={1.5} />}
                  <div>
                    <p className={cn("text-sm font-medium", photo ? "text-white/70" : "opacity-70")}>{c.kicker}</p>
                    <h3 className={cn("mt-1.5 font-medium tracking-[-0.03em]", photo ? "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]" : "text-[1.2rem] leading-[1.1] md:text-[1.5rem]")}>{c.title}</h3>
                    <p className={cn("mt-2", photo ? "max-w-md text-white/75" : "text-[0.95rem] opacity-75 md:text-base")}>{c.body}</p>
                    <span
                      className={cn(
                        "mt-5 inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors",
                        photo ? "bg-white text-night" : c.tone === "white" || c.tone === "cream" ? "bg-night text-white" : "bg-white/15 group-hover:bg-white/25"
                      )}
                    >
                      Start here <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
