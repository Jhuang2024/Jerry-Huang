import { useEffect, useRef, useState } from 'react'
import { PROOF, PROOF_CATEGORIES } from '../data/proof'
import { prefersReducedMotion } from '../lib/media'
import Section from './Section'

function RingStat({ ring }) {
  return (
    <div className="ring-stat" data-ring={ring.value} style={{ '--ring-val': ring.value }}>
      <svg viewBox="0 0 60 60">
        <circle className="ring-track" cx="30" cy="30" r="26" />
        <circle className="ring-fill" cx="30" cy="30" r="26" pathLength="100" />
      </svg>
      <span className="ring-label">{ring.label[0]}<br />{ring.label[1]}</span>
    </div>
  )
}

/* Proof matrix: category filter chips + award cards, some carrying the
   circular percentile ring that fills when scrolled into view. */
export default function ProofGrid() {
  const [cat, setCat] = useState('all')
  const gridRef = useRef(null)

  // ring fill on scroll into view
  useEffect(() => {
    const rings = [...gridRef.current.querySelectorAll('.ring-stat')]
    if (!rings.length) return
    if (prefersReducedMotion()) {
      rings.forEach((el) => el.classList.add('in-view'))
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.5 })
    rings.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <Section id="proof" screenLabel="Proof" num="02" eyebrow="Proof" title="Signal, not filler.">
      <div className="filter-bar reveal">
        {PROOF_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`chip${cat === c.id ? ' active' : ''}`}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="proof-grid stagger" ref={gridRef}>
        {PROOF.map((p) => (
          <div
            key={p.title}
            className={`proof-card${p.ring ? ' proof-card--ring' : ''} reveal${cat !== 'all' && p.cat !== cat ? ' hide' : ''}`}
            data-cat={p.cat}
          >
            <div className="pc-top">
              <span className="pc-cat">{p.catLabel}</span>
              {p.date && <span className="pc-date">{p.date}</span>}
            </div>
            <h4>{p.title}</h4>
            {p.ring && <RingStat ring={p.ring} />}
            {p.metric && <p className="pc-metric">{p.metric}</p>}
            {p.text && <p>{p.text}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}
