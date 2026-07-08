import { useEffect, useRef, useState } from 'react'
import { TRAJECTORY } from '../data/about'
import Rich from './Rich'
import Section from './Section'

/* Trajectory map: a single stop card driven by the year-scrub slider (or the
   dots). The card re-mounts (via a period-keyed `key`) on every stop change,
   which replays its CSS entrance animation so each stop visibly appears as
   you scrub instead of all five sitting on screen at once. The line fill and
   dot states track the scrub position itself, not page scroll, so the bar
   never shows progress that disagrees with the card on screen. */
export default function Trajectory() {
  const fillRef = useRef(null)
  const dotRefs = useRef([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    dotRefs.current.forEach((el, i) => {
      if (!el) return
      el.classList.toggle('passed', i <= current)
      el.classList.toggle('current', i === current)
    })
    if (fillRef.current) fillRef.current.style.width = TRAJECTORY[current].pos + '%'
  }, [current])

  const onSlider = (e) => setCurrent(parseInt(e.target.value, 10))

  const node = TRAJECTORY[current]
  const sliderPct = (current / (TRAJECTORY.length - 1)) * 100

  return (
    <Section id="trajectory" className="traj" screenLabel="Trajectory" num="01" eyebrow="Trajectory" title="A path from Toronto to Berkeley." lead="Five stops, each one adding a new system to build in.">
      <div className="range-block reveal">
        <div className="range-top"><span>Scrub the timeline</span><span>{node.period}</span></div>
        <input
          type="range"
          className="jh-slider"
          min="0"
          max={TRAJECTORY.length - 1}
          step="1"
          value={current}
          onChange={onSlider}
          aria-label="Scrub trajectory year"
          style={{ background: `linear-gradient(90deg, var(--accent), var(--accent-2) ${sliderPct}%, var(--surface-2) ${sliderPct}%)` }}
        />
      </div>
      <div className="traj-track reveal">
        <div className="traj-axis">
          <div className="traj-line" aria-hidden="true">
            <i className="traj-line-fill" ref={fillRef}></i>
            <i className="traj-comet"></i>
          </div>
          <div className="traj-dots">
            {TRAJECTORY.map((n, i) => (
              <button
                key={n.period}
                type="button"
                ref={(el) => (dotRefs.current[i] = el)}
                className="traj-dot-btn"
                style={{ left: n.pos + '%' }}
                onClick={() => setCurrent(i)}
                aria-label={`${n.period}: ${n.title}`}
                aria-current={current === i ? 'true' : undefined}
              >
                <span className="traj-dot" aria-hidden="true"></span>
              </button>
            ))}
          </div>
        </div>
        <div className="traj-card-stage">
          <div className="traj-card" key={node.period}>
            <span className="traj-period">{node.period}</span>
            <h3>{node.title}</h3>
            <p><Rich parts={node.text} /></p>
          </div>
        </div>
      </div>
    </Section>
  )
}
