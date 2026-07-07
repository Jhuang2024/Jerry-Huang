import { useEffect } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

/* Pointer-driven microinteractions, ported from script.js and converted to
   delegated document-level listeners so they survive route changes without
   per-element wiring:
     · spotlight cards  — --sx/--sy glow tracking on hoverable cards
     · 3D tilt          — work cards (subtle) and stage cards (dramatic)
     · magnetic buttons — .magnetic pull toward the pointer
     · click ripple     — .ripple expanding dot
   Mounted once in Layout; cleanup removes every listener. */

const SPOTLIGHT_SEL = '.work-card, .proof-card, .stage-card, .tl-card, .mini, .explore-card'
const MAGNETIC_SEL = '.magnetic'

export function useInteractionEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const fine = hasFinePointer()
    const cleanups = []

    if (!reduce && fine) {
      let tiltEl = null
      let magEl = null

      const onMove = (e) => {
        // spotlight glow
        const card = e.target.closest?.(SPOTLIGHT_SEL)
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--sx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%')
          card.style.setProperty('--sy', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%')
        }

        // 3D tilt (work + stage cards)
        const tilt = e.target.closest?.('.work-card, .stage-card')
        if (tilt !== tiltEl && tiltEl) tiltEl.style.transform = ''
        tiltEl = tilt
        if (tilt) {
          const r = tilt.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          tilt.style.transform = tilt.classList.contains('stage-card')
            ? `translateY(-8px) scale(1.03) rotateX(${(-py * 14).toFixed(2)}deg) rotateY(${(px * 16).toFixed(2)}deg)`
            : `translateY(-6px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`
        }

        // magnetic buttons
        const mag = e.target.closest?.(MAGNETIC_SEL)
        if (mag !== magEl && magEl) magEl.style.transform = ''
        magEl = mag
        if (mag) {
          const r = mag.getBoundingClientRect()
          const mx = (e.clientX - r.left - r.width / 2) * 0.25
          const my = (e.clientY - r.top - r.height / 2) * 0.35
          mag.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`
        }
      }
      const onLeaveDoc = () => {
        if (tiltEl) { tiltEl.style.transform = ''; tiltEl = null }
        if (magEl) { magEl.style.transform = ''; magEl = null }
      }
      document.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeaveDoc)
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
        onLeaveDoc()
      })
    }

    if (!reduce) {
      const onClick = (e) => {
        const el = e.target.closest?.('.ripple')
        if (!el) return
        const r = el.getBoundingClientRect()
        const size = Math.max(r.width, r.height) * 1.6
        const dot = document.createElement('span')
        dot.className = 'ripple-dot'
        dot.style.width = dot.style.height = size + 'px'
        dot.style.left = e.clientX - r.left - size / 2 + 'px'
        dot.style.top = e.clientY - r.top - size / 2 + 'px'
        el.appendChild(dot)
        setTimeout(() => dot.remove(), 700)
      }
      document.addEventListener('click', onClick)
      cleanups.push(() => document.removeEventListener('click', onClick))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
