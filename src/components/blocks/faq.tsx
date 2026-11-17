"use client";

import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/site/section-intro";
import { cn } from "@/lib/utils";

/** Questions on the left, answers in soft cards on the right. */
export function Faq({ items, title = "Questions people ask", chip = "FAQ", className }: { items: readonly { q: string; a: string }[]; title?: string; chip?: string; className?: string }) {
  return (
    <section className={cn("section-y", className)}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Chip>{chip}</Chip>
          <h2 className="heading-2 mt-5">{title}</h2>
          <p className="mt-4 max-w-sm text-lg text-muted">Something else on your mind? Message us and someone will get back to you.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <A.Root type="single" collapsible defaultValue="0" className="space-y-2.5">
            {items.map((f, i) => (
              <A.Item key={f.q} value={String(i)} className="group rounded-[20px] bg-white ring-1 ring-line transition-shadow data-[state=open]:shadow-[0_20px_44px_-28px_rgba(35,29,23,0.45)]">
                <A.Header>
                  <A.Trigger className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-medium tracking-tight">
                    {f.q}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper text-ink transition-[transform,background-color,color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-night group-data-[state=open]:text-white">
                      <Plus className="size-4" />
                    </span>
                  </A.Trigger>
                </A.Header>
                <A.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-6 pb-6 text-muted">{f.a}</p>
                </A.Content>
              </A.Item>
            ))}
          </A.Root>
        </Reveal>
      </div>
    </section>
  );
}
