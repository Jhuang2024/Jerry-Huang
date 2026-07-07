import { useEffect } from 'react'

const SITE_URL = 'https://jerry-huang.com'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/* Per-route document metadata: title, description, canonical, OG/Twitter.
   Kept dependency-free (no react-helmet) — the base tags ship in index.html
   for crawlers/social scrapers; this keeps them accurate as routes change. */
export function usePageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', SITE_URL + path)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', SITE_URL + path)
  }, [title, description, path])
}
