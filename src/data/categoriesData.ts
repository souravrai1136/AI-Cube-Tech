import { Category } from '../types';

export const categoriesData: Category[] = [
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Master AWS, Azure, and GCP top 10 core cloud services with real-world infrastructure.',
    icon: 'Cloud',
    courseCount: 3,
    accentColor: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Build modern responsive applications with HTML, CSS, Bootstrap, Angular & Web APIs.',
    icon: 'Code2',
    courseCount: 3,
    accentColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'ai-data-science',
    name: 'AI & Data Science',
    slug: 'ai-data-science',
    description: 'Master AI/ML/DL, Python, R programming, Advanced Excel, and Power BI business dashboards.',
    icon: 'Sparkles',
    courseCount: 3,
    accentColor: 'from-purple-500 to-pink-600',
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    slug: 'databases-and-storage',
    description: 'Enterprise data management with MySQL, SQL Service, Amazon RDS, MongoDB, CouchDB & IndexedDB.',
    icon: 'Database',
    courseCount: 2,
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'devops-tools',
    name: 'DevOps & Agile Tools',
    slug: 'devops-and-agile-tools',
    description: 'Streamline continuous integration, git branching, and agile delivery with Git, GitLab & Jira.',
    icon: 'GitBranch',
    courseCount: 1,
    accentColor: 'from-amber-500 to-orange-600',
  },
];
