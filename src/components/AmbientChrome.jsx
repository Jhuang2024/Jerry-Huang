import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

/* Page-wide ambient layers: aurora mesh, grid, film grain, the traveling
   scroll-linked glow, the pointer-driven cursor glow, and the top scroll
   progress bar, all ported from script.js with proper cleanup. */
export default function AmbientChrome() {
  const progressRef = useRef(null)
  const scrollGlowRef = useRef(null)
  const cursorGlowRef = useRef(null)

  // scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // traveling scroll glow
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onGlow = () => {
      const el = scrollGlowRef.current
      if (!el) return
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? window.scrollY / h : 0
      const travel = document.documentElement.scrollHeight - window.innerWidth * 0.7
      el.style.transform = `translate(-50%, ${(pct * travel).toFixed(0)}px)`
    }
    window.addEventListener('scroll', onGlow, { passive: true })
    window.addEventListener('resize', onGlow)
    onGlow()
    return () => {
      window.removeEventListener('scroll', onGlow)
      window.removeEventListener('resize', onGlow)
    }
  }, [])

  // cursor glow (desktop pointers only)
  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return
    let shown = false
    const onMove = (e) => {
      const el = cursorGlowRef.current
      if (!el) return
      el.style.transform = `translate(${e.clientX - 130}px, ${e.clientY - 130}px)`
      if (!shown) { shown = true; el.classList.add('show') }
    }
    const onLeave = () => cursorGlowRef.current?.classList.remove('show')
    const onEnter = () => { if (shown) cursorGlowRef.current?.classList.add('show') }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div className="aurora"></div>
      <div className="grid-noise"></div>
      <div className="grain" aria-hidden="true"></div>
      <div className="scroll-glow" ref={scrollGlowRef} aria-hidden="true"></div>
      <div className="cursor-glow" ref={cursorGlowRef} aria-hidden="true"></div>
      <div className="scroll-progress" ref={progressRef}></div>
    </>
  )
}
