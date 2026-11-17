import type { Metadata } from "next";
import { FormPage } from "@/components/site/form-page";
import { PastoralForm } from "@/components/forms/forms";
import { pastoralOccasions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pastoral services",
  description: "Counselling, baby dedications, naming ceremonies, marriage thanksgivings and more — conducted with love, dignity and faith.",
};

export default function Page() {
  return (
    <FormPage
      kicker="Pastoral services"
      title="Care for every season of life"
      intro="Our pastoral services offer guidance and care for every member of the church family, rooted in compassion and the Word of God."
      formTitle="Book a pastoral service"
      formIntro="Tell us what you’re celebrating or going through, and the pastoral office will be in touch."
      aside={
        <>
          <p className="text-lg text-muted">
            Our pastors are here for life’s hard moments, through counselling, family guidance or spiritual mentorship, and
            they’d love to celebrate your milestones with you too.
          </p>
          <div className="mt-10">
            <h3 className="text-lg font-semibold">We can help with</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 border-t border-line">
              {pastoralOccasions.map((o) => (
                <li key={o} className="border-b border-line py-2.5 text-muted">{o}</li>
              ))}
            </ul>
          </div>
        </>
      }
    >
      <PastoralForm />
    </FormPage>
  );
}
