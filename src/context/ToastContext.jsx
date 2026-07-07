import { createContext, useCallback, useContext, useRef, useState } from 'react'

/* Toast notifications (shadcn/sonner-style), ported from script.js showToast(). */
const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const showToast = useCallback((message) => {
    const id = ++idRef.current
    setToasts((t) => [...t, { id, message, show: false }])
    // two-frame mount → .show transition, mirroring the original rAF pattern
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setToasts((t) => t.map((x) => (x.id === id ? { ...x, show: true } : x)))
      )
    )
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, show: false } : x)))
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 300)
    }, 2600)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast${t.show ? ' show' : ''}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
