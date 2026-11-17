import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Watch } from "@/components/sections/watch";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Watch online",
  description: "Watch His Glory Cloud Church live on YouTube every Sunday from 9AM WAT.",
};

export default function WatchPage() {
  return (
    <>
      <PageHero
        kicker="Watch online"
        title="Church, wherever you are"
        intro="Every Sunday from 9am (WAT) the service goes out live on YouTube. Worship with us, hear the Word and stay part of the family from anywhere."
      />
      <Watch />
      <CtaBand title="Watching online? Come and say hello" body="Nothing replaces being in the room. Plan a visit to the Glory Tent. We’d love to meet you." />
    </>
  );
}
