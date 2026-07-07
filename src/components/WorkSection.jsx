import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectDrawer from './ProjectDrawer'
import Section from './Section'

/* Selected-work grid + case-study drawer. `limit` renders a featured
   subset (homepage teaser); no limit renders the full grid (/projects). */
export default function WorkSection({ limit, num = '03', eyebrow = 'Selected work', title = "Things I've built.", lead = 'Case studies, not a project list: problem, build, and outcome for each.', children }) {
  const [openProject, setOpenProject] = useState(null)
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS

  return (
    <Section id="work" screenLabel="Selected Work" num={num} eyebrow={eyebrow} title={title} lead={lead}>
      <div className="work-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i > 0 ? Math.min(i, 4) : undefined} onOpen={setOpenProject} />
        ))}
      </div>
      {children}
      <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </Section>
  )
}
