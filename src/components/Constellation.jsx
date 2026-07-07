import { useEffect, useRef, useState } from 'react'
import { CST_PROJECTS, CST_SKILLS } from '../data/constellation'
import { EVIDENCE } from '../data/evidence'
import { hasFinePointer } from '../lib/media'
import Section from './Section'

/* Build graph: hover/focus/click a project or skill to see its connections
   (SVG edges + dim/highlight) and a detail panel fed by the evidence
   registry. Ported from script.js with edges drawn from live layout. */
export default function Constellation() {
  const wrapRef = useRef(null)
  const edgesRef = useRef(null)
  const [selected, setSelected] = useState(null) // pinned node id
  const [hovered, setHovered] = useState(null)

  const activeId = selected || hovered
  const activeNode = activeId
    ? [...CST_PROJECTS, ...CST_SKILLS].find((n) => n.id === activeId)
    : null
  const isProject = activeNode ? Boolean(activeNode.skills) : false
  const relatedIds = activeNode ? (activeNode.skills || activeNode.projects) : []

  const stateFor = (id) => {
    if (!activeNode) return ''
    if (id === activeId || relatedIds.includes(id)) return ' cst-active'
    return ' cst-dim'
  }

  // draw SVG edges from the active node to its related nodes
  useEffect(() => {
    const edges = edgesRef.current
    const wrap = wrapRef.current
    if (!edges || !wrap) return
    const draw = () => {
      edges.innerHTML = ''
      if (!activeNode || !hasFinePointer()) return
      const box = wrap.getBoundingClientRect()
      edges.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
      const sourceEl = wrap.querySelector(`[data-node="${activeId}"]`)
      if (!sourceEl) return
      const sr = sourceEl.getBoundingClientRect()
      const sx = sr.left - box.left + sr.width / 2
      const sy = sr.top - box.top + sr.height / 2
      relatedIds.forEach((rid) => {
        const el = wrap.querySelector(`[data-node="${rid}"]`)
        if (!el) return
        const r = el.getBoundingClientRect()
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', sx)
        line.setAttribute('y1', sy)
        line.setAttribute('x2', r.left - box.left + r.width / 2)
        line.setAttribute('y2', r.top - box.top + r.height / 2)
        edges.appendChild(line)
      })
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [activeId, activeNode, relatedIds])

  const onNodeClick = (id) => {
    setSelected((prev) => (prev === id ? null : id))
  }

  const detail = selected ? EVIDENCE[selected] : null
  const relatedLabels = selected && activeNode
    ? relatedIds
        .map((rid) => [...CST_PROJECTS, ...CST_SKILLS].find((n) => n.id === rid)?.label)
        .filter(Boolean)
        .join(' · ')
    : ''

  const renderNode = (node, kind) => (
    <button
      key={node.id}
      className={`cst-node cst-node--${kind} ripple${stateFor(node.id)}`}
      data-node={node.id}
      onMouseEnter={() => { if (!selected) setHovered(node.id) }}
      onMouseLeave={() => { if (!selected) setHovered(null) }}
      onFocus={() => setHovered(node.id)}
      onBlur={() => setHovered(null)}
      onClick={() => onNodeClick(node.id)}
    >
      {node.label}
    </button>
  )

  return (
    <Section id="constellation" screenLabel="Build Graph" num="03" eyebrow="Build graph" title="Projects and skills, connected." lead="Hover or focus a project or a skill to see how they connect.">
      <div className="flicker-grid" aria-hidden="true"></div>
      <div className="constellation" ref={wrapRef}>
        <svg className="cst-edges" ref={edgesRef} aria-hidden="true"></svg>
        <div className="cst-col cst-col--projects">
          <div className="cst-col-title">Projects &amp; ventures</div>
          {CST_PROJECTS.map((n) => renderNode(n, 'project'))}
        </div>
        <div className="cst-col cst-col--skills">
          <div className="cst-col-title">Skills</div>
          {CST_SKILLS.map((n) => renderNode(n, 'skill'))}
        </div>
      </div>
      <div className="cst-detail" aria-live="polite">
        {detail ? (
          <>
            <div className="cst-detail-title">{detail.title}</div>
            <p>{detail.text}</p>
            <p className="cst-detail-links">
              <span className="cst-hint">{isProject ? 'Skills' : 'Projects'}: {relatedLabels || 'none'}</span>
            </p>
          </>
        ) : (
          <p className="cst-hint">Select a node to see its connections here.</p>
        )}
      </div>
    </Section>
  )
}
