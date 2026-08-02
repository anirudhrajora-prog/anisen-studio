# Ani Studio — Portfolio

A premium, Awwwards-inspired portfolio for a multidisciplinary visual designer.
Designed as a handcrafted, collectible South Asian design object — matchbox art,
Bollywood poster typography, truck-art colour and letterpress texture — built
with modern web engineering.

## Stack

- **Next.js 16** (App Router, static export-ready) · **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **GSAP** (ScrollTrigger reveals, marquees, parallax, preloader) +
  **Framer Motion** (state-driven micro-interactions)
- **Lucide** icons (custom SVG brand marks where Lucide dropped brand icons)
- **next/image** for all imagery · Vercel-ready

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier
```

## Editing content

**Everything editable lives in `lib/content.ts`** — name, role, projects, case
studies, skills, experience, testimonials, contact details, socials, SEO copy.

- Project artwork lives in `public/images/web/*.webp` (optimized copies of the
  original assets in `public/images/`). Add new ones with
  `magick input.png -resize 1200x -quality 82 output.webp`.
- Colours, fonts and textures are tokens in `app/globals.css`.
- SEO: `app/layout.tsx` (metadata/JSON-LD), `app/opengraph-image.tsx`,
  `app/sitemap.ts`, `app/robots.ts`.

## Notes

- `fonts/` holds TTF instances used only to generate the OpenGraph image
  (Satori requires TTF). The site itself loads Fraunces, Schibsted Grotesk and
  Tiro Bangla via `next/font/google`.
- The heavy original media in `public/images/` and `public/videos/` is content
  you own — only the optimized `public/images/web/*.webp` copies are shipped to
  the browser. Consider moving raw media out of `public/` if you version-control
  this repo (Vercel uploads everything in `public/`).
- Before launching, replace the placeholder identity and links in
  `lib/content.ts` (name, email, socials, domain in `site.url`).
