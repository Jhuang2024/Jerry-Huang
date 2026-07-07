import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/media'
import { ArrowUp } from './Icons'

/* Back-to-top floating button with the arrow spin on click. */
export default function ToTop() {
  const [show, setShow] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onClick = () => {
    const reduce = prefersReducedMotion()
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    const btn = btnRef.current
    if (btn && !reduce) {
      btn.classList.remove('spin')
      void btn.offsetWidth
      btn.classList.add('spin')
      setTimeout(() => btn.classList.remove('spin'), 550)
    }
  }

  return (
    <button ref={btnRef} className={`to-top${show ? ' show' : ''}`} onClick={onClick} aria-label="Back to top">
      <ArrowUp />
    </button>
  )
}
