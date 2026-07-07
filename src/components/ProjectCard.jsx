import { ArrowRight } from './Icons'

/* Selected-work case-study card: schematic visual, numbered header, tags,
   and the "view case study" affordance. Opens the project drawer. */
export default function ProjectCard({ project, delay, onOpen }) {
  const { Visual } = project
  const open = () => onOpen(project)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  }

  return (
    <article
      className="work-card reveal"
      data-project={project.id}
      data-delay={delay || undefined}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open case study: ${project.title}`}
      onClick={open}
      onKeyDown={onKeyDown}
    >
      <div className="wc-visual" aria-hidden="true">
        <Visual />
      </div>
      <div className="wc-body">
        <div className="wc-top">
          <span className="wc-num">{project.num}</span>
          <span className="wc-cat">{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <div className="when">{project.when}</div>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <span className="wc-open">View case study <ArrowRight /></span>
      </div>
    </article>
  )
}
