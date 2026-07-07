import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RAIL_SECTIONS } from '../data/nav'

/* Dot-rail scroll-spy. Was a site-wide anchor rail on the one-pager; now it
   tracks the sections of whichever route is active. */
export default function SectionRail() {
  const { pathname } = useLocation()
  const sections = RAIL_SECTIONS[pathname] || []
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (sections.length < 2) return
    setActive(sections[0]?.id ?? null)
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => spy.observe(el))
    return () => spy.disconnect()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (sections.length < 2) return null

  return (
    <nav className="rail" aria-label="On this page">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : undefined}>
          <span className="label">{s.label}</span>
          <span className="dot"></span>
        </a>
      ))}
    </nav>
  )
}
