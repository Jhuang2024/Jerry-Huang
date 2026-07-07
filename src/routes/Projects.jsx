import BuildFeature from '../components/BuildFeature'
import Constellation from '../components/Constellation'
import Separator from '../components/Separator'
import WorkSection from '../components/WorkSection'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Projects() {
  usePageMeta({
    title: 'Projects · Jerry Huang',
    description: 'Helicyn plus case studies: AI Fish Identification (published research), AI Social Media Analytics, Swedule, and a smart water-parameter tester.',
    path: '/projects',
  })

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Projects</span>
        <h1>Built, shipped, published.</h1>
        <p className="page-lead">
          The current build and the case studies behind it: problem, build, and
          outcome for each, plus how the projects and skills connect.
        </p>
      </div>
      <BuildFeature num="01" />
      <Separator />
      <WorkSection num="02" />
      <Constellation />
    </>
  )
}
