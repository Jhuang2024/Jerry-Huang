import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../data/nav'
import { SITE } from '../data/site'
import { useTheme } from '../context/ThemeContext'
import { ArrowUpRight, LinkedInIcon, MenuBars, CloseIcon, MoonIcon, SunIcon, SearchIcon } from './Icons'

/* Persistent header: wordmark, route-aware top links, Helicyn CTA,
   ⌘K trigger, LinkedIn, theme toggle, and the mobile menu toggle. */
export default function Navbar({ menuOpen, onToggleMenu, onOpenCmdk }) {
  const { toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <Link className="brand" to="/">
        Jerry&nbsp;Huang
      </Link>
      <div className="top-actions">
        <nav className="top-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a className="helicyn-btn" href={SITE.helicyn} target="_blank" rel="noopener noreferrer">
          <span className="hb-text">Helicyn</span>
          <ArrowUpRight />
        </a>
        <button
          className="icon-btn cmdk-btn"
          onClick={onOpenCmdk}
          aria-label="Open command menu (Ctrl/Cmd K)"
          aria-haspopup="dialog"
          title="Search & jump (Ctrl/Cmd K)"
        >
          <SearchIcon />
        </button>
        <a className="icon-btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <MoonIcon className="moon" />
          <SunIcon className="sun" />
        </button>
        <button
          className="icon-btn menu-toggle"
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
        >
          <MenuBars className="bars" />
          <CloseIcon className="ex" />
        </button>
      </div>
    </header>
  )
}
