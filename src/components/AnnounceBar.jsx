import { useEffect, useState } from 'react'
import { CloseIcon } from './Icons'

/* Dismissible announcement banner. Dismissal persists via the same
   localStorage key as before; the body class drives the CSS offsets. */
export default function AnnounceBar() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem('jh-announce-dismissed') === '1' } catch (e) { return false }
  })

  useEffect(() => {
    document.body.classList.toggle('announce-dismissed', dismissed)
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    try { localStorage.setItem('jh-announce-dismissed', '1') } catch (e) { /* noop */ }
  }

  return (
    <div className="announce-bar" role="note">
      <span className="announce-text">
        🚀 Building <b>Helicyn</b> in San Francisco &mdash; open to collaborators &amp; conversations &nbsp;·&nbsp; UC Berkeley '30
      </span>
      <button className="announce-close" onClick={dismiss} aria-label="Dismiss announcement">
        <CloseIcon strokeWidth="2.4" />
      </button>
    </div>
  )
}
