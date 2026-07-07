import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'

/* Single centered "next stop" nudge at the bottom of a page, pointing to
   the next natural page in the site's read order. */
export default function SectionCta({ to, children, style }) {
  return (
    <div className="section-cta reveal" style={style}>
      <Link className="btn btn-ghost magnetic ripple" to={to}>
        {children}
        <ArrowRight />
      </Link>
    </div>
  )
}
