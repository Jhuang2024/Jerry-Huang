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
    text: ['UN Youth Delegate presenting ', { b: 'EmpowerAIM' }, ' at 5+ global forums, including the UN Science, Technology and Innovation Forum, Climate Week NYC, and the UNESCO Forum on Education × AI.'],
    photos: [
      {
        src: '/assets/images/jerry-huang-un-sti-forum.webp',
        alt: 'Jerry Huang at the UN Science, Technology and Innovation Forum in New York',
        caption: 'UN Science, Technology and Innovation Forum',
      },
      {
        src: '/assets/images/jerry-huang-un-panel.webp',
        alt: 'Jerry Huang seated at a panel in a UN Headquarters committee room',
        caption: 'Committee room, UN HQ',
        pos: '0% 40%',
      },
      {
        src: '/assets/images/jerry-huang-un-delegation.webp',
        alt: 'Jerry Huang with fellow youth delegates at a UN conference table',
        caption: 'With the youth delegation',
        pos: '75% 30%',
      },
    ],
  },
  {
    id: 'athlete',
    label: 'Athlete',
    text: ['Varsity swim captain with ', { b: 'OFSAA' }, ' and ', { b: 'CISAA' }, ' medals, a National Lifeguard, and a certified swim/lifesaving instructor.'],
    photos: [
      {
        src: '/assets/images/jerry-huang-swim-post-race.webp',
        alt: 'Jerry Huang on the pool deck after a race',
        caption: 'Post-race on deck',
      },
      {
        src: '/assets/images/jerry-huang-swim-cisaa-podium.webp',
        alt: 'Jerry Huang and teammates holding championship plaques and a trophy at the pool',
        caption: 'Championship hardware',
      },
    ],
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
    text: ['UN Youth Delegate presenting EmpowerAIM at the UN Science, Technology and Innovation Forum, Asia-Pacific Forum on Sustainable Development, Climate Week NYC, and the UNESCO Forum on Education × AI.'],
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
