import { NavLink } from 'react-router-dom'
import { MOBILE_LINKS } from '../data/nav'
import { SITE } from '../data/site'
import { LinkedInIcon } from './Icons'

export default function Footer() {
  return (
    <footer>
      <div className="socials">
        <a className="icon-btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon width="18" height="18" />
        </a>
      </div>
      <nav className="footer-nav" aria-label="Footer">
        {MOBILE_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}>{l.label}</NavLink>
        ))}
      </nav>
      © {new Date().getFullYear()} Jerry Huang · Built with curiosity in Toronto.
    </footer>
  )
}
