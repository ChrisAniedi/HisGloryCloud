# His Glory Cloud Church — website

A ground-up rebuild of hisglorycloudchurch.org.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Motion · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Design concept — "The Glory Cloud"

The pillar of cloud and fire (Exodus 13:21) is the visual idea: warm night (`ink`), glory light
(`glory` gold), soft cloud-white chapters (`bone`), and the original brand red kept as `ember`.
Editorial serif (Instrument Serif) for display with italic emphasis, Geist for UI, Geist Mono for labels.

UX priorities, in order:
1. **When & where in 3 seconds** — a live countdown (Africa/Lagos time) that flips to "Live now → YouTube" during service.
2. **Next Steps as the spine** — Salvation, Prayer, Testimony, Serve are first-class journeys, each with its own page + form.
3. **Frictionless giving** — one-tap copy of the account number.
4. **Forms that work** — validated server actions, accessible errors, values kept on error, honeypot spam protection.

## Where things live

| What | Where |
| --- | --- |
| All church content (times, address, units, scriptures, bank) | `src/lib/site.ts` |
| Service schedule / live logic | `src/lib/schedule.ts` |
| Design tokens | `src/app/globals.css` |
| Form schemas + server action | `src/lib/forms/schemas.ts`, `src/app/actions.ts` |
| Motion primitives (reveal, split text, scroll text, spotlight, magnetic, glory cloud) | `src/components/motion/` |
| shadcn/ui components | `src/components/ui/` |

## Before launch

- **Photos & logo**: drop files into `public/media/` and set paths in `media` inside `src/lib/site.ts`
  (`community`, `leader`, `worship`). Until then, art-directed placeholders render.
  Replace the drawn mark in `src/components/site/logo.tsx` / `src/app/icon.svg` with the official logo if preferred.
- **Forms**: set `FORMS_WEBHOOK_URL` (see `.env.example`).
- **Legal pages** (privacy, cookies, terms, disclaimer) need migrating from the current site.

## Higgsfield — hero film

Set `media.heroVideo = "/media/hero-glory-cloud.mp4"` (and optionally `heroPoster`). The video is blended
*under* the code-driven light rays, clouds and embers, so dark, slow, abstract footage works best.
Export 1920×1080, 8–12s seamless loop, H.264, < 6 MB, no audio.

Suggested prompts:

1. **Hero (primary)** — "Slow cinematic push through luminous golden clouds at night, volumetric god-rays breaking
   through from above, drifting embers of light, deep warm black background, sacred and majestic, anamorphic,
   35mm film grain, seamless loop, no people, no text."
2. **Worship alt** — "Silhouetted congregation with raised hands facing a stage washed in warm golden haze,
   backlit, shallow depth of field, slow-motion, dark and reverent, film grain, no faces visible."
3. **Pillar of fire** — "A towering column of soft golden light rising into rolling clouds at dusk, slow
   orbiting camera, ethereal, minimal, dark edges for text overlay, seamless loop."

Keep motion slow (camera drift, not cuts). The text sits on the left and bottom, so keep the brightest area top-centre.
