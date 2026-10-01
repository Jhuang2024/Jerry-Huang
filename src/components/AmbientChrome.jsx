import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

export default function AmbientChrome() {
  const progressRef = useRef(null)
  const glowRef = useRef(null)
  const { pathname } = useLocation()
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const height = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [pathname])
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    let frame = 0
    let x = 0, y = 0
    const move = e => {
      x = e.clientX; y = e.clientY
      if (!frame) frame = requestAnimationFrame(() => {
        glowRef.current.style.transform = `translate(${x}px, ${y}px)`
        frame = 0
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move) }
  }, [])
  return <><div className="ambient-field" aria-hidden="true"><i /><i /></div><div className="pointer-light" ref={glowRef} aria-hidden="true" /><div className="scroll-progress" ref={progressRef} aria-hidden="true" /></>
}
