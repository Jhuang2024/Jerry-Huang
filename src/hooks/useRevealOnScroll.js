import { useEffect } from 'react'
import { prefersReducedMotion } from '../lib/media'

/* Scroll-reveal, ported from script.js. One IntersectionObserver per page:
   after each route renders, observe every `.reveal` that hasn't entered yet
   and add `.in-view` when it crosses the threshold. Cleanup disconnects the
   observer so nothing leaks across navigations. */
export function useRevealOnScroll(watchKey) {
  useEffect(() => {
    const items = [...document.querySelectorAll('.reveal:not(.in-view)')]
    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('in-view'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [watchKey])
}
