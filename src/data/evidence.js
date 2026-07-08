import { PROJECTS } from './projects'
import { EXPERIENCE } from './experience'
import { CST_SKILLS } from './constellation'

/* Evidence registry: the single source of truth behind the Build Graph
   detail panel and the Builder Stack "where it's used" panel. In the vanilla
   site this was resolved by querying the one-page DOM; with routed pages it
   is data, and each entry knows which route (+ anchor) it lives on. */

const registry = {
  build: {
    title: 'Helicyn',
    text: 'A machine-learning startup based in San Francisco. Early, technical, and building in the open.',
    route: '/projects', hash: 'build',
  },
  helicyn: {
    title: 'Helicyn',
    text: 'A machine-learning startup based in San Francisco. Early, technical, and building in the open.',
    route: '/projects', hash: 'build',
  },
  stage: {
    title: 'Presenting the work, globally.',
    text: "Selected forums where EmpowerAIM's work on AI and digital equity was presented, as a UN Youth Delegate.",
    route: '/speaking', hash: 'stage',
  },
}

for (const p of PROJECTS) {
  registry[p.id] = { title: p.title, text: p.summary, route: '/projects', hash: 'work' }
}

for (const e of EXPERIENCE) {
  registry[e.evidenceId] = {
    title: `${e.role} · ${e.org}`,
    text: e.bullets[0].map((part) => (typeof part === 'string' ? part : part.b)).join(''),
    route: '/experience', hash: e.id,
  }
}

// Skill nodes in the Build Graph resolve here too; without these entries
// clicking a skill (as opposed to a project) left the detail panel stuck
// on the "select a node" placeholder.
const SKILL_TEXT = {
  ml: 'Convolutional nets, LLM pipelines, and applied ML across every technical project.',
  python: 'Primary language for model training, scraping, and pipeline code.',
  cnn: 'Convolutional neural networks trained for real-time species classification.',
  llm: 'Large language model pipelines for content generation and analysis.',
  react: 'Frontend framework for building product interfaces.',
  selenium: 'Browser automation for scraping TikTok and YouTube data.',
  js: 'Scripting language behind product builds like Swedule.',
  embedded: 'Firmware for sensor arrays and hardware monitoring.',
  hardware: 'Sensor integration and physical-device prototyping.',
  product: 'Shaping ideas into shipped, usable products.',
  startup: 'Founding and running early-stage ventures end to end.',
  leadership: 'Leading teams and organizations toward a shared goal.',
  speaking: 'Presenting work to global audiences, including the UN and UNESCO.',
}

for (const s of CST_SKILLS) {
  registry[s.id] = { title: s.label, text: SKILL_TEXT[s.id] || '', route: '/projects', hash: 'constellation' }
}

export const EVIDENCE = registry
