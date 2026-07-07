import BuilderStack from '../components/BuilderStack'
import ProofGrid from '../components/ProofGrid'
import SectionCta from '../components/SectionCta'
import Separator from '../components/Separator'
import Timeline from '../components/Timeline'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Experience() {
  usePageMeta({
    title: 'Experience · Jerry Huang',
    description: 'EmpowerAIM, KidsToKids, AWS, UPenn ESAP, SHAD Canada, UCC: leadership, internships, awards, and the builder stack behind them.',
    path: '/experience',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Experience</span>
        <h1>The track record.</h1>
        <p className="page-lead">
          The timeline of ventures, internships and programs, then the proof, and
          the stack it was all built with.
        </p>
      </div>
      <Timeline />
      <Separator />
      <ProofGrid />
      <BuilderStack />
      <SectionCta to="/speaking">See the public stage</SectionCta>
    </>
  )
}
