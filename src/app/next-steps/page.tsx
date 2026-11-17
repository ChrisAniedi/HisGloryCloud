import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { NextSteps } from "@/components/sections/next-steps";
import { stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Next steps",
  description: "Salvation, prayer, testimony, serving, training and pastoral care — find your next step at His Glory Cloud Church.",
};

export default function NextStepsPage() {
  return (
    <>
      <PageHero
        kicker="Next steps"
        image={stock.worshipService}
        title="Where are you with God today?"
        intro="Wherever you are, there’s a next step, and people ready to take it with you. Pick the one that sounds like you."
      />
      <NextSteps heading={false} />
    </>
  );
}
