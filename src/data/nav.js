/* Route-level navigation config: top links, mobile menu, per-page section
   rails, and the legacy one-page hash → route map. */

export const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/speaking', label: 'Speaking' },
  { to: '/contact', label: 'Contact' },
]

export const MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/speaking', label: 'Public Stage' },
  { to: '/contact', label: 'Contact' },
]

/* Dot-rail sections per route (the rail is now a per-page scroll-spy). */
export const RAIL_SECTIONS = {
  '/': [
    { id: 'home', label: 'Home' },
    { id: 'overview', label: 'Overview' },
    { id: 'build', label: 'Helicyn' },
    { id: 'work', label: 'Work' },
    { id: 'explore', label: 'Explore' },
  ],
  '/about': [
    { id: 'facets', label: 'Facets' },
    { id: 'trajectory', label: 'Trajectory' },
    { id: 'education', label: 'Education' },
  ],
  '/projects': [
    { id: 'build', label: 'Helicyn' },
    { id: 'work', label: 'Work' },
    { id: 'constellation', label: 'Graph' },
  ],
  '/experience': [
    { id: 'timeline', label: 'Timeline' },
    { id: 'proof', label: 'Proof' },
    { id: 'skills', label: 'Stack' },
  ],
  '/speaking': [],
  '/contact': [],
}

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
