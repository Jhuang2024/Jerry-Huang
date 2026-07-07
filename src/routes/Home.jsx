import { Link } from 'react-router-dom'
import BuildFeature from '../components/BuildFeature'
import ExploreGrid from '../components/ExploreGrid'
import Hero from '../components/Hero'
import { ArrowRight } from '../components/Icons'
import IdentityStrip from '../components/IdentityStrip'
import { LogoMarquee, SignalMarquee } from '../components/Marquees'
import Overview from '../components/Overview'
import Separator from '../components/Separator'
import WorkSection from '../components/WorkSection'
import { SIGNAL_MARQUEE } from '../data/home'
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
      <IdentityStrip />
      <SignalMarquee items={SIGNAL_MARQUEE} />
      <LogoMarquee />
      <BuildFeature />
      <Separator />
      <WorkSection
        limit={2}
        num="02"
        eyebrow="Featured work"
        title="Things I've built."
        lead="Two case studies up front: the full set, plus the build graph, lives on the projects page."
      >
        <div className="section-cta reveal">
          <Link className="btn btn-ghost magnetic ripple" to="/projects">
            View all projects
            <ArrowRight />
          </Link>
        </div>
      </WorkSection>
      <ExploreGrid />
    </>
  )
}
