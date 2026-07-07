# jerry-huang.com

Personal site for Jerry Huang — a multi-page React app built with Vite and
React Router. Refactored from the original one-page vanilla HTML/CSS/JS site;
all content, animations, and the visual system were preserved.

## Develop

```sh
npm install
npm run dev       # local dev server
npm run build     # production build → dist/ (also emits dist/404.html)
npm run preview   # serve the production build locally
```

## Structure

- `index.html` — Vite entry; base metadata, fonts, favicon, JSON-LD.
- `src/routes/` — one component per page: `/`, `/about`, `/projects`,
  `/experience`, `/speaking`, `/contact`, plus the styled 404.
- `src/components/` — layout chrome (Navbar, MobileMenu, CommandMenu,
  SectionRail, Footer…) and feature sections (Hero, Timeline, WorkSection,
  Constellation, ProofGrid, BuilderStack…).
- `src/data/` — all content as data: projects, experience, proof, stage,
  skills, education, nav config, FAQ, evidence registry.
- `src/hooks/` — reveal-on-scroll, page metadata, delegated pointer
  microinteractions (tilt, magnetic, ripple, spotlight).
- `src/styles/global.css` — the original design system, carried over intact.
- `src/styles/app.css` — router-era additions (page transitions, explore
  cards, 404, footer nav).
- `public/` — static assets served at the site root (`/assets/images/...`
  URLs are unchanged from the old site), `robots.txt`, `sitemap.xml`, and a
  `_redirects` SPA fallback.

## Deploying

This is now a single-page app with client-side routing, so the host must
serve `index.html` for unknown paths:

- **Cloudflare Pages / Netlify** — covered by `public/_redirects`
  (`/* /index.html 200`). Build command `npm run build`, output `dist`.
- **GitHub Pages / static hosts** — covered by `dist/404.html`, which the
  build script copies from `index.html`.

Old one-page anchors (`/#work`, `/#trajectory`, …) redirect client-side to
their new routes, so pre-refactor links keep working.
