import EducationList from '../components/EducationList'
import FacetsTabs from '../components/FacetsTabs'
import { SignalMarquee } from '../components/Marquees'
import Separator from '../components/Separator'
import Trajectory from '../components/Trajectory'
import { SIGNAL_MARQUEE_ALT } from '../data/home'
import { usePageMeta } from '../hooks/usePageMeta'

export default function About() {
  usePageMeta({
    title: 'About · Jerry Huang',
    description: "The path from Toronto to Berkeley: Jerry Huang's trajectory, education, and the builder / speaker / athlete lenses behind the resume.",
    path: '/about',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">About</span>
        <h1>From Toronto to Berkeley.</h1>
        <p className="page-lead">
          Founder, builder, researcher, speaker — a few different lenses on the same
          path, plus the education and trajectory underneath it.
        </p>
      </div>
      <FacetsTabs />
      <Trajectory />
      <Separator />
      <EducationList />
      <SignalMarquee items={SIGNAL_MARQUEE_ALT} />
    </>
  )
}
