import { useEffect, useRef, useState } from 'react'
import { TRAJECTORY, TRAJECTORY_YEARS } from '../data/about'
import { prefersReducedMotion } from '../lib/media'
import Rich from './Rich'
import Section from './Section'

/* Trajectory map: scroll-driven line fill + node activation, click-to-pin
   cards, and the decorative year-scrub slider. */
export default function Trajectory() {
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const [pinned, setPinned] = useState(null)
  const [activePcts, setActivePcts] = useState(0)
  const [sliderVal, setSliderVal] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const fill = fillRef.current
    if (!track || !fill) return
    const update = () => {
      const r = track.getBoundingClientRect()
      const anchor = window.innerHeight * 0.7
      const total = r.height || 1
      const progressPx = Math.min(Math.max(anchor - r.top, 0), total)
      const pct = (progressPx / total) * 100
      fill.style.width = pct + '%'
      setActivePcts(pct)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const togglePin = (idx) => setPinned((prev) => (prev === idx ? null : idx))

  const onSlider = (e) => {
    const idx = parseInt(e.target.value, 10)
    setSliderVal(idx)
    setPinned(idx)
    const node = trackRef.current?.querySelectorAll('.traj-node')[idx]
    node?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center', inline: 'nearest' })
  }

  const sliderPct = (sliderVal / (TRAJECTORY.length - 1)) * 100

  return (
    <Section id="trajectory" className="traj" screenLabel="Trajectory" num="01" eyebrow="Trajectory" title="A path from Toronto to Berkeley." lead="Five stops, each one adding a new system to build in.">
      <div className="range-block reveal">
        <div className="range-top"><span>Scrub the timeline</span><span>{TRAJECTORY_YEARS[sliderVal] || ''}</span></div>
        <input
          type="range"
          className="jh-slider"
          min="0"
          max={TRAJECTORY.length - 1}
          step="1"
          value={sliderVal}
          onChange={onSlider}
          aria-label="Scrub trajectory year"
          style={{ background: `linear-gradient(90deg, var(--accent), var(--accent-2) ${sliderPct}%, var(--surface-2) ${sliderPct}%)` }}
        />
      </div>
      <div className="traj-track" ref={trackRef}>
        <div className="traj-line" aria-hidden="true">
          <i className="traj-line-fill" ref={fillRef}></i>
          <i className="traj-comet"></i>
        </div>
        <div className="traj-nodes">
          {TRAJECTORY.map((node, i) => (
            <div
              key={node.period}
              className={`traj-node reveal${activePcts >= node.pos - 4 ? ' active' : ''}${pinned === i ? ' pinned' : ''}`}
              data-pos={node.pos}
              data-delay={i > 0 ? Math.min(i, 4) : undefined}
            >
              <span className="traj-dot" aria-hidden="true" onClick={() => togglePin(i)}></span>
              <div className="traj-card" onClick={() => togglePin(i)}>
                <span className="traj-period">{node.period}</span>
                <h3>{node.title}</h3>
                <p><Rich parts={node.text} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
