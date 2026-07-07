import { useState } from 'react'
import { FAQ } from '../data/faq'
import { ChevronDown } from './Icons'
import Rich from './Rich'
import Section from './Section'

/* FAQ accordion — items toggle independently, as before. */
export default function FaqAccordion() {
  const [open, setOpen] = useState(() => FAQ.map(() => false))

  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  return (
    <Section className="faq" screenLabel="FAQ" eyebrow="FAQ" title="Quick answers.">
      <div className="accordion reveal">
        {FAQ.map((item, i) => (
          <div key={item.q} className={`accordion-item${open[i] ? ' open' : ''}`}>
            <button className="accordion-trigger" aria-expanded={open[i]} onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <ChevronDown className="accordion-chevron" />
            </button>
            <div className="accordion-panel">
              <div className="accordion-panel-inner"><p><Rich parts={item.a} /></p></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
