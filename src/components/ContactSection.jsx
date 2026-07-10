import { useRef, useState } from 'react'
import { SITE } from '../data/site'
import { useToast } from '../context/ToastContext'
import { CheckCircle, CopyIcon, SendIcon } from './Icons'

/* Contact finale: availability callout and the Formspree form with
   validation and a toast on success. */
export default function ContactSection() {
  const showToast = useToast()
  const submitRef = useRef(null)
  const [status, setStatus] = useState({ msg: '', color: '' })
  const [copyLabel, setCopyLabel] = useState(SITE.email)
  const [copied, setCopied] = useState(false)

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
      <div className="section-head reveal" style={{ textAlign: 'center' }}>
        <span className="eyebrow" style={{ marginInline: 'auto' }}>Get in touch</span>
        <h2 style={{ marginInline: 'auto' }}>Building something technical, weird, or ambitious?</h2>
        <p style={{ marginInline: 'auto' }}>Send it.</p>
      </div>
      <div className="callout reveal" role="note">
        <span className="callout-icon" aria-hidden="true"><CheckCircle /></span>
        <div>
          <strong>Currently open to internships &amp; collaborations</strong>
        </div>
      </div>
      <div className="contact-card reveal">
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
