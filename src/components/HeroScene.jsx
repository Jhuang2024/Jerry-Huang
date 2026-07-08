import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HERO_NODES } from '../data/home'
import { hasFinePointer, prefersReducedMotion } from '../lib/media'

const VIEWBOX = 600
const CENTER = VIEWBOX / 2
const ORBIT_RADIUS = 230
const INNER_RING_RADIUS = 148
const START_ANGLE_DEG = -90 // 12 o'clock; angle increases clockwise

/* Polar → cartesian, in the same 0-600 space as the SVG viewBox. Every
   node is spaced evenly around ORBIT_RADIUS, so it always lands exactly
   on the outer ring's circumference, at any screen size. */
function orbitPoint(index, total, radius = ORBIT_RADIUS) {
  const angle = ((START_ANGLE_DEG + (360 / total) * index) * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) }
}

const NODE_POINTS = HERO_NODES.map((_, i) => orbitPoint(i, HERO_NODES.length))

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
        <svg className="hs-lines" viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} aria-hidden="true" focusable="false">
          <circle className="hs-ring" cx={CENTER} cy={CENTER} r={ORBIT_RADIUS} />
          <circle className="hs-ring hs-ring--inner" cx={CENTER} cy={CENTER} r={INNER_RING_RADIUS} />
          {NODE_POINTS.map((p, i) => (
            <line key={i} className="hs-line" style={{ '--i': i }} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} pathLength="1" />
          ))}
        </svg>

        {HERO_NODES.map((node, i) => {
          const p = NODE_POINTS[i]
          const style = { left: `${(p.x / VIEWBOX) * 100}%`, top: `${(p.y / VIEWBOX) * 100}%`, '--i': i }
          return (
            <Link key={node.label} className="hs-node" to={node.to} style={style}>
              <span className="hs-dot"></span>
              <span className="hs-label">{node.label}</span>
            </Link>
          )
        })}

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
