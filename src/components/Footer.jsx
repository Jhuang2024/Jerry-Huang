import { NavLink } from 'react-router-dom'
import { MOBILE_LINKS } from '../data/nav'
import { SITE } from '../data/site'
import { LinkedInIcon } from './Icons'

/* Editorial footer: oversized wordmark, sitemap row, and a mono meta line. */
export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-word" aria-hidden="true">
          Jerry <em>Huang</em>
        </div>
        <div className="footer-grid">
          <nav className="footer-nav" aria-label="Footer">
            {MOBILE_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>{l.label}</NavLink>
            ))}
          </nav>
          <div className="socials">
            <a className="icon-btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon width="18" height="18" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jerry Huang</span>
          <span>Toronto → San Francisco</span>
        </div>
      </div>
    </footer>
  )
}
