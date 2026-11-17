import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Watch } from "@/components/sections/watch";
import { stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch online",
  description: "Watch His Glory Cloud Church live on YouTube every Sunday from 9AM WAT.",
};

export default function WatchPage() {
  return (
    <>
      <PageHero
        kicker="Watch online"
        image={stock.auditorium}
        title="Church, wherever you are"
        intro="Every Sunday from 9am (WAT) the service goes out live on YouTube. Worship with us, hear the Word and stay part of the family from anywhere."
      />
      <Watch />
    </>
  );
}
