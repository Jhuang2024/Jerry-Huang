import { prefersReducedMotion } from './media'

/* Scroll an element into view and pulse a transient highlight ring on it
   (used by evidence links, the command menu, and hash deep-links). */
export function flashScrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
  el.classList.remove('jh-flash')
  void el.offsetWidth
  el.classList.add('jh-flash')
  setTimeout(() => el.classList.remove('jh-flash'), 1400)
  return true
}
