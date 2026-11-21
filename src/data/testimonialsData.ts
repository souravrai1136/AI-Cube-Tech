export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  courseTaken: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    name: 'Aarav Sharma',
    role: 'Frontend Engineer',
    company: 'Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Pushkar Rai sir provided the exact architectural clarity I needed. The hands-on React JS and Angular index topics made transition to production micro-frontends seamless.',
    rating: 5,
    courseTaken: 'React JS Masterclass: Modern Hooks & Architecture',
  },
  {
    id: 't-2',
    name: 'Priya Verma',
    role: 'Cloud Operations Lead',
    company: 'Enterprise Cloud Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'The 45-hour AWS Cloud Architect course was a game changer. Every one of the 10 core services was explained with realistic dual-tier production VPC configurations.',
    rating: 5,
    courseTaken: 'AWS Cloud Architect: Top 10 Core Services',
  },
  {
    id: 't-3',
    name: 'Rohan Gupta',
    role: 'Data Analyst & Backend Specialist',
    company: 'Fintech Analytics',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Within four weeks of completing the Python and SQL curriculums, I completely optimized our analytical query pipelines and built automated REST APIs.',
    rating: 5,
    courseTaken: 'Python Programming Masterclass',
  },
];
