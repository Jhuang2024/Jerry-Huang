import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/media'

/* Homepage hero: full-bleed campus imagery under a dark editorial wash,
   a status/meta strip, and the name set at maximum scale. Bottom-anchored,
   the way a cover spread would be. */
export default function Hero() {
  const bgRef = useRef(null)

  // slow settle parallax on the background image
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onParallax = () => {
      const el = bgRef.current
      if (!el) return
      const y = Math.min(window.scrollY, window.innerHeight)
      el.style.transform = `translateY(${(y * 0.16).toFixed(1)}px) scale(1.03)`
    }
    window.addEventListener('scroll', onParallax, { passive: true })
    onParallax()
    return () => window.removeEventListener('scroll', onParallax)
  }, [])

  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="hero-media" ref={bgRef} aria-hidden="true"></div>

      <div className="hero-meta">
        <span className="hero-status">
          <span className="pulse" aria-hidden="true"></span>
          Founder — Helicyn
        </span>
        <span className="sep" aria-hidden="true"></span>
        <span className="meta-item">UC Berkeley '30</span>
        <span className="sep" aria-hidden="true"></span>
        <span className="meta-item">SF Bay Area</span>
      </div>

      <h1>
        <span>Jerry</span>
        <span>Huang</span>
      </h1>

      <div className="hero-baseline">
        <p className="hero-position">AI founder &amp; builder — shipping machine-learning systems in the open.</p>
        <a className="hero-scroll" href="#overview" aria-label="Scroll for more">
          Scroll
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
