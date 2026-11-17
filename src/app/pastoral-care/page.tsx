import type { Metadata } from "next";
import { FormPage } from "@/components/site/form-page";
import { PastoralForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { pastoralOccasions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pastoral services",
  description: "Counselling, baby dedications, naming ceremonies, marriage thanksgivings and more — conducted with love, dignity and faith.",
};

export default function Page() {
  return (
    <FormPage
      eyebrow="Pastoral services"
      lines={[{ text: "Care for every" }, { text: "season of life.", em: true, className: "text-glory" }]}
      body="Our pastoral services nurture spiritual growth, offer guidance, and provide care for every member of the church family — rooted in compassion and the Word of God."
      formTitle="Book a pastoral service"
      formIntro="Tell us what you’re celebrating and the pastoral office will be in touch."
      aside={
        <>
          <Reveal>
            <p className="text-lg leading-relaxed text-bone-100/70">
              Our pastors are committed to supporting you through life’s challenges — through personal counselling, family guidance, or spiritual mentorship — and to celebrating your milestones with you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <h3 className="eyebrow text-bone-100/50">We can help with</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {pastoralOccasions.map((o) => (
                <li key={o} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone-100/80">
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      }
    >
      <PastoralForm />
    </FormPage>
  );
}
