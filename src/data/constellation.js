/* Build graph: projects & ventures ↔ skills. */

export const CST_PROJECTS = [
  { id: 'helicyn', label: 'Helicyn', skills: ['ml', 'product', 'startup'] },
  { id: 'fish-id', label: 'AI Fish Identification', skills: ['python', 'cnn', 'ml'] },
  { id: 'social-analytics', label: 'AI Social Media Analytics', skills: ['llm', 'react', 'selenium'] },
  { id: 'swedule', label: 'Swedule', skills: ['js', 'product'] },
  { id: 'water-tester', label: 'Smart Water-Param Tester', skills: ['embedded', 'hardware'] },
  { id: 'empoweraim', label: 'EmpowerAIM', skills: ['startup', 'speaking', 'leadership', 'ml'] },
  { id: 'kidstokids', label: 'KidsToKids', skills: ['leadership'] },
]

export const CST_SKILLS = [
  { id: 'ml', label: 'Machine Learning', projects: ['helicyn', 'fish-id', 'empoweraim'] },
  { id: 'python', label: 'Python', projects: ['fish-id'] },
  { id: 'cnn', label: 'CNNs', projects: ['fish-id'] },
  { id: 'llm', label: 'LLMs', projects: ['social-analytics'] },
  { id: 'react', label: 'React', projects: ['social-analytics'] },
  { id: 'selenium', label: 'Selenium', projects: ['social-analytics'] },
  { id: 'js', label: 'JavaScript', projects: ['swedule'] },
  { id: 'embedded', label: 'Embedded C', projects: ['water-tester'] },
  { id: 'hardware', label: 'Hardware / IoT', projects: ['water-tester'] },
  { id: 'product', label: 'Product', projects: ['helicyn', 'swedule'] },
  { id: 'startup', label: 'Startup Leadership', projects: ['helicyn', 'empoweraim'] },
  { id: 'leadership', label: 'Leadership', projects: ['empoweraim', 'kidstokids'] },
  { id: 'speaking', label: 'Public Speaking', projects: ['empoweraim'] },
]
