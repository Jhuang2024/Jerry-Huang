import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PHOTOGRAPHY } from '../data/photography'
import Section from './Section'
import { ArrowRight, CloseIcon } from './Icons'
import { prefersReducedMotion } from '../lib/media'

/* Amateur-photography wall: a uniform 4:5 grid in the site's monochrome
   treatment, color on hover. Click a frame to expand it in a lightbox. */
export default function PhotoWall() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <Section
      id="photo-wall"
      screenLabel="Photo Wall"
      num="01"
      eyebrow="Selected frames"
      title="Sixteen favorites."
      lead="Shot mostly on a phone, edited on it too. Hover a frame for color, click to expand."
    >
      <div className="photo-wall reveal">
        {PHOTOGRAPHY.map((photo, i) => (
          <figure key={photo.src}>
            <button
              type="button"
              className="photo-expand"
              onClick={() => setActiveIndex(i)}
              aria-label={`Expand photo: ${photo.caption}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <PhotoLightbox index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </Section>
  )
}

/* Expanded-photo lightbox with overlay, Escape close, arrow-key prev/next,
   and focus trap, following the ProjectDrawer open/close orchestration. */
function PhotoLightbox({ index, onClose, onNavigate }) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)
  const boxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const count = PHOTOGRAPHY.length

  // open / close orchestration (mount → .show; .show off → unmount)
  useEffect(() => {
    if (index !== null) {
      if (current === null) {
        lastFocusedRef.current = document.activeElement
        document.body.style.overflow = 'hidden'
        requestAnimationFrame(() => requestAnimationFrame(() => {
          setVisible(true)
          closeBtnRef.current?.focus()
        }))
      }
      setCurrent(index)
    } else if (current !== null) {
      setVisible(false)
      document.body.style.overflow = ''
      const t = setTimeout(() => setCurrent(null), prefersReducedMotion() ? 0 : 280)
      lastFocusedRef.current?.focus?.()
      return () => clearTimeout(t)
    }
  }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  // restore scroll if unmounted while open
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % count)
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, count, onClose, onNavigate])

  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !boxRef.current) return
    const focusables = [...boxRef.current.querySelectorAll('button')]
      .filter((el) => el.offsetParent !== null)
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  if (current === null) return null
  const photo = PHOTOGRAPHY[current]

  // Portaled to <body>: the page-transition wrapper keeps a transform applied,
  // which would otherwise become the containing block for position: fixed.
  return createPortal(
    <div
      className={`photo-lightbox${visible ? ' show' : ''}`}
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded photo: ${photo.caption}`}
      onClick={onClose}
      onKeyDown={trapFocus}
    >
      <button className="lightbox-close" ref={closeBtnRef} onClick={onClose} aria-label="Close expanded photo">
        <CloseIcon />
      </button>
      <button
        className="lightbox-nav prev"
        onClick={(e) => { e.stopPropagation(); onNavigate((current - 1 + count) % count) }}
        aria-label="Previous photo"
      >
        <ArrowRight />
      </button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} />
        <figcaption>
          {photo.caption}
          <span className="lightbox-count">{current + 1} / {count}</span>
        </figcaption>
      </figure>
      <button
        className="lightbox-nav next"
        onClick={(e) => { e.stopPropagation(); onNavigate((current + 1) % count) }}
        aria-label="Next photo"
      >
        <ArrowRight />
      </button>
    </div>,
    document.body
  )
}
