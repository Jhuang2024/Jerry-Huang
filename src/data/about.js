/* About-page content: facets tabs, trajectory stops, education. */

export const FACETS = [
  {
    id: 'builder',
    label: 'Builder',
    text: ['Founding ', { b: 'Helicyn' }, ' in San Francisco, shipping 0→1 machine-learning infrastructure, and building CNN and LLM pipelines from AI Fish Identification to AI Social Media Analytics.'],
  },
  {
    id: 'speaker',
    label: 'Speaker',
    text: ['UN Youth Delegate presenting ', { b: 'EmpowerAIM' }, ' at 5+ global forums, including the UN STI Forum, Climate Week NYC, and the UNESCO Forum on Education × AI.'],
  },
  {
    id: 'athlete',
    label: 'Athlete',
    text: ['Varsity swim captain with ', { b: 'OFSAA' }, ' and ', { b: 'CISAA' }, ' medals, a National Lifeguard, and a certified swim/lifesaving instructor.'],
  },
]

export const TRAJECTORY = [
  {
    pos: 0,
    period: '2018–2022',
    title: 'Toronto',
    text: ['Early education at Toronto Montessori and Bayview Glen; founding member of ', { b: 'KidsToKids' }, ' in 2022, building STEM programs across Canada, the UK, and China.'],
  },
  {
    pos: 25,
    period: '2024',
    title: 'Robotics & Research',
    text: ['SHAD Canada fellowship and early AI research, moving from FLL robotics into machine learning.'],
  },
  {
    pos: 50,
    period: '2024–2025',
    title: 'Global Stage',
    text: ['UN Youth Delegate presenting EmpowerAIM at the UN STI Forum, Asia-Pacific Forum on Sustainable Development, Climate Week NYC, and the UNESCO Forum on Education × AI.'],
  },
  {
    pos: 75,
    period: '2025',
    title: 'Technical Immersion',
    text: ['AWS Machine Learning internship and UPenn ESAP, building neural nets, NLP pipelines, and AI agents in teams of four.'],
  },
  {
    pos: 100,
    period: '2026 →',
    title: 'Berkeley & Bay Area',
    text: ['Enrolled at UC Berkeley, Class of 2030. Founding ', { b: 'Helicyn' }, ', a machine-learning startup based in San Francisco. Current build.'],
  },
]

export const EDUCATION = [
  {
    id: 'berkeley',
    calMark: true,
    title: 'UC Berkeley',
    text: 'Undergraduate · expected 2030',
    badge: "'30",
    badgeTooltip: 'Expected graduation year',
  },
  {
    id: 'ucc',
    logo: '/assets/images/ucc_logo.png',
    logoAlt: 'UCC',
    title: 'Upper Canada College',
    text: 'IB + OSSD Diploma · 2020–2026',
    badge: "Grad '26",
    badgeTooltip: 'Expected graduation year',
  },
  {
    id: 'jhu-cty',
    logo: '/assets/images/johns_hopkins_logo.png',
    logoAlt: 'JHU CTY',
    title: 'Johns Hopkins CTY',
    text: '3 accelerated math courses · Distinction',
  },
  {
    id: 'bayview-glen',
    logo: '/assets/images/bayview_glen_logo.png',
    logoAlt: 'Bayview Glen',
    title: 'Bayview Glen',
    text: '2018–2020',
  },
]
