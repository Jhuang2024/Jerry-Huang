import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '../data/experience'
import { prefersReducedMotion } from '../lib/media'
import ExperienceCard from './ExperienceCard'
import Section from './Section'

/* Experience timeline: scroll-linked energy fill down the rail plus an
   active-item spy that lights up the entry crossing mid-viewport. */
export default function Timeline() {
  const timelineRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const timeline = timelineRef.current
    const fill = fillRef.current
    if (!timeline || !fill) return

    const updateFill = () => {
      const r = timeline.getBoundingClientRect()
      const anchor = window.innerHeight * 0.48
      const h = Math.min(Math.max(anchor - r.top, 0), r.height)
      fill.style.height = h + 'px'
    }
    window.addEventListener('scroll', updateFill, { passive: true })
    window.addEventListener('resize', updateFill)
    updateFill()

    let spy
    if (!prefersReducedMotion()) {
      spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle('active', e.isIntersecting))
      }, { rootMargin: '-45% 0px -45% 0px' })
      timeline.querySelectorAll('.tl-item').forEach((i) => spy.observe(i))
    }

    return () => {
      window.removeEventListener('scroll', updateFill)
      window.removeEventListener('resize', updateFill)
      spy?.disconnect()
    }
  }, [])

  return (
    <Section id="timeline" screenLabel="Experience" num="01" eyebrow="Experience" title="Leading, building, presenting." lead="From founding ventures in Toronto to technical work in the Bay Area. Helicyn is covered on the projects page as the current build.">
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-fill" ref={fillRef} aria-hidden="true"></div>
        {EXPERIENCE.map((item) => <ExperienceCard key={item.id} item={item} />)}
      </div>
    </Section>
  )
}
