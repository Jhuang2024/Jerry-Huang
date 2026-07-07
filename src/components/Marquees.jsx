import { LOGO_MARQUEE } from '../data/home'

/* Signal marquee (large ambient text banner). Two copies of the track keep
   the loop seamless, exactly like the original markup. */
export function SignalMarquee({ items }) {
  const renderItems = () => items.map((it, i) => (
    <span key={i} style={{ display: 'contents' }}>
      {it.bold ? <b>{it.text}</b> : <span>{it.text}</span>}
      <span className="dot">·</span>
    </span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-item">{renderItems()}</div>
        <div className="marquee-item">{renderItems()}</div>
      </div>
    </div>
  )
}

/* Logo marquee: "Presented, trained & built alongside" strip. */
export function LogoMarquee() {
  return (
    <div className="logo-marquee-wrap">
      <p className="logo-marquee-label">Presented, trained &amp; built alongside</p>
      <div className="logo-marquee" aria-hidden="true">
        <div className="logo-marquee-track">
          <div className="logo-marquee-set">
            {LOGO_MARQUEE.map((l) => <img key={l.src} src={l.src} alt={l.alt} loading="lazy" />)}
          </div>
          <div className="logo-marquee-set" aria-hidden="true">
            {LOGO_MARQUEE.map((l) => <img key={l.src} src={l.src} alt="" loading="lazy" />)}
          </div>
        </div>
      </div>
    </div>
  )
}
