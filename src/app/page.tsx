import { Hero } from "@/components/sections/hero";
import { WorshipWithUs } from "@/components/blocks/worship-with-us";
import { Welcome, type WelcomeCard } from "@/components/sections/welcome";
import { Mission } from "@/components/sections/mission";
import { Messages } from "@/components/sections/messages";
import { Ministries } from "@/components/sections/ministries";
import { Vision } from "@/components/sections/vision";
import { NextStepsList } from "@/components/sections/next-steps-list";
import { FirstSunday } from "@/components/sections/first-sunday";
import { Give } from "@/components/sections/give";
import { Faq } from "@/components/blocks/faq";
import { church, generalFaqs, media, stock } from "@/lib/site";

export default function HomePage() {
  const cards = [
    media.thanksgiving && {
      label: "Who we are",
      title: "About us",
      body: "A family of joyful believers raising Kingdom builders for God’s glory.",
      badge: `Since ${church.founded.slice(0, 4)}`,
      info: "One family · Every nation · His glory",
      cta: "Our story",
      href: "/about",
      image: media.thanksgiving,
      position: "50% 25%",
    },
    media.prayer && {
      label: "Join us on Sunday",
      title: "Plan a visit",
      body: "Greeters meet you at the door. Come as you are, and we’ll help you find a seat.",
      badge: "Sundays 9am",
      info: `${church.address.line1}, ${church.address.line2}`,
      cta: "Plan it",
      href: "/visit",
      image: media.prayer,
      position: "55% 35%",
    },
    media.worship && {
      label: "Wherever you are",
      title: "Watch online",
      body: "Every Sunday service streams live, and every message is there to replay.",
      badge: "Live on Sundays",
      info: "YouTube · Facebook · Instagram",
      cta: "Watch",
      href: "/sermons",
      image: media.worship,
      position: "50% 22%",
    },
    {
      label: "Grow with us",
      title: "Find your gift",
      body: "Ministry Training, midweek service and a place on the workforce. Grow, then serve.",
      badge: "Ministry Training",
      info: "Training · Workforce · Midweek",
      cta: "Start growing",
      href: "/grow",
      image: stock.choir.src,
      position: stock.choir.position,
      credit: stock.choir.credit,
    },
  ].filter(Boolean) as WelcomeCard[];

  return (
    <>
      <Hero />
      <WorshipWithUs />
      <Welcome cards={cards} />
      <Mission />
      <Messages />
      <Ministries />
      <Vision />
      <NextStepsList />
      <FirstSunday className="pb-[clamp(3.25rem,6vw,5.25rem)]" />
      <Give />
      <Faq items={generalFaqs} />
    </>
  );
}
