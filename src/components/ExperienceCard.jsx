import { useState } from 'react'
import CardLinks from './CardLinks'
import Rich from './Rich'

/* One experience timeline entry: floating logo, role card, bullets, tags
   and link pills. Logo shows the skeleton shimmer until loaded. */
export default function ExperienceCard({ item }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`tl-item${item.featured ? ' tl-item--featured' : ''} reveal`} id={item.id} data-ev-id={item.evidenceId}>
      <div className={`tl-logo${loaded ? '' : ' img-skeleton'}`}>
        <img src={item.logo} alt={item.logoAlt} onLoad={() => setLoaded(true)} />
      </div>
      <div className="tl-card">
        <div className="tl-top">
          <div className="tl-role">{item.role} <span className="tl-org">· {item.org}</span></div>
          <div className="tl-meta">{item.meta}</div>
        </div>
        <ul className="tl-bullets">
          {item.bullets.map((b, i) => <li key={i}><Rich parts={b} /></li>)}
        </ul>
        <div className="tag-row">
          {item.tags.map((t) => (
            <span key={t.label} className={`tag${t.kind ? ' tag-kind' : ''}`}>{t.label}</span>
          ))}
        </div>
        <CardLinks links={item.links} />
      </div>
    </div>
  )
}
