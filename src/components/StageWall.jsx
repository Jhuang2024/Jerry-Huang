import { STAGE } from '../data/stage'
import CardLinks from './CardLinks'
import Section from './Section'

/* Public stage wall: forum cards with the dramatic 3D hover tilt. */
export default function StageWall({ num = '01' }) {
  return (
    <Section
      id="stage"
      screenLabel="Public Stage"
      num={num}
      eyebrow="Public stage"
      title="Presenting the work, globally."
      lead="Selected forums where EmpowerAIM's work on AI and digital equity was presented, as a UN Youth Delegate."
      headClassName="blur-in"
    >
      <div className="stage-wall stagger">
        {STAGE.map((s, i) => (
          <article key={s.title} className="stage-card reveal" data-delay={i > 0 ? Math.min(i, 4) : undefined}>
            <div className="sc-top"><span className="sc-org">{s.org}</span><span className="sc-date">{s.date}</span></div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <CardLinks links={s.links} />
          </article>
        ))}
      </div>
    </Section>
  )
}
