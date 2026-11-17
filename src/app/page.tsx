import { Hero } from "@/components/sections/hero";
import { PillarsMarquee } from "@/components/sections/pillars-marquee";
import { Intro } from "@/components/sections/intro";
import { NextSteps } from "@/components/sections/next-steps";
import { Gatherings } from "@/components/sections/gatherings";
import { Watch } from "@/components/sections/watch";
import { Belong } from "@/components/sections/belong";
import { Vision } from "@/components/sections/vision";
import { Grow } from "@/components/sections/grow";
import { Give } from "@/components/sections/give";
import { CtaBand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsMarquee />
      <Intro />
      <NextSteps />
      <Gatherings />
      <Watch />
      <Belong />
      <Vision />
      <Grow />
      <Give />
      <CtaBand />
    </>
  );
}
