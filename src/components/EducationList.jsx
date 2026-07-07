import { useState } from 'react'
import { EDUCATION } from '../data/about'
import Section from './Section'

function EduLogo({ item }) {
  const [loaded, setLoaded] = useState(false)
  if (item.calMark) {
    return (
      <div className="mini-logo" style={{ background: '#003262', display: 'grid', placeItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#FDB515', fontSize: '0.95rem' }}>Cal</span>
      </div>
    )
  }
  return (
    <div className={`mini-logo${loaded ? '' : ' img-skeleton'}`}>
      <img src={item.logo} alt={item.logoAlt} onLoad={() => setLoaded(true)} />
    </div>
  )
}

export default function EducationList() {
  return (
    <Section id="education" screenLabel="Education" num="02" eyebrow="Education" title="Where I'm learning.">
      <div className="edu-list">
        {EDUCATION.map((item, i) => (
          <div className="mini reveal" key={item.id} data-delay={i > 0 ? Math.min(i, 4) : undefined}>
            <EduLogo item={item} />
            <div><h4>{item.title}</h4><p>{item.text}</p></div>
            {item.badge && <span className="badge" data-tooltip={item.badgeTooltip}>{item.badge}</span>}
          </div>
        ))}
      </div>
    </Section>
  )
}
