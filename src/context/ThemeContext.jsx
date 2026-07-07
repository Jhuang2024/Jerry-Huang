import { createContext, useCallback, useContext, useState } from 'react'
import { useToast } from './ToastContext'

/* Light/dark theme, synced across the header icon and the mobile-menu
   switch, persisted to the same localStorage key as the original site.
   The initial attribute is applied pre-paint by an inline script in
   index.html to avoid a flash of the wrong theme. */
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const showToast = useToast()
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('jh-theme', next) } catch (e) { /* noop */ }
      showToast(`Switched to ${next} theme`)
      return next
    })
  }, [showToast])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
