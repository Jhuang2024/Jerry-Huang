import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HERO_NODES } from '../data/home'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

const LINES = [
  [300, 70], [462.6, 137.4], [530, 300], [462.6, 462.6],
  [300, 530], [137.4, 462.6], [70, 300], [137.4, 137.4],
]

/* Hero identity scene: radial constellation around the headshot with
   draw-in lines, orbiting particles, and pointer-tilt parallax. Nodes are
   now router links into the deeper pages. */
export default function HeroScene() {
  const wrapRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    const wrap = wrapRef.current
    if (!scene || !wrap) return
    const reduce = prefersReducedMotion()
    if (!reduce) requestAnimationFrame(() => scene.classList.add('jh-animate'))
    if (reduce || !hasFinePointer()) return

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      scene.style.transform = `rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`
    }
    const onLeave = () => { scene.style.transform = '' }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-scene-wrap reveal in-view" ref={wrapRef}>
      <div className="hero-scene" ref={sceneRef}>
        <svg className="hs-lines" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <circle className="hs-ring" cx="300" cy="300" r="230" />
          <circle className="hs-ring hs-ring--inner" cx="300" cy="300" r="148" />
          {LINES.map(([x2, y2], i) => (
            <line key={i} className="hs-line" style={{ '--i': i }} x1="300" y1="300" x2={x2} y2={y2} pathLength="1" />
          ))}
        </svg>

        {HERO_NODES.map((node, i) => (
          <Link key={node.label} className="hs-node" to={node.to} style={{ ...node.style, '--i': i }}>
            <span className="hs-dot"></span>
            <span className="hs-label">{node.label.replace(/ /g, ' ')}</span>
          </Link>
        ))}

        <div className="hs-core">
          <img src="/assets/images/jerry-huang-headshot.webp" alt="Jerry Huang" />
          <span className="hs-core-ring" aria-hidden="true"></span>
        </div>
        <div className="orbit-particles" aria-hidden="true">
          <div className="orbit-ring orbit-ring--1"><i></i></div>
          <div className="orbit-ring orbit-ring--2"><i></i></div>
          <div className="orbit-ring orbit-ring--3"><i></i></div>
        </div>
      </div>
    </div>
  )
}
