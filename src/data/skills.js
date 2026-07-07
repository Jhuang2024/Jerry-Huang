/* Builder stack: skill chips grouped by category, each pointing at the
   evidence entries (projects / experience / sections) where it shows up. */

export const SKILL_CATEGORIES = [
  {
    title: 'AI / ML',
    skills: [
      { label: 'Machine Learning', evidence: ['fish-id', 'build', 'aws', 'upenn-esap'] },
      { label: 'Python', evidence: ['fish-id'] },
      { label: 'CNNs', evidence: ['fish-id'] },
      { label: 'NLP', evidence: ['upenn-esap'] },
      { label: 'LLMs', evidence: ['social-analytics'] },
    ],
  },
  {
    title: 'Software',
    skills: [
      { label: 'JavaScript', evidence: ['swedule', 'social-analytics'] },
      { label: 'React', evidence: ['social-analytics'] },
      { label: 'Selenium', evidence: ['social-analytics'] },
    ],
  },
  {
    title: 'Embedded / Hardware',
    skills: [
      { label: 'Embedded C', evidence: ['water-tester'] },
      { label: 'IoT / Sensors', evidence: ['water-tester', 'shad'] },
    ],
  },
  {
    title: 'Product / Startup',
    skills: [
      { label: 'Product', evidence: ['build', 'swedule'] },
      { label: 'Startup Leadership', evidence: ['build', 'empoweraim'] },
    ],
  },
  {
    title: 'Leadership / Speaking',
    skills: [
      { label: 'Public Speaking', evidence: ['stage', 'empoweraim'] },
      { label: 'Leadership', evidence: ['kidstokids', 'ucc', 'empoweraim'] },
    ],
  },
]

export const LANGUAGES = [
  { name: 'Chinese (Mandarin)', level: 'Native', width: 100 },
  { name: 'English', level: 'Native', width: 100 },
  { name: 'French', level: 'Professional', width: 70 },
  { name: 'Korean', level: 'Limited', width: 40 },
]
