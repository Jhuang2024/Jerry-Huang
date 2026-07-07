import { useEffect, useRef, useState } from 'react'
import { FACETS } from '../data/about'
import Rich from './Rich'
import Section from './Section'

/* "A few different lenses" tabs with the sliding gradient indicator. */
export default function FacetsTabs() {
  const [active, setActive] = useState(FACETS[0].id)
  const listRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    const setIndicator = () => {
      const list = listRef.current
      const indicator = indicatorRef.current
      if (!list || !indicator) return
      const trigger = list.querySelector('.tabs-trigger.active')
      if (!trigger) return
      indicator.style.width = trigger.offsetWidth + 'px'
      indicator.style.transform = `translateX(${trigger.offsetLeft}px)`
    }
    const raf = requestAnimationFrame(setIndicator)
    window.addEventListener('resize', setIndicator)
    if (document.fonts?.ready) document.fonts.ready.then(setIndicator)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setIndicator)
    }
  }, [active])

  return (
    <Section id="facets" className="facets" screenLabel="Facets" eyebrow="Beyond the resume" title="A few different lenses.">
      <div className="tabs reveal">
        <div className="tabs-list" role="tablist" aria-label="Facets" ref={listRef}>
          {FACETS.map((f) => (
            <button
              key={f.id}
              className={`tabs-trigger${active === f.id ? ' active' : ''}`}
              role="tab"
              aria-selected={active === f.id}
              id={`tab-${f.id}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
          <span className="tabs-indicator" ref={indicatorRef} aria-hidden="true"></span>
        </div>
        <div className="tabs-panels">
          {FACETS.map((f) => (
            <div
              key={f.id}
              className={`tabs-panel${active === f.id ? ' active' : ''}`}
              role="tabpanel"
              aria-labelledby={`tab-${f.id}`}
              hidden={active !== f.id}
            >
              <p><Rich parts={f.text} /></p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
