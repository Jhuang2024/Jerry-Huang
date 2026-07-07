import { PROJECTS } from './projects'
import { EXPERIENCE } from './experience'

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

export const EVIDENCE = registry
