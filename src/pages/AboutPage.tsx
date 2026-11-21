import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const instructors = [
    {
      name: 'Pushkar Rai',
      title: 'Principal Technical Architect & Corporate Mentor',
      company: 'Lead Instructor — Cloud, Fullstack & Data Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Over 14 years architecting enterprise cloud platforms, data systems, and mentoring thousands of engineers across Python, R, AWS, Azure, Angular, React & SQL.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Intro */}
      <section className="bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-10 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'About AI Cube Tech' }]} className="mb-2" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Vision & Journey
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
            Democratizing world-class software engineering and digital design education.
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
            AI Cube Tech was founded on a simple conviction: modern careers require more than superficial tutorials. We connect aspiring tech talent with active industry leads through deep recorded curriculums and live interactive studios.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower developers, designers, and creators with hands-on, production-level expertise. We strip away theoretical fluff, focusing rigorously on software architectures that hold up in high-growth engineering organizations.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A borderless global learning ecosystem where any dedicated student can acquire the skills to architect complex applications, pass challenging technical reviews, and thrive in international engineering teams.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits of Learning Online on AI Cube Tech */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The AI Cube Tech Advantage
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Why leading engineering professionals choose our platform for continuous growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Learn at Your Own Pace',
              desc: 'Bite-sized, modular lessons accessible 24/7 across all devices. Pause, rewind, and re-watch complex code walkthroughs.',
            },
            {
              title: 'Live Workshop Studios',
              desc: 'Bridge recorded theory with interactive live sessions where mentors debug real problems and answer questions directly.',
            },
            {
              title: 'Production Repositories',
              desc: 'Full GitHub repository access for every course project with clean git commit histories and test coverage.',
            },
            {
              title: 'Vetted Industry Mentors',
              desc: 'Every instructor is an active technical contributor or tech lead, ensuring you learn modern practices rather than outdated syntax.',
            },
            {
              title: 'Hands-on Production Mastery',
              desc: 'Deep modular coding curriculum and production-level architecture blueprints to showcase to prospective employers.',
            },
            {
              title: 'Global Community Support',
              desc: 'Connect with peers from over 90 countries in dedicated workshop discussion rooms and collaborative project critiques.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Lead Mentors
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Seasoned practitioners who teach through applied engineering rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs text-center space-y-3"
            >
              <img
                src={inst.avatar}
                alt={inst.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-brand-50"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">{inst.name}</h3>
                <p className="text-xs text-brand-600 font-semibold">{inst.title}</p>
                <p className="text-[11px] text-slate-400">{inst.company}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{inst.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Join Thousands of Active Students</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Kickstart your modern engineering or design journey today with our curated curriculum tracks.
          </p>
          <div className="pt-2">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Explore Course Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
