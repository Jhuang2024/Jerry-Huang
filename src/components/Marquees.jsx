import { LOGO_MARQUEE } from '../data/home'

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

const TICKER_WORDS = ['AI Founder', 'Builder', 'Researcher', 'Speaker', 'Helicyn', "Berkeley '30"]

/* Editorial text ticker: oversized alternating solid/outline words. */
export function TextMarquee() {
  const set = (hidden) => (
    <div className="text-marquee-set" aria-hidden={hidden || undefined}>
      {TICKER_WORDS.map((w, i) => (
        <span key={w} className={`tm-word${i % 2 ? ' tm-outline' : ''}`}>
          {w} <i className="tick" aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  )
  return (
    <div className="text-marquee" role="presentation">
      <div className="text-marquee-track">
        {set(false)}
        {set(true)}
      </div>
    </div>
  )
}
