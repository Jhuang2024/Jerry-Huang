import { useEffect, useRef } from 'react'
import { SITE } from '../data/site'
import { prefersReducedMotion } from '../lib/media'
import { ArrowUpRight } from './Icons'
import MagneticButton from './MagneticButton'

/* "Current build: Helicyn" feature panel with the Helicyn logo (teal
   sweep passing across it every few seconds) and the animated
   build-stage progress bar (driven by the jh-animate class on scroll
   into view). `brief` trims it to the short homepage teaser (no
   bullets/progress bar); the full version with those details lives on
   the projects page. */
export default function BuildFeature({ num = '01', brief = false }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.classList.add('jh-animate')
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('jh-animate'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="build" className="section build-feature" data-screen-label="Current Build" ref={sectionRef}>
      <div className="bf-panel reveal">
        <div className="bf-graphic" aria-hidden="true">
          <div className="bf-logo"></div>
        </div>
        <div className="bf-content">
          <span className="eyebrow"><span className="sec-num">({num})</span>Current build</span>
          <h2>Helicyn</h2>
          <p className="bf-lead">A machine-learning startup based in San Francisco. Early, technical, and building in the open.</p>
          {!brief && (
            <ul className="bf-bullets">
              <li>0→1 machine-learning infrastructure work in the Bay Area.</li>
              <li>Always looking to meet new people and potential collaborators.</li>
            </ul>
          )}
          <div className="tag-row">
            <span className="tag tag-secondary">Machine Learning</span>
            <span className="tag tag-outline">0→1</span>
            <span className="tag">San Francisco</span>
          </div>
          {!brief && (
            <div className="progress-block">
              <div className="progress-top"><span>Build stage</span><span>Early · 0→1</span></div>
              <div className="progress" role="progressbar" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100" aria-label="Helicyn build progress">
                <div className="progress-fill" style={{ '--val': '22%' }}></div>
              </div>
            </div>
          )}
          <MagneticButton href={SITE.helicyn} variant="primary">
            Visit Helicyn
            <ArrowUpRight />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
