import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Globe,
  Calendar,
  CheckCircle,
  CheckCircle2,
  PlayCircle,
  Heart,
  Share2,
  ShieldCheck,
  Award,
  Users,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StarRating } from '../components/common/StarRating';
import { Badge } from '../components/common/Badge';
import { CurriculumAccordion } from '../components/courses/CurriculumAccordion';
import { VideoPlayerModal } from '../components/courses/VideoPlayerModal';
import { PurchaseModal } from '../components/courses/PurchaseModal';
import { courseService } from '../services/courseService';
import { useEnrollment } from '../context/EnrollmentContext';
import { formatCurrency } from '../utils/formatters';
import { Course, Lesson } from '../types';

export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const { isEnrolled, isInWishlist, toggleWishlist, enrollments } = useEnrollment();

  useEffect(() => {
    if (id) {
      setLoading(true);
      courseService.getCourseById(id).then((found) => {
        setCourse(found);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto" />
        <div className="h-64 bg-slate-200 rounded-2xl max-w-4xl mx-auto" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Course Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested course could not be located in our catalog.
        </p>
        <Link
          to="/courses"
          className="inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold"
        >
          Return to All Courses
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const inWishlist = isInWishlist(course.id);
  const userProgress = enrollments[course.id];

  // First previewable lesson
  const firstPreviewLesson =
    course.sections[0]?.lessons.find((l) => l.isFreePreview) ||
    course.sections[0]?.lessons[0];

  const handleStartLearning = () => {
    const resumeLessonId =
      userProgress?.lastAccessedLessonId ||
      course.sections[0]?.lessons[0]?.id ||
      '';
    navigate(`/learn/${course.id}?lesson=${resumeLessonId}`);
  };

  return (
    <div className="pb-24">
      {/* Top Hero Banner */}
      <section className="bg-slate-900 text-white pt-8 pb-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Courses', href: '/courses' },
              { label: course.category, href: `/courses?category=${encodeURIComponent(course.category)}` },
              { label: course.title },
            ]}
            className="mb-6 text-slate-400"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="sm" className="bg-brand-900/80 text-brand-300 border-brand-700">
                  {course.category}
                </Badge>
                {course.isBestseller && (
                  <Badge variant="warning" size="sm" className="font-bold">
                    Bestseller
                  </Badge>
                )}
                <span className="text-xs text-slate-400">
                  Level: <strong className="text-slate-200">{course.level}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.tagline}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-2">
                <StarRating
                  rating={course.rating}
                  reviewsCount={course.reviewsCount}
                  size="sm"
                  className="text-white"
                />
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{new Intl.NumberFormat().format(course.studentsCount)} students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Updated {course.lastUpdated}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/40"
                />
                <div>
                  <p className="text-xs text-slate-400">Your Instructor</p>
                  <p className="text-sm font-bold text-white hover:text-brand-300 transition-colors">
                    {course.instructor.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Enrollment Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 lg:-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details, Outcomes, Syllabus */}
          <div className="lg:col-span-8 space-y-10 pt-8 lg:pt-12">
            {/* What you'll learn card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <span>What you'll learn in this course</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Course Overview</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>

            {/* Course Curriculum Syllabus */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Course Curriculum</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.totalLessons} lectures • {course.totalDuration} total length
                  </p>
                </div>
              </div>

              <CurriculumAccordion
                sections={course.sections}
                courseId={course.id}
                isEnrolled={enrolled}
                completedLessonIds={userProgress?.completedLessonIds || []}
                onSelectPreviewLesson={(l) => setPreviewLesson(l)}
                onSelectLesson={() => handleStartLearning()}
              />
            </div>

            {/* Requirements & Target Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Prerequisites</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Target Audience</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {course.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Your Instructor : {course.instructor.name}</h3>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-100 shrink-0"
                />
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {course.instructor.name}
                  </h4>
                  <p className="text-xs text-brand-600 font-medium">
                    {course.instructor.title}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>★ {course.instructor.rating} Instructor Rating</span>
                    <span>•</span>
                    <span>{new Intl.NumberFormat().format(course.instructor.studentsCount)} Students</span>
                    <span>•</span>
                    <span>{course.instructor.coursesCount} Courses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Student Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={course.rating} reviewsCount={course.reviewsCount} />
                    <span className="text-xs text-slate-400">Course average rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {course.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rev.userName}</p>
                          <p className="text-[10px] text-slate-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Floating Purchase Card */}
          <div className="lg:col-span-4 sticky top-24 z-20">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Card Preview Video / Image */}
              <div className="relative aspect-video w-full bg-slate-900 group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />

                {firstPreviewLesson && (
                  <button
                    onClick={() => setPreviewLesson(firstPreviewLesson)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-brand-600/90 text-white flex items-center justify-center hover:scale-110 hover:bg-brand-500 transition-all shadow-xl backdrop-blur-xs"
                    title="Watch Lecture Preview"
                  >
                    <PlayCircle className="w-8 h-8 ml-0.5" />
                  </button>
                )}

                <div className="absolute bottom-2.5 inset-x-0 text-center">
                  <span className="text-[11px] font-semibold text-white/90 bg-slate-950/70 px-3 py-1 rounded-full backdrop-blur-xs">
                    Click to preview lecture
                  </span>
                </div>
              </div>

              {/* Price and Enrollment CTA Box */}
              <div className="p-6 space-y-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900">
                      {course.isFree ? 'Free' : formatCurrency(course.price)}
                    </span>
                    {course.originalPrice && (
                      <span className="ml-2 text-sm text-slate-400 line-through">
                        {formatCurrency(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && !course.isFree && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Save {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Primary Action Button */}
                {enrolled ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleStartLearning}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </button>
                    <p className="text-center text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Enrolled on this account
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsPurchaseModalOpen(true)}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all text-sm flex items-center justify-center gap-2 group"
                  >
                    <span>{course.isFree ? 'Enroll for Free' : 'Buy Now (Simulated)'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(course.id, course.title)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-rose-500' : ''}`} />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                {/* Perks Checklist */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{course.totalDuration} of on-demand high-res video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>{course.totalLessons} modular coding lectures & index topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Hands-on practice exercises & project codebases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>Lifetime access on desktop, tablet, and mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      <VideoPlayerModal
        isOpen={!!previewLesson}
        onClose={() => setPreviewLesson(null)}
        lesson={previewLesson}
        courseTitle={course.title}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        course={course}
        onSuccess={() => { }}
      />
    </div>
  );
};
