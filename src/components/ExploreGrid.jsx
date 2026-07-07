import { Link } from 'react-router-dom'
import { EXPLORE_LINKS } from '../data/home'
import { ArrowUpRight } from './Icons'
import Section from './Section'

/* Homepage wayfinding into the routed pages — replaces the rest of the old
   one-page scroll with clear navigation to each deeper page. */
export default function ExploreGrid() {
  return (
    <Section id="explore" screenLabel="Explore" num="03" eyebrow="Go deeper" title="Explore the full site.">
      <div className="explore-grid stagger">
        {EXPLORE_LINKS.map((l, i) => (
          <Link key={l.to} to={l.to} className="explore-card reveal" data-delay={i > 0 ? Math.min(i, 4) : undefined}>
            <span className="xc-num">{l.num}</span>
            <h3>{l.title} <ArrowUpRight /></h3>
            <p>{l.text}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
