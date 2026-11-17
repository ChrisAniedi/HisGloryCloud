import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Watch } from "@/components/sections/watch";
import { CtaBand } from "@/components/site/cta-band";
import { Button } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/site/social-icons";
import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch online",
  description: "Watch His Glory Cloud Church live on YouTube every Sunday from 9AM WAT.",
};

export default function WatchPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch online"
        lines={[{ text: "The Glory Tent," }, { text: "streaming worldwide.", em: true, className: "text-glory" }]}
        body="Every Sunday from 9:00 AM (WAT), the Glory Tent goes live. Worship with us, receive the Word, and be part of the family from anywhere."
      >
        <Button asChild variant="ember" size="xl">
          <a href={socials.youtube.href} target="_blank" rel="noreferrer">
            <YouTubeIcon /> Subscribe on YouTube
          </a>
        </Button>
      </PageHero>
      <Watch />
      <CtaBand
        title={<>Watching online? <em className="text-glory">Come say hello.</em></>}
        body="Nothing replaces being in the room. Plan a visit to the Glory Tent — we’d love to meet you."
      />
    </>
  );
}
