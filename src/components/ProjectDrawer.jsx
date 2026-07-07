import { useEffect, useRef, useState } from 'react'
import CardLinks from './CardLinks'
import { CloseIcon } from './Icons'
import { prefersReducedMotion } from '../lib/media'

/* Case-study drawer (right slide-in dialog) with overlay, Escape close,
   focus trap, and the breadcrumb header, ported from script.js. */
export default function ProjectDrawer({ project, onClose }) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)
  const drawerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocusedRef = useRef(null)

  // open / close orchestration (mount → .show; .show off → unmount)
  useEffect(() => {
    if (project) {
      lastFocusedRef.current = document.activeElement
      setCurrent(project)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setVisible(true)
        closeBtnRef.current?.focus()
      }))
    } else if (current) {
      setVisible(false)
      document.body.style.overflow = ''
      const t = setTimeout(() => setCurrent(null), prefersReducedMotion() ? 0 : 380)
      lastFocusedRef.current?.focus?.()
      return () => clearTimeout(t)
    }
  }, [project]) // eslint-disable-line react-hooks/exhaustive-deps

  // restore scroll if unmounted while open
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  useEffect(() => {
    if (!current) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [current, onClose])

  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !drawerRef.current) return
    const focusables = [...drawerRef.current.querySelectorAll('button, a[href]')]
      .filter((el) => el.offsetParent !== null)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  if (!current) return null
  const { detail } = current
  const catText = detail.cat.split('·')[0].trim()

  return (
    <>
      <div className={`drawer-overlay${visible ? ' show' : ''}`} onClick={onClose} />
      <aside
        className={`drawer${visible ? ' show' : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${current.title}`}
        onKeyDown={trapFocus}
      >
        <button className="drawer-close" ref={closeBtnRef} onClick={onClose} aria-label="Close case study">
          <CloseIcon />
        </button>
        <div className="drawer-body">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#work" onClick={(e) => { e.preventDefault(); onClose() }}>Work</a>
            <span className="breadcrumb-sep">/</span>
            <span>{catText}</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{current.title}</span>
          </nav>
          <span className="drawer-cat">{detail.cat}</span>
          <h2>{current.title}</h2>
          <div className="drawer-block"><span className="db-k">Problem</span><p>{detail.problem}</p></div>
          <div className="drawer-block"><span className="db-k">Build</span><p>{detail.build}</p></div>
          <div className="drawer-block"><span className="db-k">Outcome</span><p>{detail.outcome}</p></div>
          <div className="tag-row">
            {detail.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <CardLinks links={detail.links} />
        </div>
      </aside>
    </>
  )
}
