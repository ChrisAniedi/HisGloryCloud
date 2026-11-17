import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { church, gatherings, socials } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(church.url),
  title: {
    default: `${church.name} — ${church.tagline}`,
    template: `%s · ${church.name}`,
  },
  description:
    "His Glory Cloud Church (Glory Tent), Egbeda, Lagos. A family of joyful believers who love God deeply, praise passionately and raise visionary kingdom leaders. Sundays 9AM · Wednesdays 6PM.",
  keywords: ["church in Egbeda", "church in Lagos", "His Glory Cloud Church", "Glory Tent", "HGC", "Apostle Festus Nwachukwu Edobor"],
  openGraph: {
    type: "website",
    siteName: church.name,
    locale: "en_NG",
    title: `${church.name} — ${church.tagline}`,
    description: "Transforming lives, shaping leaders, spreading God’s glory. Join us every Sunday, 9AM, in Egbeda, Lagos.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  alternateName: [church.alias, church.short],
  url: church.url,
  foundingDate: church.founded,
  founder: { "@type": "Person", name: church.leader.name },
  address: {
    "@type": "PostalAddress",
    streetAddress: church.address.line1,
    addressLocality: "Egbeda",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  sameAs: Object.values(socials).map((s) => s.href),
  event: gatherings.map((g) => ({
    "@type": "Event",
    name: g.name,
    eventSchedule: {
      "@type": "Schedule",
      repeatFrequency: "P1W",
      byDay: g.day === 0 ? "https://schema.org/Sunday" : "https://schema.org/Wednesday",
      startTime: `${String(g.start[0]).padStart(2, "0")}:00`,
      endTime: `${String(g.end[0]).padStart(2, "0")}:00`,
      scheduleTimezone: church.timezone,
    },
    location: { "@type": "Place", name: church.alias, address: church.address.full },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-glory-400 focus:px-5 focus:py-3 focus:text-ink-950"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
