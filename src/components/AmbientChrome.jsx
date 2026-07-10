import { useEffect, useRef } from 'react'

/* Page-wide chrome, reduced to a single deliberate element: the hairline
   scroll-progress indicator. The old ambient layers (aurora mesh, grid,
   film grain, cursor/scroll glows) are gone; the design now leans on
   typography, imagery, and space instead of effects. */
export default function AmbientChrome() {
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" ref={progressRef}></div>
}
