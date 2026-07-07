import { prefersReducedMotion } from './media'

/* Confetti burst (contact-form success delight). Imperative DOM particles,
   self-removing — safe alongside React since they live directly on <body>. */
export function burstConfetti(x, y) {
  if (prefersReducedMotion()) return
  const colors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-success)']
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span')
    p.className = 'confetti-piece'
    const angle = Math.random() * Math.PI * 2
    const dist = 70 + Math.random() * 90
    p.style.setProperty('--tx', (Math.cos(angle) * dist).toFixed(0) + 'px')
    p.style.setProperty('--ty', (Math.sin(angle) * dist - 40).toFixed(0) + 'px')
    p.style.setProperty('--r', (Math.random() * 480 - 240).toFixed(0) + 'deg')
    p.style.left = x + 'px'
    p.style.top = y + 'px'
    p.style.background = colors[i % colors.length]
    document.body.appendChild(p)
    setTimeout(() => p.remove(), 900)
  }
}
