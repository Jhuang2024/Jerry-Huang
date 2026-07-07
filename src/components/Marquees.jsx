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
