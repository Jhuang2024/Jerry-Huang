import { ArrowUpRight } from './Icons'

/* Sleek external-link pill row used by timeline cards, stage cards and the
   project drawer. */
export default function CardLinks({ links }) {
  if (!links || !links.length) return null
  return (
    <div className="card-links">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} <ArrowUpRight />
        </a>
      ))}
    </div>
  )
}
