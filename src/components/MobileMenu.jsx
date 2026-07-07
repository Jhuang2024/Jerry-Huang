import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MOBILE_LINKS } from '../data/nav'
import { SITE } from '../data/site'
import { useTheme } from '../context/ThemeContext'
import { LinkedInIcon } from './Icons'

/* Full-screen mobile navigation with numbered route links and the
   dark-mode switch. Body classes/overflow mirror the original behavior. */
export default function MobileMenu({ open, onClose }) {
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className="mobile-menu" id="mobileMenu" aria-hidden={!open}>
      <nav className="mobile-menu-nav" aria-label="Mobile">
        {MOBILE_LINKS.map((l, i) => (
          <NavLink key={l.to} to={l.to} onClick={onClose} end={l.to === '/'}>
            <span className="mm-num">{String(i + 1).padStart(2, '0')}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mobile-menu-foot">
        <div className="switch-row">
          <span>Dark mode</span>
          <button
            className="switch"
            role="switch"
            aria-checked={theme !== 'light'}
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            <span className="switch-thumb"></span>
          </button>
        </div>
        <a className="btn btn-ghost" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  )
}
