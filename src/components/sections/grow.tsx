import Link from "next/link";
import { ArrowUpRight, BookOpen, HeartHandshake, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Badge } from "@/components/ui/badge";

const paths = [
  {
    href: "/training",
    Icon: BookOpen,
    eyebrow: "Ministry Training",
    title: "Be equipped to lead.",
    body: "6–12 week programs in Spiritual Growth, Biblical Leadership, Evangelism, Discipleship and more — with a certificate on completion.",
    badge: "Next session · 2026",
  },
  {
    href: "/pastoral-care",
    Icon: HeartHandshake,
    eyebrow: "Pastoral Services",
    title: "Life’s moments, held in faith.",
    body: "Baby dedications, marriage thanksgivings, house warmings, counselling and more — conducted with love, dignity and faith.",
  },
  {
    href: "/serve",
    Icon: Users,
    eyebrow: "The Workforce",
    title: "Serve in His sanctuary.",
    body: "From the choir and media to protocol and the prayer squad — find your place on Christ’s team.",
  },
];

export function Grow() {
  return (
    <section className="theme-light section-y relative z-10 -mt-14 rounded-[2.5rem] md:rounded-[3.5rem]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Grow with us"
          title={<>Planted, rooted, <em className="text-glory-600">raised.</em></>}
          body="We’re committed to nurturing faith and developing purpose-driven leaders for Christ. Here’s how to go deeper."
        />
        <Stagger className="mt-16 grid gap-4 lg:grid-cols-3" gap={0.1}>
          {paths.map(({ Icon, ...p }) => (
            <StaggerItem key={p.href}>
              <Link href={p.href} className="group block h-full rounded-[1.75rem]">
                <SpotlightCard
                  color="rgba(214,156,69,0.16)"
                  className="flex h-full min-h-[24rem] flex-col rounded-[1.75rem] border border-border bg-card p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-ink-900/25 md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-ink-900 text-glory-300">
                      <Icon className="size-5" />
                    </span>
                    {p.badge && <Badge variant="outline" className="border-glory-600/30 text-glory-600">{p.badge}</Badge>}
                  </div>
                  <p className="eyebrow mt-auto pt-14 text-glory-600">{p.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-[1.02]">{p.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
