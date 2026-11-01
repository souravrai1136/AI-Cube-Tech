import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { useEnrollment } from '../../context/EnrollmentContext';

interface CourseCardProps {
  course: Course;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className = '' }) => {
  const { isInWishlist, toggleWishlist, isEnrolled } = useEnrollment();
  const inWishlist = isInWishlist(course.id);
  const enrolled = isEnrolled(course.id);

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden ${className}`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="secondary" size="sm" className="bg-white/90 backdrop-blur-xs font-semibold text-slate-800">
            {course.category}
          </Badge>
          {course.isBestseller && (
            <Badge variant="warning" size="sm" className="font-bold">
              Bestseller
            </Badge>
          )}
          {course.isFree && (
            <Badge variant="success" size="sm" className="font-bold">
              Free Course
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(course.id, course.title);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            inWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-slate-900/40 text-white hover:bg-white hover:text-rose-500'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Level Tag Overlay */}
        <div className="absolute bottom-2.5 right-3 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900/70 text-slate-200 backdrop-blur-xs">
          {course.level}
        </div>
      </div>

      {/* Course Info Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating and Reviews */}
        <div className="mb-2 flex items-center justify-between">
          <StarRating rating={course.rating} reviewsCount={course.reviewsCount} size="sm" />
          {enrolled && (
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Enrolled
            </span>
          )}
        </div>

        {/* Course Title */}
        <Link
          to={`/courses/${course.id}`}
          className="text-base font-bold text-slate-900 group-hover:text-brand-600 line-clamp-2 transition-colors mb-2 leading-snug"
        >
          {course.title}
        </Link>

        {/* Course Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {course.tagline}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 mb-4 mt-auto pt-3 border-t border-slate-100">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
          />
          <span className="text-xs font-medium text-slate-600 truncate">
            {course.instructor.name}
          </span>
        </div>

        {/* Meta Bar: Lessons & Duration */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.totalDuration}</span>
          </div>
        </div>

        {/* Price & CTA Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900">
                {course.isFree ? 'Free' : formatCurrency(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(course.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
