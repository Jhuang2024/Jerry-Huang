import { useEffect, useRef } from 'react'

const stack = []
let previousOverflow = ''
let previousInert = false
const focusable = 'button:not([disabled]), a[href], input, textarea, select, [tabindex="0"]'

// A shared stack keeps nested dialogs from unlocking each other's background.
export function useModal(open, ref, onClose, initialFocus) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    const token = { ref }
    const root = document.getElementById('root')
    if (!stack.length) {
      previousOverflow = document.body.style.overflow
      previousInert = root.inert
      document.body.style.overflow = 'hidden'
      root.inert = true
    }
    stack.push(token)
    const frame = requestAnimationFrame(() => (initialFocus?.current || ref.current)?.focus())
    const onKey = (event) => {
      if (stack.at(-1) !== token) return
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeRef.current() }
      if (event.key !== 'Tab') return
      const items = [...ref.current.querySelectorAll(focusable)].filter(el => el.getClientRects().length)
      const index = items.indexOf(document.activeElement)
      if (!items.length) { event.preventDefault(); ref.current.focus(); return }
      if (event.shiftKey && index <= 0) { event.preventDefault(); items.at(-1).focus() }
      else if (!event.shiftKey && (index === -1 || index === items.length - 1)) { event.preventDefault(); items[0].focus() }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey, true)
      stack.splice(stack.indexOf(token), 1)
      if (!stack.length) { document.body.style.overflow = previousOverflow; root.inert = previousInert }
      if (previousFocus?.isConnected && !previousFocus.closest('[inert]')) previousFocus.focus({ preventScroll: true })
    }
  }, [open, ref, initialFocus])
}
