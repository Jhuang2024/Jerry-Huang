import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import StageWall from '../components/StageWall'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Speaking() {
  usePageMeta({
    title: 'Public Stage · Jerry Huang',
    description: 'UN STI Forum, UNESCO Forum on Education × AI, Climate Week NYC: presenting EmpowerAIM globally as a UN Youth Delegate.',
    path: '/speaking',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Public stage</span>
        <h1>On the public stage.</h1>
        <p className="page-lead">
          As a UN Youth Delegate, EmpowerAIM's work on AI and digital equity has been
          presented at forums from UN HQ to UNESCO.
        </p>
      </div>
      <StageWall />
      <div className="hero-cta reveal" style={{ justifyContent: 'center', paddingBottom: 'clamp(3rem, 7vw, 5rem)' }}>
        <Link className="btn btn-primary magnetic" to="/contact">
          Get in touch
          <ArrowRight />
        </Link>
        <Link className="btn btn-ghost magnetic" to="/experience#exp-empoweraim">
          See the EmpowerAIM story
        </Link>
      </div>
    </>
  )
}
