import { Category } from '../types';

export const categoriesData: Category[] = [
  {
    id: 'programming-data-science',
    name: 'Python & Data Science',
    slug: 'python-and-data-science',
    description: 'Master Python programming and R statistical analysis from core foundations to advanced applications.',
    icon: 'Sparkles',
    courseCount: 2,
    accentColor: 'from-purple-500 to-pink-600',
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Master Amazon Web Services (AWS) and Microsoft Azure enterprise cloud architectures.',
    icon: 'Cloud',
    courseCount: 2,
    accentColor: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'web-development',
    name: 'Frontend Web Engineering',
    slug: 'frontend-web-engineering',
    description: 'Build enterprise single-page web applications with modern Angular and React JS.',
    icon: 'Code2',
    courseCount: 2,
    accentColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'databases',
    name: 'Databases & SQL',
    slug: 'databases-and-sql',
    description: 'Master enterprise SQL, relational schema design, query optimization, and transactions.',
    icon: 'Database',
    courseCount: 1,
    accentColor: 'from-emerald-500 to-teal-600',
  },
];
