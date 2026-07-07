import { useLocation } from 'react-router-dom'

/* Route-level entrance transition. Keyed on pathname so each navigation
   re-runs the entrance animation; reduced motion disables it via CSS. */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  )
}
