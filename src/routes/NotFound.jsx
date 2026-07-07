import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found · Jerry Huang',
    description: 'That page drifted out of orbit. Head back to jerry-huang.com.',
    path: '/404',
  })

  return (
    <section className="notfound" data-screen-label="404">
      <div className="nf-code" aria-hidden="true">404</div>
      <h1>This page drifted out of orbit.</h1>
      <p>
        The link may be old — the site recently reorganized into pages. Everything
        that was here still exists; it just has a new home.
      </p>
      <div className="hero-cta">
        <Link className="btn btn-primary magnetic ripple" to="/">
          Back home
          <ArrowRight />
        </Link>
        <Link className="btn btn-ghost magnetic ripple" to="/projects">
          View projects
        </Link>
      </div>
    </section>
  )
}
