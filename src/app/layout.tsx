import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Toaster } from "@/components/ui/sonner";
import { church, gatherings, socials } from "@/lib/site";
import "./globals.css";

// Fonts are served from the project (src/app/fonts, OFL licensed) rather than fetched from Google
// at build time, so a slow or blocked connection can never break the site.
const sans = localFont({
  variable: "--font-inter-tight",
  display: "swap",
  weight: "100 900",
  src: [
    { path: "./fonts/inter-tight-latin-wght-normal.woff2", style: "normal" },
  ],
});
const serif = localFont({
  variable: "--font-source-serif",
  display: "swap",
  weight: "200 900",
  src: [
    { path: "./fonts/source-serif-4-latin-wght-italic.woff2", style: "italic" },
  ],
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
  themeColor: "#14100d",
  colorScheme: "light",
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
        <Toaster />
      </body>
    </html>
  );
}
