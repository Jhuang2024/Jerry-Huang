import { useRef } from 'react'
import { useModal } from '../hooks/useModal'
import { createPortal } from 'react-dom'
import CardLinks from './CardLinks'
import { CloseIcon } from './Icons'

/* Case-study drawer (right slide-in dialog) with overlay, Escape close,
   focus trap, and the breadcrumb header, ported from script.js. */
export default function ProjectDrawer({ project, onClose }) {
  const drawerRef = useRef(null)
  const closeBtnRef = useRef(null)
  useModal(Boolean(project), drawerRef, onClose, closeBtnRef)
  if (!project) return null
  const current = project
  const visible = true
  const { detail } = current
  const catText = detail.cat.split('·')[0].trim()

  // Rendered through a portal on document.body so the fixed drawer escapes the
  // `.page-transition` wrapper. That wrapper keeps a persisted identity transform
  // from its entrance animation, which (a) makes it the containing block for the
  // fixed drawer — collapsing it to full page height instead of the viewport and
  // scrolling the close button off-screen on focus — and (b) establishes a
  // stacking context that traps the drawer below the header, so the header
  // intercepts clicks on the close button. Portaling to the body root fixes both.
  return createPortal(
    <>
      <div className={`drawer-overlay${visible ? ' show' : ''}`} onClick={onClose} />
      <aside
        className={`drawer${visible ? ' show' : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${current.title}`}
        tabIndex={-1}
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
    </>,
    document.body,
  )
}
