# jerry-huang.com

Jerry Huang’s portfolio, built with React, React Router and Vite. Seven pages
share a warm copper visual system, orbital hero artwork, ambient motion,
animated project visuals, scroll reveals and light/dark themes. The header
includes a pause control; reduced-motion preferences are respected.

## Develop

Use Node 22.12+ (or Node 24).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production build emits `dist/` and a `404.html` fallback. Netlify and
Cloudflare Pages use `public/_redirects` for client-side route fallback.

## Check

```sh
npx playwright install chromium
npm test
npm audit
```

The browser suite builds the site and starts its own local production preview. It checks every route at
1440, 768, 390 and 320 pixels, plus dialogs, keyboard navigation, photo gallery,
contact submissions, clipboard failures, themes, legacy links and reduced
motion. Contact requests are intercepted, so tests never send real messages.
For an installed browser binary, set `CHROMIUM_PATH`. To test a separately
running server, set `SITE_TEST_URL`.

## Structure

- `src/routes/`: Home, About, Projects, Experience, Speaking, Photography,
  Contact and the missing-page fallback.
- `src/data/`: content, project case studies, experience, photography,
  education, navigation, skills, FAQ and evidence links.
- `src/components/`: page sections and persistent navigation.
- `src/hooks/useModal.js`: stacked focus traps, background isolation,
  scroll locks and focus restoration shared by all dialogs.
- `src/styles/global.css`: foundational component styles.
- `src/styles/app.css`: routed page layouts.
- `src/styles/premium.css`: visual system, motion and responsive refinements.
- `scripts/check-site.cjs`: browser regression suite.
- `public/`: original static assets, robots, sitemap and redirect fallback.

Legacy one-page anchors redirect to their corresponding pages.
