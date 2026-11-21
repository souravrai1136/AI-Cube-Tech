import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  PlayCircle,
  Radio,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Sparkles,
  Zap,
  Globe2,
  Shield,
  Star,
  ChevronRight,
} from 'lucide-react';
import { CourseCard } from '../components/courses/CourseCard';
import { LiveClassCard } from '../components/live-classes/LiveClassCard';
import { LiveClassRoomModal } from '../components/live-classes/LiveClassRoomModal';
import { courseService } from '../services/courseService';
import { liveClassService } from '../services/liveClassService';
import { categoriesData } from '../data/categoriesData';
import { statsData } from '../data/statsData';
import { testimonialsData } from '../data/testimonialsData';
import { Course, LiveClass } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<LiveClass[]>([]);
  const [activeLiveModal, setActiveLiveModal] = useState<LiveClass | null>(null);

  useEffect(() => {
    courseService.getFeaturedCourses().then(setFeaturedCourses);
    liveClassService.getLiveClasses().then((classes) => {
      setUpcomingClasses(classes.slice(0, 3));
    });
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle Decorative Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Announcement Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Next-Generation Career Platform for High-Demand Tech Skills</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Learn New Skills.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">
                  Build Your Future.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Elevate your career with industry-proven video masterclasses and live mentor-led interactive workshops. Learn modern full-stack web development, React architecture, Figma UI/UX, and Python automation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/live-classes"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 group"
                >
                  <Radio className="w-4 h-4 text-rose-500 group-hover:animate-pulse" />
                  <span>Join Live Classes</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Curated by Tech Leads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Interactive Live Studio</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Visual Image Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                    alt="Students collaborating online"
                    className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Floating Live Badge inside graphic */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2.5 rounded-2xl flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                        Next Live Workshop
                      </p>
                      <p className="text-xs text-rose-300 font-medium">React Micro-Frontends</p>
                    </div>
                  </div>

                  {/* Floating Bottom Card */}
                  <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                        <PlayCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">42+ High-Impact Modules</p>
                        <p className="text-[11px] text-slate-500">Hands-on GitHub Repos Included</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      4.9 ★ Rating
                    </span>
                  </div>
                </div>

                {/* Floating Mentor Pill */}
                <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Instructor Pushkar Rai"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Pushkar Rai</p>
                    <p className="text-[10px] text-slate-500">Lead Technical Architect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Sample Data) - Commented out as requested
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            {statsData.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-white to-purple-200">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* 3. FEATURED RECORDED COURSES SECTION (Top Rated Masterclasses) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              Top Rated Masterclasses
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Video Courses
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>See entire library</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. COURSE CATEGORIES SECTION (Structured Tracks) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              Structured Tracks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>View all courses</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/courses?category=${encodeURIComponent(cat.name)}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.accentColor} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100">
                <span>{cat.courseCount} Courses</span>
                <span className="text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Browse track <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING LIVE WORKSHOPS SECTION */}
      <section className="bg-slate-900 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-500/30">
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                Interactive Mentorship
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Upcoming Live Masterclasses
              </h2>
            </div>
            <Link
              to="/live-classes"
              className="text-sm font-semibold text-brand-300 hover:text-white flex items-center gap-1 group"
            >
              <span>Explore full schedule</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingClasses.map((liveClass) => (
              <LiveClassCard
                key={liveClass.id}
                liveClass={liveClass}
                onJoinClick={(cls) => setActiveLiveModal(cls)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE AI CUBE TECH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            Engineered for Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Students Excel on AI Cube Tech
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            We reject shallow video overviews. Every curriculum is built around deep architectural mastery and real-world project portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Industry-Vetted Curriculums</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Courses are designed by active Tech Leads and Principal Architects at tier-one technology companies. Learn what teams actually look for during senior code reviews.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Live Code-Along Studios</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bridge recorded theory with interactive live sessions. Ask questions directly in real time, see edge-case debugging live, and get portfolio feedback.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-7 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Verified Proof of Mastery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn comprehensive course completion credentials and shareable credentials that showcase your applied projects directly to potential employers.
            </p>
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            Real Student Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by Developers & Designers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            (Sample student reviews demonstrating platform success stories)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.role} • <span className="font-semibold text-brand-600">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-14 text-white text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Advance Your Tech Career?
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed">
              Start learning immediately with our free introductory courses or unlock the full library with simulated enrollment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/courses"
              className="px-6 py-3.5 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-sm shadow-md transition-all text-center"
            >
              Browse All Courses
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3.5 rounded-xl bg-brand-800/80 hover:bg-brand-800 text-white font-bold text-sm border border-white/20 transition-all text-center"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Live Classroom Interactive Demo Modal */}
      <LiveClassRoomModal
        isOpen={!!activeLiveModal}
        onClose={() => setActiveLiveModal(null)}
        liveClass={activeLiveModal}
      />
    </div>
  );
};
