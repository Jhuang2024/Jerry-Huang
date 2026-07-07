import { useEffect, useRef, useState } from 'react'
import HeroScene from './HeroScene'
import { ROLES } from '../data/home'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

/* Homepage hero: parallax campus backdrop, pointer spotlight, meteors,
   identity scene, rotating role label, and the typewriter position line. */
export default function Hero() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const spotRef = useRef(null)
  const [role, setRole] = useState(ROLES[0])
  const [roleOut, setRoleOut] = useState(false)

  // rotating role label
  useEffect(() => {
    if (prefersReducedMotion()) return
    let ri = 0
    const iv = setInterval(() => {
      ri = (ri + 1) % ROLES.length
      setRoleOut(true)
      setTimeout(() => {
        setRole(ROLES[ri])
        setRoleOut(false)
      }, 260)
    }, 2800)
    return () => clearInterval(iv)
  }, [])

  // pointer spotlight
  useEffect(() => {
    const hero = heroRef.current
    const spot = spotRef.current
    if (!hero || !spot || prefersReducedMotion() || !hasFinePointer()) return
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      spot.style.opacity = '1'
      spot.style.left = e.clientX - r.left - 210 + 'px'
      spot.style.top = e.clientY - r.top - 210 + 'px'
    }
    const onLeave = () => { spot.style.opacity = '0' }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // large-scale background parallax
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onParallax = () => {
      const el = bgRef.current
      if (!el) return
      const y = Math.min(window.scrollY, window.innerHeight)
      el.style.transform = `translateX(-50%) translateY(${(y * 0.18).toFixed(1)}px) scale(1.06)`
    }
    window.addEventListener('scroll', onParallax, { passive: true })
    onParallax()
    return () => window.removeEventListener('scroll', onParallax)
  }, [])

  return (
    <section id="home" className="hero" data-screen-label="Hero" ref={heroRef}>
      <div className="hero-bg" ref={bgRef} aria-hidden="true"></div>
      <div className="hero-spotlight" ref={spotRef}></div>
      <div className="meteors" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="meteor" style={{ '--i': i }}></span>)}
      </div>

      <div className="hero-inner">
        <HeroScene />
        <div className="hero-copy">
          <div className="hero-status reveal in-view">
            <span className="pulse" data-tooltip="Actively building"></span>{' '}
            <span className={`role-rotate${roleOut ? ' rotate-out' : ''}`}>{role}</span>{' '}
            at Helicyn · UC Berkeley '30 · SF Bay Area
          </div>
          <h1 className="reveal in-view" data-delay="1">Jerry<br /><span className="accent">Huang</span></h1>
          <p className="hero-position reveal in-view" data-delay="2">
            <span className="typewriter">AI founder and builder at UC Berkeley.</span>
          </p>
        </div>
      </div>

      <a className="scroll-cue" href="#overview" aria-label="Scroll for more">
        <span></span>
      </a>
    </section>
  )
}
