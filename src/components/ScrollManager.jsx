import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LEGACY_HASH_ROUTES } from '../data/nav'
import { flashScrollTo } from '../lib/scroll'

/* Routing scroll behavior:
   1. Legacy one-page anchors (`/#work`, `/#trajectory`, …) redirect to the
      routed page that now owns that section.
   2. Hash deep links scroll (and flash) their target after the page mounts.
   3. Plain route changes land at the top of the page. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/' && hash && LEGACY_HASH_ROUTES[hash]) {
      const target = LEGACY_HASH_ROUTES[hash]
      if (target !== '/' + hash && target !== '/') {
        navigate(target, { replace: true })
        return
      }
    }
    if (hash) {
      const id = hash.slice(1)
      // wait a frame so the destination page has rendered
      requestAnimationFrame(() => {
        if (!flashScrollTo(id)) window.scrollTo({ top: 0, behavior: 'instant' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key, navigate])

  return null
}
