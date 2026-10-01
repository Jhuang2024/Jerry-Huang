import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/* Light/dark theme, synced across the header icon and the mobile-menu
   switch, persisted to the same localStorage key as the original site.
   The initial attribute is applied pre-paint by an inline script in
   index.html to avoid a flash of the wrong theme. */
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('jh-theme', theme) } catch { /* Storage can be unavailable. */ }
  }, [theme])
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
