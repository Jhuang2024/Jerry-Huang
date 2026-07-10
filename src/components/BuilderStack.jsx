import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EVIDENCE } from '../data/evidence'
import { LANGUAGES, SKILL_CATEGORIES } from '../data/skills'
import { flashScrollTo } from '../lib/scroll'
import Section from './Section'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/media'

function LanguageBars() {
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const fill = () => list.querySelectorAll('i').forEach((i) => { i.style.width = i.dataset.w + '%' })
    if (prefersReducedMotion()) { fill(); return }
    const lo = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { fill(); lo.disconnect() } })
    }, { threshold: 0.4 })
    lo.observe(list)
    return () => lo.disconnect()
  }, [])

  return (
    <div className="lang-block reveal" data-delay="1">
      <div className="col-title">Languages</div>
      <div className="lang-list" ref={listRef}>
        {LANGUAGES.map((l) => (
          <div className="lang" key={l.name}>
            <div className="lang-top"><span>{l.name}</span><span className="lvl">{l.level}</span></div>
            <div className="lang-bar"><i data-w={l.width}></i></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Builder stack: skill chips reveal an evidence panel showing where each
   skill has been used. Evidence lives in the data registry now, so links
   route across pages (or flash-scroll when the target is on this page). */
export default function BuilderStack() {
  const [activeSkill, setActiveSkill] = useState(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSkillClick = (skill) => {
    setActiveSkill((prev) => (prev?.label === skill.label ? null : skill))
  }

  const onEvidenceClick = (e, ev) => {
    e.preventDefault()
    if (ev.route === pathname) flashScrollTo(ev.hash)
    else navigate(`${ev.route}#${ev.hash}`)
  }

  return (
    <Section id="skills" screenLabel="Builder Stack" num="03" eyebrow="Builder stack" title="What I build with." lead="Select a skill to see where it's been used.">
      <div className="builder-stack reveal">
        <div className="bs-categories">
          {SKILL_CATEGORIES.map((catGroup) => (
            <div className="bs-cat" key={catGroup.title}>
              <div className="col-title">{catGroup.title}</div>
              <div className="bs-skills">
                {catGroup.skills.map((skill) => (
                  <button
                    key={skill.label}
                    className={`bs-skill${activeSkill?.label === skill.label ? ' bs-active' : ''}`}
                    onClick={() => onSkillClick(skill)}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bs-evidence-panel" aria-live="polite">
          {activeSkill ? (
            <>
              <div className="bs-evidence-title">Where {activeSkill.label} shows up</div>
              {activeSkill.evidence.map((id) => {
                const ev = EVIDENCE[id]
                if (!ev) return null
                return (
                  <div className="bs-evidence-item" key={id}>
                    <a href={`${ev.route}#${ev.hash}`} onClick={(e) => onEvidenceClick(e, ev)}>{ev.title}</a>
                    <p>{ev.text}</p>
                  </div>
                )
              })}
            </>
          ) : (
            <p className="bs-evidence-hint">Select a skill to see where it's used.</p>
          )}
        </div>
      </div>
      <LanguageBars />
    </Section>
  )
}
