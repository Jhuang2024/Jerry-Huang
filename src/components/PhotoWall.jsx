import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PHOTOGRAPHY } from '../data/photography'
import Section from './Section'
import { ArrowRight, CloseIcon } from './Icons'
import { useModal } from '../hooks/useModal'

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
      title="Seventeen favorites."
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
  const boxRef = useRef(null)
  const closeBtnRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  const stableClose = useCallback(() => closeRef.current(), [])
  useModal(index !== null, boxRef, stableClose, closeBtnRef)
  const count = PHOTOGRAPHY.length
  useEffect(() => {
    if (index === null) return
    const onKey = e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); onNavigate((index + 1) % count) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onNavigate((index - 1 + count) % count) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, count, onNavigate])
  if (index === null) return null
  const current = index
  const visible = true
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
      tabIndex={-1}
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
        <img
          src={photo.full ?? photo.src}
          className={photo.full ? 'full-res' : undefined}
          alt={photo.alt}
        />
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
