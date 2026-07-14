import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../data/site'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { prefersReducedMotion } from '../lib/media'
import { ArrowRight, SearchIcon } from './Icons'

/* Command menu (⌘K), ported from script.js. Navigation commands now route
   across pages (deep-linking to sections via hash); actions are unchanged. */
export default function CommandMenu({ open, onClose }) {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const showToast = useToast()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(false) // drives the .show transition
  const [mounted, setMounted] = useState(false) // drives hidden/unmount timing
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const lastFocusRef = useRef(null)

  const commands = useMemo(() => [
    { group: 'Navigate', label: 'Home', action: () => navigate('/') },
    { group: 'Navigate', label: 'About', action: () => navigate('/about') },
    { group: 'Navigate', label: 'Trajectory', action: () => navigate('/about#trajectory') },
    { group: 'Navigate', label: 'Current build · Helicyn', action: () => navigate('/projects#build') },
    { group: 'Navigate', label: 'Selected work', action: () => navigate('/projects#work') },
    { group: 'Navigate', label: 'Build graph', action: () => navigate('/projects#constellation') },
    { group: 'Navigate', label: 'Experience timeline', action: () => navigate('/experience#timeline') },
    { group: 'Navigate', label: 'Public stage', action: () => navigate('/speaking') },
    { group: 'Navigate', label: 'Photography', action: () => navigate('/photography') },
    { group: 'Navigate', label: 'Proof', action: () => navigate('/experience#proof') },
    { group: 'Navigate', label: 'Builder stack', action: () => navigate('/experience#skills') },
    { group: 'Navigate', label: 'Contact', action: () => navigate('/contact') },
    { group: 'Actions', label: 'Toggle light / dark theme', action: () => toggleTheme() },
    { group: 'Actions', label: 'Visit Helicyn ↗', action: () => window.open(SITE.helicyn, '_blank', 'noopener') },
    { group: 'Actions', label: 'Connect on LinkedIn ↗', action: () => window.open(SITE.linkedin, '_blank', 'noopener') },
    {
      group: 'Actions', label: 'Copy email address',
      action: async () => {
        try { await navigator.clipboard.writeText(SITE.email) } catch (e) { /* noop */ }
        showToast('Email address copied to clipboard')
      },
    },
  ], [navigate, toggleTheme, showToast])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => { setActiveIdx(0) }, [query])

  // open/close orchestration (mount → .show, .show off → unmount)
  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement
      setMounted(true)
      setQuery('')
      setActiveIdx(0)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setVisible(true)
        inputRef.current?.focus()
      }))
    } else if (mounted) {
      setVisible(false)
      document.body.style.overflow = ''
      const t = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : 220)
      lastFocusRef.current?.focus?.()
      return () => clearTimeout(t)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const run = (idx) => {
    const cmd = filtered[idx]
    if (!cmd) return
    onClose()
    cmd.action()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
      queueMicrotask(() => listRef.current?.querySelector('.active')?.scrollIntoView({ block: 'nearest' }))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
      queueMicrotask(() => listRef.current?.querySelector('.active')?.scrollIntoView({ block: 'nearest' }))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(activeIdx)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  if (!mounted) return null

  let lastGroup = null
  return (
    <>
      <div className={`cmdk-overlay${visible ? ' show' : ''}`} onClick={onClose} />
      <div
        className={`cmdk${visible ? ' show' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
      >
        <div className="cmdk-input-row">
          <SearchIcon className="cmdk-search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Jump to a page or run a command…"
            autoComplete="off"
            spellCheck="false"
            aria-label="Search commands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <div className="cmdk-list" ref={listRef} role="listbox">
          {!filtered.length && <div className="cmdk-empty">No matching command.</div>}
          {filtered.map((cmd, i) => {
            const groupLabel = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            return (
              <div key={cmd.label}>
                {groupLabel && <div className="cmdk-group-label">{groupLabel}</div>}
                <div
                  className={`cmdk-item${i === activeIdx ? ' active' : ''}`}
                  role="option"
                  aria-selected={i === activeIdx}
                  onClick={() => run(i)}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <span>{cmd.label}</span>
                  <ArrowRight className="cmdk-arrow" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
