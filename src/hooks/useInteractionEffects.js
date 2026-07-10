import { useEffect } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

/* One restrained pointer microinteraction survives the redesign: the
   magnetic pull on `.magnetic` buttons. Delegated at the document level so
   it works across route changes without per-element wiring. */

const MAGNETIC_SEL = '.magnetic'

export function useInteractionEffects() {
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return

    let magEl = null

    const onMove = (e) => {
      const mag = e.target.closest?.(MAGNETIC_SEL)
      if (mag !== magEl && magEl) magEl.style.transform = ''
      magEl = mag
      if (mag) {
        const r = mag.getBoundingClientRect()
        const mx = (e.clientX - r.left - r.width / 2) * 0.18
        const my = (e.clientY - r.top - r.height / 2) * 0.26
        mag.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`
      }
    }
    const onLeaveDoc = () => {
      if (magEl) { magEl.style.transform = ''; magEl = null }
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeaveDoc)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
      onLeaveDoc()
    }
  }, [])
}
