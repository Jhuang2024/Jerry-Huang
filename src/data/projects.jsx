/* Selected work: card copy + case-study drawer detail + the little
   schematic SVG each card carries. Single source of truth for /projects
   and the featured teaser on the homepage. */

const FishVisual = () => (
  <svg viewBox="0 0 300 90">
    <g className="wc-cnn">
      <rect x="12" y="18" width="16" height="16" rx="2" /><rect x="34" y="18" width="16" height="16" rx="2" /><rect x="56" y="18" width="16" height="16" rx="2" />
      <rect x="12" y="40" width="16" height="16" rx="2" /><rect x="34" y="40" width="16" height="16" rx="2" className="hit" /><rect x="56" y="40" width="16" height="16" rx="2" />
      <rect x="12" y="62" width="16" height="16" rx="2" /><rect x="34" y="62" width="16" height="16" rx="2" /><rect x="56" y="62" width="16" height="16" rx="2" />
      <path d="M100 45 h60" /><path d="M170 45 l90 -18 v14 l30 4 l-30 4 v14 z" className="fish" />
    </g>
  </svg>
)

const PipelineVisual = () => (
  <svg viewBox="0 0 300 90">
    <g className="wc-pipeline">
      <rect x="10" y="30" width="60" height="30" rx="6" /><text x="40" y="49" textAnchor="middle">scrape</text>
      <path d="M74 45 h30" />
      <rect x="108" y="24" width="70" height="42" rx="6" className="mid" /><text x="143" y="49" textAnchor="middle">LLM</text>
      <path d="M182 45 h30" />
      <rect x="216" y="30" width="74" height="30" rx="6" /><text x="253" y="49" textAnchor="middle">insight</text>
    </g>
  </svg>
)

const CalendarVisual = () => (
  <svg viewBox="0 0 300 90">
    <g className="wc-cal">
      <rect x="20" y="12" width="260" height="66" rx="6" />
      <path d="M20 34 h260" />
      <path d="M85 12 v66" /><path d="M150 12 v66" /><path d="M215 12 v66" />
      <rect x="30" y="42" width="45" height="26" rx="3" className="lane" />
      <rect x="95" y="42" width="45" height="26" rx="3" />
      <rect x="160" y="42" width="45" height="26" rx="3" className="lane" />
      <rect x="225" y="42" width="45" height="26" rx="3" />
    </g>
  </svg>
)

const SensorVisual = () => (
  <svg viewBox="0 0 300 90">
    <g className="wc-sensor">
      <path d="M10 45 h40 l14 -28 l16 56 l14 -40 l16 24 l14 -12 h166" />
      <circle cx="64" cy="17" r="4" />
    </g>
  </svg>
)

export const PROJECTS = [
  {
    id: 'fish-id',
    num: '01',
    category: 'Published research',
    title: 'AI Fish Identification',
    when: '2024–2025',
    summary: 'CNN model that identifies freshwater species from a camera feed to quantify biodiversity and track invasive populations.',
    tags: ['CNNs', 'Python', 'Ecology'],
    Visual: FishVisual,
    detail: {
      cat: 'Published research · 2024–2025',
      problem: 'Manual species surveys are slow and require expert divers, making it hard to track invasive populations at scale.',
      build: 'Trained a convolutional neural network on freshwater species imagery and built a camera-feed inference pipeline to classify species in real time.',
      outcome: 'Published in the UNESCO Academy Journal.',
      tags: ['Python', 'CNNs', 'Computer Vision'],
      links: [
        {
          label: 'Read the paper',
          href: 'https://projects.learning-planet.org/projects/automated-fish-species-identification-using-co/summary',
        },
      ],
    },
  },
  {
    id: 'social-analytics',
    num: '02',
    category: 'UPenn ESAP',
    title: 'AI Social Media Analytics',
    when: '2025',
    summary: 'Full-stack platform pairing a Selenium TikTok/YouTube scraper with an LLM pipeline that generates channel signatures, content ideas & growth strategies.',
    tags: ['LLMs', 'React', 'Selenium'],
    Visual: PipelineVisual,
    detail: {
      cat: 'UPenn ESAP · 2025',
      problem: 'Creators lack a fast way to translate raw channel data into an actionable growth strategy.',
      build: 'A Selenium scraper for TikTok and YouTube feeding an LLM pipeline that generates channel signatures and content ideas, surfaced through a React frontend.',
      outcome: 'Built in a team of four as part of UPenn ESAP; validated with 20+ interviews and 200+ cold emails before designing the MVP.',
      tags: ['LLMs', 'React', 'Selenium'],
      links: [],
    },
  },
  {
    id: 'swedule',
    num: '03',
    category: 'Founder build',
    title: 'Swedule',
    when: '2024',
    summary: 'A calendar built for competitive high-school swimmers to balance academics with practices and meets.',
    tags: ['JavaScript', 'Product'],
    Visual: CalendarVisual,
    detail: {
      cat: 'Founder build · 2024',
      problem: 'Competitive swimmers juggle training load against academic deadlines with no tool built for their schedule shape.',
      build: 'A JavaScript scheduling app modeling practice and meet lanes alongside coursework.',
      outcome: 'Used to manage personal training and academic load through a competitive swim season.',
      tags: ['JavaScript', 'Product'],
      links: [],
    },
  },
  {
    id: 'water-tester',
    num: '04',
    category: 'MYP Personal Project',
    title: 'Smart Water-Param Tester',
    when: '2023–2024',
    summary: 'Automatic fish-tank monitor tracking ammonia, nitrites, nitrates, pH & temperature, alerting users through a mobile app when readings drift out of range.',
    tags: ['Embedded C', 'IoT'],
    Visual: SensorVisual,
    detail: {
      cat: 'MYP Personal Project · 2023–2024',
      problem: 'Manual aquarium water testing is inconsistent and reactive rather than preventive.',
      build: 'Embedded C firmware reading a sensor array for ammonia, nitrites, nitrates, pH & temperature, alerting users through a mobile app when readings drift out of range.',
      outcome: 'Completed as an IB MYP Personal Project.',
      tags: ['Embedded C', 'IoT'],
      links: [],
    },
  },
]
