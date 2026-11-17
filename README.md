# His Glory Cloud Church — website

A rebuild of hisglorycloudchurch.org.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Design

Modern and cinematic, built around the church's own people. References the owner chose: elevationchurch.org,
joincci.org, and Dribbble church/SaaS hero shots (framed hero card, big light display type, a strip of tiles).

- **Frame**: the hero, latest messages, vision band and footer are rounded cards inset 8–12px from the
  window edge on a warm off-white page (`paper`). Content cards are white with a hairline (`line`).
- **Colour**: `night` (warm near-black) and `cream` carry the hero and footer; `red`, the heart in the HGC
  logo, is the accent and the vision band. Tokens are in `src/app/globals.css`.
- **Type**: Inter Tight. Display sizes are light (300) with tight tracking and a two-tone line (white +
  `cream-muted`). Source Serif italic is used only for scripture and the quote mark.
- **Hero** (`components/sections/hero-view.tsx`): light and open, full width (owner liked a Dribbble SaaS hero
  with orbit rings; made our own). Rings spread from the tagline like ripples (`hero-orbits.tsx`) with congregation
  photos and four chips (The Word, Worship, Prayer, Outreach) bobbing on them, a red arc turning on two rings, the
  field fading out towards the bottom; chips hidden on phones. Centred chip, tagline with "God’s glory." in red,
  buttons, then a stack of three real cards (`hero-stack.tsx`: next service, latest message, address) that take
  turns at the front and fan out on hover. Core values close the hero. The header is the light floating bar on
  every page. Do not reuse Serviceberry's structure (grid lines, arc carrying CTAs, glass side cards).
  Light theme (owner tried dark and preferred light; `theme` prop on HeroView still supports "dark"). Rings get a ripple rolling outward and a
  slowly turning dashed ring; the headline rises word by word and a hand-drawn line writes under "God’s glory."
  (`hero-headline.tsx`). The pastor circle is supported but switched off (`media.pastor` = null; owner,
  2026-11-17; file kept at public/media/pastor.jpg).
- **Header** (`site/header.tsx`): full width with the fluid page gutter (`--gutter`, like Serviceberry's), see-through
  glass (light, or dark over `data-nav="dark"` sections). Links: About, Grow, Sermons, Give, Community; logo centred;
  red "Next step" side panel (`site/next-step-panel.tsx`) and "Menu" (full screen, adds Help & support).
- **WhatsApp button** (`site/whatsapp-float.tsx`): bottom right on every page, for prayer, counselling and help.
  Needs the church's WhatsApp number in `contact.whatsapp` (src/lib/site.ts); until then it opens /pastoral-care.
- **Home sections**, in order: Hero; Worship with us (in person / livestream, `blocks/worship-with-us.tsx`, idea from
  bhmglobal.org); Interlude (Psalm 95:6); Start here (About / Grow / Community photo cards); Our mission (words
  light up on scroll); Fuel your faith (sermon row from YouTube, `blocks/sermon-rail.tsx`); Ministries (line art);
  Vision (photo band); Take the next step; Your first Sunday; Give; FAQ (`blocks/faq.tsx`); Come worship with us
  (closing band with a fan of photos, `blocks/closing-band.tsx`). Footer ends with the church's name fading out.
- **Pages**: /about (hero with a dome of the places HGC plans to reach), /grow, /sermons (searchable grid of the
  channel's messages, `blocks/sermon-library.tsx`), /give (giving as worship, account card, FAQ), /community (photos
  on a string, values, units, socials, FAQ), /help (prayer, counselling, contact, FAQ), plus the earlier pages.
  Several pages close with a large verse (`blocks/verse-block.tsx`). Sections share `SectionIntro` / `Chip`.
- **Latest messages** come from the YouTube channel feed (`src/lib/youtube.ts`, cached for hours, shorts
  skipped, ALL CAPS titles put in sentence case, fallback list if YouTube is unreachable).
- **Motion**: things fade and sharpen into place once (`components/motion/reveal.tsx`). Respects reduced-motion.

Avoid what made the first version look generated: shimmering gold gradient text, blurred glow blobs, film
grain, monospace labels, "01 / 04" numbering, count-up stats, tilt cards, marquees, invented logos and
stock photos.

## Where things live

| What | Where |
| --- | --- |
| All church content (times, address, units, scriptures, bank) | `src/lib/site.ts` |
| Service schedule / live logic | `src/lib/schedule.ts` |
| Design tokens and text styles (`heading-1/2/3`, `kicker`, `link-arrow`) | `src/app/globals.css` |
| Form schemas + server action | `src/lib/forms/schemas.ts`, `src/app/actions.ts` |
| Home page sections | `src/components/sections/` |
| Shared site pieces (header, footer, page header, bank details) | `src/components/site/` |
| shadcn/ui components | `src/components/ui/` |

## Stand-in photos (inner pages)

Until the church sends its own photos, the inner page headers use freely licensed photos from Wikimedia Commons
(`stock` in `src/lib/site.ts`, files in `public/media/stock/`). Their licences (CC BY / CC BY-SA) require the
credit, which `PageHero` shows under each picture. To replace one, put the church's photo in `public/media/`,
point `src` at it and remove `credit` / `creditHref`.

## Photos and logo

`public/media/` holds three service photos and the heart-and-dove mark, all taken from the church's
current site. `hgc-mark.png` is the mark with the white dove recoloured dark for light pages;
`hgc-mark-light.png` is the original for the footer. The favicon (`src/app/icon.png`) is the church's
own square logo. Paths are set in `media` in `src/lib/site.ts`.

Better photos would help most: a wide shot of the congregation, the building from outside (so first-time
visitors recognise it), and a portrait of Apostle Edobor for the About page (`media.leader`; the section
shows text only until it is set).

## Before launch

- **Forms**: set `FORMS_WEBHOOK_URL` (see `.env.example`).
- **Legal pages** (privacy, cookies, terms, disclaimer) need moving over from the current site.
