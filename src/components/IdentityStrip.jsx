import { IDENTITY_PILLS } from '../data/home'

export default function IdentityStrip() {
  return (
    <section className="identity-strip reveal in-view" aria-label="Identity">
      {IDENTITY_PILLS.map((p) => (
        <div key={p.label} className="id-pill" data-tooltip={p.tooltip}>
          {p.dot && <span className="id-dot"></span>}
          {p.label}
        </div>
      ))}
    </section>
  )
}
