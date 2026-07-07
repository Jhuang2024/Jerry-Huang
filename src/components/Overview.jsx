import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HERO_STATS } from '../data/home'
import { SITE } from '../data/site'
import { prefersReducedMotion } from '../lib/media'
import { ArrowRight, ArrowUpRight } from './Icons'

/* The wordier hero beat: lead, CTAs, and the count-up stat strip.
   The HTML renders each stat's final value; the animation counts over it
   and always lands back on that value (same as the original). */
export default function Overview() {
  const statsRef = useRef(null)

  useEffect(() => {
    const wrap = statsRef.current
    if (!wrap) return
    if (prefersReducedMotion()) {
      wrap.classList.add('in-view')
      return
    }
    const rafIds = []
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count)
      const prefix = el.dataset.prefix || ''
      const suffix = el.dataset.suffix || ''
      const dur = 1400
      const start = performance.now()
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const val = Math.round(target * eased)
        el.innerHTML = prefix + val.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '')
        if (p < 1) rafIds.push(requestAnimationFrame(step))
      }
      rafIds.push(requestAnimationFrame(step))
    }
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          e.target.querySelectorAll('.num').forEach(animateCount)
          so.unobserve(e.target)
        }
      })
    }, { threshold: 0.4 })
    so.observe(wrap)
    return () => {
      so.disconnect()
      rafIds.forEach((id) => cancelAnimationFrame(id))
    }
  }, [])

  return (
    <section id="overview" className="overview" data-screen-label="Overview">
      <p className="hero-lead reveal in-view">
        Currently building <a className="lead-link" href={SITE.helicyn} target="_blank" rel="noopener noreferrer">Helicyn</a>,
        a machine-learning startup in San Francisco, after founding EmpowerAIM, leading KidsToKids,
        and presenting at UN and global forums along the way.
      </p>
      <div className="hero-cta reveal in-view">
        <Link className="btn btn-primary magnetic ripple" to="/projects">
          View work
          <ArrowRight />
        </Link>
        <a className="btn btn-ghost magnetic ripple" href={SITE.helicyn} target="_blank" rel="noopener noreferrer">
          Visit Helicyn
          <ArrowUpRight />
        </a>
        <Link className="btn btn-ghost magnetic ripple" to="/contact">
          Contact
        </Link>
      </div>

      <div className="hero-stats reveal in-view" ref={statsRef}>
        {HERO_STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="num" data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix}>
              {s.prefix}{s.display}<span className="suffix">{s.suffix}</span>
            </div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
