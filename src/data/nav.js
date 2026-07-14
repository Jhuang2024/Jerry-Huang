/* Route-level navigation config: top links, mobile menu, per-page section
   rails, and the legacy one-page hash → route map. */

export const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/speaking', label: 'Speaking' },
  { to: '/photography', label: 'Photography' },
  { to: '/contact', label: 'Contact' },
]

export const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/speaking', label: 'Public Stage' },
  { to: '/photography', label: 'Photography' },
  { to: '/contact', label: 'Contact' },
]

/* Old one-page anchors (`/#work`, `/#about`…) redirect to their new homes
   so every pre-refactor deep link keeps working. */
export const LEGACY_HASH_ROUTES = {
  '#home': '/',
  '#overview': '/',
  '#trajectory': '/about#trajectory',
  '#education': '/about#education',
  '#build': '/projects#build',
  '#work': '/projects#work',
  '#constellation': '/projects#constellation',
  '#timeline': '/experience#timeline',
  '#proof': '/experience#proof',
  '#skills': '/experience#skills',
  '#stage': '/speaking#stage',
  '#contact': '/contact#contact',
}
