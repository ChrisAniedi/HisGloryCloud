import { Hero } from "@/components/sections/hero";
import { WorshipWithUs } from "@/components/blocks/worship-with-us";
import { Interlude } from "@/components/sections/interlude";
import { Welcome, type WelcomeCard } from "@/components/sections/welcome";
import { Mission } from "@/components/sections/mission";
import { Messages } from "@/components/sections/messages";
import { Ministries } from "@/components/sections/ministries";
import { Vision } from "@/components/sections/vision";
import { NextStepsList } from "@/components/sections/next-steps-list";
import { FirstSunday } from "@/components/sections/first-sunday";
import { Give } from "@/components/sections/give";
import { Faq } from "@/components/blocks/faq";
import { ClosingBand } from "@/components/blocks/closing-band";
import { generalFaqs, media, stock } from "@/lib/site";

export default function HomePage() {
  const cards = [
    media.thanksgiving && { label: "Who we are", title: "About us", href: "/about", image: media.thanksgiving, position: "50% 25%" },
    { label: "Go deeper", title: "Grow", href: "/grow", image: stock.choir.src, position: "50% 30%" },
    media.worship && { label: "Find your family", title: "Community", href: "/community", image: media.worship, position: "50% 22%" },
  ].filter(Boolean) as WelcomeCard[];

  return (
    <>
      <Hero />
      <div className="pt-2 md:pt-3">
        <WorshipWithUs />
      </div>
      <Interlude />
      <Welcome cards={cards} />
      <Mission />
      <Messages />
      <Ministries />
      <Vision />
      <NextStepsList />
      <FirstSunday />
      <Give />
      <Faq items={generalFaqs} />
      <ClosingBand />
    </>
  );
}
