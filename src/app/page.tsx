import { Hero } from "@/components/sections/hero";
import { Interlude } from "@/components/sections/interlude";
import { Welcome, type WelcomeCard } from "@/components/sections/welcome";
import { Mission } from "@/components/sections/mission";
import { Ways } from "@/components/sections/ways";
import { Messages } from "@/components/sections/messages";
import { Ministries } from "@/components/sections/ministries";
import { Vision } from "@/components/sections/vision";
import { NextStepsList } from "@/components/sections/next-steps-list";
import { FirstSunday } from "@/components/sections/first-sunday";
import { Gatherings } from "@/components/sections/gatherings";
import { Give } from "@/components/sections/give";
import { media } from "@/lib/site";

export default function HomePage() {
  const welcome = [
    media.thanksgiving && { label: "Who we are", title: "About us", href: "/about", image: media.thanksgiving, position: "50% 25%" },
    media.prayer && { label: "Join us on Sunday", title: "Plan a visit", href: "/visit", image: media.prayer, position: "55% 35%" },
    media.worship && { label: "Wherever you are", title: "Watch online", href: "/watch", image: media.worship, position: "50% 22%" },
  ].filter(Boolean) as WelcomeCard[];

  return (
    <>
      <Hero />
      <Interlude />
      <Welcome cards={welcome} />
      <Mission />
      <Ways />
      <Messages />
      <Ministries />
      <Vision />
      <NextStepsList />
      <FirstSunday />
      <Gatherings />
      <Give />
    </>
  );
}
