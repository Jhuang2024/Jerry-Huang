/* Homepage-specific content: hero scene nodes, stats, logo strip, explore
   links. */

export const HERO_NODES = [
  { label: 'Helicyn', to: '/projects#build', style: { left: '50%', top: '11.67%' } },
  { label: 'UC Berkeley', to: '/about#trajectory', style: { left: '77.1%', top: '22.9%' } },
  { label: 'AI Research', to: '/projects#work', style: { left: '88.33%', top: '50%' } },
  { label: 'Global Forums', to: '/speaking', style: { left: '77.1%', top: '77.1%' } },
  { label: 'EmpowerAIM', to: '/experience#exp-empoweraim', style: { left: '50%', top: '88.33%' } },
  { label: 'KidsToKids', to: '/experience#exp-kidstokids', style: { left: '22.9%', top: '77.1%' } },
  { label: 'AWS', to: '/experience#exp-aws', style: { left: '11.67%', top: '50%' } },
  { label: 'Summer Programs', to: '/experience#exp-upenn', style: { left: '22.9%', top: '22.9%' } },
]

export const ROLES = ['Founder', 'Builder', 'Researcher', 'Speaker']

export const HERO_STATS = [
  { count: 550, suffix: '+', display: '550', label: 'Students empowered' },
  { count: 40, prefix: '$', suffix: 'K+', display: '$40', label: 'Raised for youth' },
  { count: 5, suffix: '+', display: '5', label: 'UN forums presented' },
  { count: 1000, suffix: '+', display: '1,000', label: 'Youth impacted' },
]

export const LOGO_MARQUEE = [
  { src: '/assets/images/helicyn_logo.png', alt: 'Helicyn' },
  { src: '/assets/images/un_logo.png', alt: 'United Nations' },
  { src: '/assets/images/aws_logo.png', alt: 'Amazon Web Services' },
  { src: '/assets/images/upenn_logo.png', alt: 'UPenn' },
  { src: '/assets/images/johns_hopkins_logo.png', alt: 'Johns Hopkins CTY' },
  { src: '/assets/images/shad_logo.png', alt: 'SHAD Canada' },
  { src: '/assets/images/ucc_logo.png', alt: 'Upper Canada College' },
  { src: '/assets/images/empoweraim_logo.png', alt: 'EmpowerAIM' },
  { src: '/assets/images/kids_to_kids_logo.png', alt: 'KidsToKids' },
  { src: '/assets/images/ib_logo.png', alt: 'IB' },
]

export const EXPLORE_LINKS = [
  {
    to: '/about',
    num: '01',
    title: 'About',
    text: 'The path from Toronto to Berkeley: trajectory, education, and a few different lenses.',
  },
  {
    to: '/experience',
    num: '02',
    title: 'Experience',
    text: 'Leading, building, presenting: the timeline, the proof, and the builder stack.',
  },
  {
    to: '/speaking',
    num: '03',
    title: 'Public Stage',
    text: 'UN forums, UNESCO, and Climate Week NYC: presenting EmpowerAIM as a UN Youth Delegate.',
  },
  {
    to: '/contact',
    num: '04',
    title: 'Contact',
    text: 'Building something technical, weird, or ambitious? Send it. Replies within 48 hours.',
  },
]
