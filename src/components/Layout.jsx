import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AmbientChrome from './AmbientChrome'
import AnnounceBar from './AnnounceBar'
import CommandMenu from './CommandMenu'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import Navbar from './Navbar'
import PageTransition from './PageTransition'
import ScrollManager from './ScrollManager'
import SectionRail from './SectionRail'
import ToTop from './ToTop'
import { useInteractionEffects } from '../hooks/useInteractionEffects'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

/* Persistent shell around every routed page: ambient background layers,
   announcement bar, header, mobile menu, ⌘K menu, dot rail, back-to-top,
   and footer. Also hosts the site-wide interaction + reveal effects. */
export default function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cmdkOpen, setCmdkOpen] = useState(false)

  useInteractionEffects()
  useRevealOnScroll(location.pathname)

  // close the mobile menu on navigation
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // global ⌘K / Ctrl-K shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdkOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const closeCmdk = useCallback(() => setCmdkOpen(false), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <ScrollManager />
      <AnnounceBar />
      <AmbientChrome />
      <CommandMenu open={cmdkOpen} onClose={closeCmdk} />
      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onOpenCmdk={() => setCmdkOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <SectionRail />
      <PageTransition>
        <main>
          <Outlet />
        </main>
      </PageTransition>
      <ToTop />
      <Footer />
    </>
  )
}
