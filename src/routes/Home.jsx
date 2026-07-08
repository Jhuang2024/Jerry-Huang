import BuildFeature from '../components/BuildFeature'
import ExploreGrid from '../components/ExploreGrid'
import Hero from '../components/Hero'
import { LogoMarquee } from '../components/Marquees'
import Overview from '../components/Overview'
import SectionCta from '../components/SectionCta'
import Separator from '../components/Separator'
import WorkSection from '../components/WorkSection'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta({
    title: "Jerry Huang · Founder at Helicyn · UC Berkeley '30",
    description: 'Jerry Huang is an AI founder, software engineer & entrepreneur building Helicyn, a machine-learning startup in the SF Bay Area. UC Berkeley \'30, ex-UCC.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Overview />
      <LogoMarquee />
      <Separator />
      <BuildFeature num="01" />
      <Separator />
      <WorkSection
        limit={2}
        num="02"
        eyebrow="Featured work"
        title="Things I've built."
        lead="Two case studies up front: the full set, plus the current build and the build graph, lives on the projects page."
      >
        <SectionCta to="/projects">View all projects</SectionCta>
      </WorkSection>
      <ExploreGrid />
    </>
  )
}
