import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site'
import { useToast } from '../context/ToastContext'
import { burstConfetti } from '../lib/confetti'
import { prefersReducedMotion } from '../lib/media'
import { CheckCircle, CopyIcon, SendIcon } from './Icons'

/* Contact finale: blob glow, drawn line flourish, availability callout, and
   the Formspree form with validation, toast, and confetti on success. */
export default function ContactSection() {
  const showToast = useToast()
  const visualRef = useRef(null)
  const submitRef = useRef(null)
  const [status, setStatus] = useState({ msg: '', color: '' })
  const [copyLabel, setCopyLabel] = useState(SITE.email)
  const [copied, setCopied] = useState(false)

  // line-draw flourish on scroll into view
  useEffect(() => {
    const el = visualRef.current
    if (!el || prefersReducedMotion()) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('jh-animate'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const subject = form.subject.value.trim()
    const message = form.message.value.trim()
    if (!name || !email || !subject || !message) return setStatus({ msg: 'Please fill out all fields.', color: 'var(--accent-2)' })
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return setStatus({ msg: 'Please enter a valid email.', color: 'var(--accent-2)' })
    if (message.length < 10) return setStatus({ msg: 'Message must be at least 10 characters.', color: 'var(--accent-2)' })
    setStatus({ msg: 'Sending…', color: 'var(--ink-muted)' })
    try {
      const res = await fetch(SITE.formspree, {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus({ msg: `Thanks, ${name}! Your message has been sent.`, color: 'var(--accent-success)' })
        showToast('Message sent, thanks for reaching out')
        form.reset()
        const btn = submitRef.current
        if (btn && !prefersReducedMotion()) {
          btn.classList.remove('burst'); void btn.offsetWidth; btn.classList.add('burst')
          setTimeout(() => btn.classList.remove('burst'), 750)
          const r = btn.getBoundingClientRect()
          burstConfetti(r.left + r.width / 2, r.top + r.height / 2)
        }
      } else {
        setStatus({ msg: 'Something went wrong, please try again later.', color: 'var(--accent-2)' })
      }
    } catch (err) {
      console.error(err)
      setStatus({ msg: 'Network error. Check your connection and retry.', color: 'var(--accent-2)' })
    }
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(SITE.email) } catch (e) { /* noop */ }
    setCopyLabel('Copied to clipboard')
    setCopied(true)
    showToast('Email address copied to clipboard')
    setTimeout(() => { setCopyLabel(SITE.email); setCopied(false) }, 1500)
  }

  return (
    <section id="contact" className="section contact" data-screen-label="Contact">
      <div className="blob-glow" aria-hidden="true"></div>
      <div className="contact-finale-visual reveal" ref={visualRef} aria-hidden="true">
        <svg viewBox="0 0 400 40"><path d="M0 20 C 100 20, 140 4, 200 20 S 300 36, 400 20" pathLength="1" /></svg>
      </div>
      <div className="section-head reveal" style={{ textAlign: 'center' }}>
        <span className="eyebrow" style={{ marginInline: 'auto' }}>Get in touch</span>
        <h2>Building something technical, weird, or ambitious?</h2>
        <p style={{ marginInline: 'auto' }}>Send it.</p>
      </div>
      <div className="callout reveal" role="note">
        <span className="callout-icon" aria-hidden="true"><CheckCircle /></span>
        <div>
          <strong>Currently open to internships &amp; collaborations</strong>
          <p>Reply time is usually under 48 hours.</p>
        </div>
      </div>
      <div className="contact-card border-beam reveal">
        <div className="persona-row">
          <span className="avatar">
            <img src="/assets/images/jerry-huang-headshot.webp" alt="" />
            <span className="avatar-status" aria-hidden="true"></span>
          </span>
          <div><strong>Jerry Huang</strong><span>Usually replies within 48 hours</span></div>
        </div>
        <form onSubmit={onSubmit}>
          <label>Name<input type="text" name="name" required /></label>
          <label>Email<input type="email" name="email" required /></label>
          <label className="full">Subject<input type="text" name="subject" required /></label>
          <label className="full">Message<textarea name="message" required></textarea></label>
          <button type="submit" ref={submitRef} className="btn btn-primary full magnetic">
            Send message
            <SendIcon />
          </button>
          <p className="status" role="status" style={{ color: status.color }}>{status.msg}</p>
        </form>
        <p className="contact-alt">Or email{' '}
          <button className="copy-email" onClick={copyEmail}>
            <span className={`label${copied ? ' copied' : ''}`}>{copyLabel}</span>
            <CopyIcon />
          </button>
          &nbsp;·&nbsp; <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn →</a>
        </p>
      </div>
    </section>
  )
}
