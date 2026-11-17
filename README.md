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
- **Header** (`site/header.tsx`, owner asked for Serviceberry's arrangement): the church's own menu on the left
  (About Us, Ministry Training, Outreach, Pastoral Services, as on hisglorycloudchurch.org), the logo centred, a red
  "Next step" button that opens a side panel (`site/next-step-panel.tsx`, the four next steps in the church's words,
  Sunday times, address, socials) and "Menu" (full-screen, `site/menu-overlay.tsx`). Clear at the top, frosted once
  the page moves, dark over sections marked `data-nav="dark"`, tucks away while scrolling down.
- **WhatsApp button** (`site/whatsapp-float.tsx`): bottom right on every page, for prayer, counselling and help.
  Needs the church's WhatsApp number in `contact.whatsapp` (src/lib/site.ts); until then it opens /pastoral-care.
- **Home sections**, in order: Hero; Interlude (ornament, Psalm 95:6, service times: the pause after the hero);
  Welcome home (three tall photo cards that settle in on scroll, idea from
  joincci.org); Our mission (dark band, the words light up as you scroll); Gather with us (bento with small pictures
  built from real details); Latest messages; Ministries (Training, Pastoral Services, Outreach, each with a line
  drawing that draws itself, `motion/line-art.tsx` + `lib/drawings.ts`); Vision (worship photo band with parallax);
  Take the next step (big rows); Your first Sunday (three steps on a drawn line, reused on /visit); Plan your visit (times + map); Give (red band, soft card, line-art hands).
  Sections share `SectionIntro` / `Chip` (`site/section-intro.tsx`). Rings stay in the hero only.
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
