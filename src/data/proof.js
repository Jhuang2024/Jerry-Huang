/* Proof matrix: awards, scores, credentials. `ring` renders the circular
   progress stat (percentile), `metric` the amber headline figure. */

export const PROOF_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'academic', label: 'Academic' },
  { id: 'global', label: 'Global' },
  { id: 'athletics', label: 'Athletics' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'technical', label: 'Technical' },
]

export const PROOF = [
  {
    cat: 'global', catLabel: 'Global', date: 'Nov 2025',
    title: 'UN × Netflix Youth Global Creative Challenge',
    ring: { value: 99.4, label: ['Top', '0.5%'] },
    text: 'Top 13 of 2,280 applicants across 89 countries (top 0.5%). Interviewed at UN HQ, New York.',
  },
  {
    cat: 'academic', catLabel: 'Academic',
    title: 'SAT',
    ring: { value: 99, label: ['Top', '1%'] },
    metric: '1560 / 1600',
    text: 'Reading 760 · Math 800',
  },
  {
    cat: 'academic', catLabel: 'Academic',
    title: 'SSAT (Middle Level)',
    ring: { value: 96, label: ['Top', '4%'] },
    metric: '2090 / 2130',
  },
  {
    cat: 'athletics', catLabel: 'Athletics', date: '2024–25',
    title: 'OFSAA Varsity Swimming',
    text: 'Top 3 in Ontario, 200m Freestyle Relay; Top 16, 100m Freestyle.',
  },
  {
    cat: 'athletics', catLabel: 'Athletics', date: 'Feb 2024',
    title: 'CISAA Varsity Swimming',
    text: '1st in Toronto, 100m Freestyle; Top 3, 50m Freestyle.',
  },
  {
    cat: 'academic', catLabel: 'Mathematics', date: 'Mar 2025',
    title: 'Waterloo Fermat Contest',
    ring: { value: 99.7, label: ['Top', '0.3%'] },
    metric: 'Top 219 / 65,000',
    text: 'Group 4 Honour Roll',
  },
  {
    cat: 'academic', catLabel: 'Mathematics', date: 'Feb 2024',
    title: 'Waterloo Cayley Contest',
    ring: { value: 99.6, label: ['Top', '0.4%'] },
    metric: 'Top 266 / 65,000',
    text: 'Group 4 Honour Roll',
  },
  {
    cat: 'academic', catLabel: 'Mathematics', date: 'Mar 2023',
    title: 'Waterloo Fryer Contest',
    ring: { value: 99.6, label: ['Top', '0.4%'] },
    metric: 'Top 25 / 6,000',
    text: 'Group 2 Honour Roll',
  },
  {
    cat: 'academic', catLabel: 'Academic', date: 'Oct 2024',
    title: 'General Proficiency Award',
    text: '94%+ in every subject, Upper Canada College.',
  },
  {
    cat: 'academic', catLabel: 'Academic', date: 'Sep 2024',
    title: "Principal's List",
    ring: { value: 90, label: ['Top', '10%'] },
    text: 'Top 10% of the UCC Class of 2026.',
  },
  {
    cat: 'academic', catLabel: 'Academic', date: 'Jun 2021',
    title: 'Chadsey Prize for Literature',
    text: "Plus the Symons '47 Prize for Canadian Studies, UCC.",
  },
  {
    cat: 'credentials', catLabel: 'Credentials',
    title: 'National Lifeguard',
    text: '+ Swim/Lifesaving Instructor, First Aid.',
  },
  {
    cat: 'credentials', catLabel: 'Credentials',
    title: 'CSIA Level 1',
    text: "Canadian Ski Instructors' Alliance.",
  },
  {
    cat: 'credentials', catLabel: 'Credentials',
    title: 'RCM Piano',
    metric: 'Level 8',
    text: 'Theory 95/100.',
  },
  {
    cat: 'technical', catLabel: 'Technical', date: '2025',
    title: 'AWS ML Internship',
    metric: '3+ models',
    text: 'ML models & cloud workflows built during a machine-learning internship.',
  },
  {
    cat: 'technical', catLabel: 'Technical', date: '2024',
    title: 'SHAD National Innovation Program',
    metric: '2nd / 12',
    text: 'Smart-thermometer prototype, team of 6.',
  },
]
