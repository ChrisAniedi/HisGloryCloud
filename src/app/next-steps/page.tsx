import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { NextSteps } from "@/components/sections/next-steps";
import { Grow } from "@/components/sections/grow";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Next steps",
  description: "Salvation, prayer, testimony, serving, training and pastoral care — find your next step at His Glory Cloud Church.",
};

export default function NextStepsPage() {
  return (
    <>
      <PageHero
        eyebrow="Next steps"
        lines={[{ text: "Your journey" }, { text: "starts here.", em: true, className: "text-glory" }]}
        body="Wherever you are with God today, there’s a next step — and a family ready to take it with you."
      />
      <NextSteps />
      <div className="bg-ink-900 pt-28" />
      <Grow />
      <div className="bg-ink-900 pt-[clamp(5rem,10vw,8rem)]" />
      <CtaBand />
    </>
  );
}
