# Website review and upgrade

All existing routes, projects, photos, experience entries, credentials, contact
channels and interactive sections are retained. Content claims remain as they
were supplied in the repository; this review does not independently verify
biographical claims or third-party endorsements.

## Improvements addressed, one by one

1. **Hero composition.** Replaced the oversized cover-only introduction with a
   two-column identity and animated orbital artwork. Added prominent links to
   projects and contact, while retaining the Berkeley background photograph.
2. **Shared visual system.** Applied charcoal/copper and ivory/copper themes,
   softer surfaces, quieter borders, stronger typography, pill navigation,
   rounded cards and clearer spacing across every page.
3. **Motion and interaction.** Added orbiting particles, a floating sphere,
   ambient drift, pointer light, animated project schematics, card highlights,
   hover transitions and dialog entrances. Existing marquees, counters, reveals,
   graph connections and magnetic buttons remain.
4. **Motion controls.** Added a pause/resume button. Operating-system reduced
   motion disables decorative animations and smooth scrolling. Fixed section
   headings remaining clipped when reduced motion disables their transitions.
5. **Modal lifecycle.** Replaced independent scroll-lock ownership with a shared
   dialog stack. Closing a command menu over a project drawer keeps the page
   locked. All dialogs isolate the main app using `inert`, trap keyboard focus,
   close on Escape and restore focus. Mobile navigation has its own close control.
6. **Command search.** Added combobox/listbox relationships and active-option
   announcements. Empty searches no longer produce a negative active index;
   keyboard selection scrolls after rendering. Opening command search closes
   mobile navigation so the search cannot appear behind it.
7. **Clipboard handling.** Contact and command-menu actions report copying only
   after the clipboard operation succeeds; denied access shows the address.
8. **Contact submissions.** Guarded against concurrent submissions, disabled the
   submit button while pending and added a native message-length constraint.
   Preserved the existing Formspree endpoint and success/error behavior.
9. **Responsive layouts.** Fixed education badges spilling outside cards, tabs
   wider than narrow screens, cramped header controls, and trajectory endpoints.
   Mobile navigation can scroll on short screens. Photography shows color on
   touch devices, where hover is unavailable.
10. **Keyboard and accessibility.** Added a skip link, tab arrow/Home/End
    navigation, selected-state announcements for filters/skills/graph nodes,
    accordion relationships and hidden-panel isolation. Added a screen-reader
    description of the logo marquee.
11. **Scroll behavior.** Progress updates after route/content-height changes and
    resize, with frame-coalesced updates. Reveals trigger for tall sections.
    Hash scrolling decodes encoded IDs and cancels stale queued callbacks.
12. **Theme behavior.** Moved persistence out of React's state updater, avoiding
    duplicate updater side effects. Saved themes are validated before use.
13. **Content and metadata bugs.** Fixed the fundraising statistic's doubled
    dollar prefix. Missing pages now set `noindex`; other pages restore indexing.
14. **Dependencies and verification.** Updated React Router, Vite and the React
    plugin, refreshed the lockfile, documented Node requirements and added a
    reproducible production-browser regression suite. The final dependency audit
    reports zero vulnerabilities.

## Verification

- Production build succeeds, including the static-host `404.html` fallback.
- Eight routes tested at 1440, 768, 390 and 320 pixels without horizontal overflow.
- Existing project drawers, nested command search, gallery navigation, tabs,
  trajectory slider, proof filters, skill evidence, graph selection and FAQ tested.
- Clipboard failure and contact submission tested using mocks. No real messages sent.
- Theme switching, legacy anchor redirects and reduced-motion visibility tested.
- Local assets checked; browser suite checks image loads, HTTP errors and runtime errors.
- Desktop dark/light and mobile layouts inspected visually.

## Practical limits

The contact endpoint is exercised through intercepted responses rather than a
real delivery. External websites and their current availability are outside the
local-asset checks. Production hosting and social crawlers still depend on the
existing hosting configuration; this change does not replace it or add a backend.
