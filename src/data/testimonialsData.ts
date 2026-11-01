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
    name: 'Sarah Kim',
    role: 'Frontend Engineer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'AI Cube Tech gave me the exact architectural clarity I needed to pass my senior engineering interviews. The hands-on project structure is unmatched by any other platform.',
    rating: 5,
    courseTaken: 'Modern Full-Stack Web Development',
  },
  {
    id: 't-2',
    name: 'Michael Chen',
    role: 'Product Designer',
    company: 'Figma Community',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'The live interactive workshops are phenomenal! You get to watch seasoned instructors problem-solve in real time, ask live questions, and get actionable design critiques.',
    rating: 5,
    courseTaken: 'UI/UX Design Masterclass',
  },
  {
    id: 't-3',
    name: 'Amara Okafor',
    role: 'Data Analyst & Automation Lead',
    company: 'Fintech Hub',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Within three weeks of starting the Python Automation track, I automated our entire team reporting workflow, saving roughly 14 hours every single week.',
    rating: 5,
    courseTaken: 'Python for Data Automation',
  },
];
