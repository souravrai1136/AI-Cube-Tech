import React from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle2, Clock, BookOpen, Award } from 'lucide-react';
import { Course, EnrolledCourseProgress } from '../../types';

interface EnrolledCourseCardProps {
  course: Course;
  progress: EnrolledCourseProgress;
}

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course, progress }) => {
  const completedCount = progress.completedLessonIds.length;
  const isFinished = progress.isCompleted || progress.progressPercent === 100;

  // Find target lesson to resume
  const targetLessonId =
    progress.lastAccessedLessonId ||
    course.sections[0]?.lessons[0]?.id ||
    '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-stretch">
      {/* Course Thumbnail */}
      <div className="relative w-full md:w-56 aspect-video md:aspect-auto rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
            {course.category}
          </span>
        </div>
      </div>

      {/* Details & Progress */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-brand-600">
              Instructor: {course.instructor.name}
            </span>
            {isFinished ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <Award className="w-3.5 h-3.5" />
                Completed
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-700">
                {progress.progressPercent}% Complete
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors line-clamp-1 mb-2">
            {course.title}
          </h3>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFinished ? 'bg-emerald-500' : 'bg-brand-600'
              }`}
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
              <span>
                {completedCount} of {course.totalLessons} lessons completed
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.totalDuration}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/courses/${course.id}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Course Details & Syllabus
          </Link>

          <Link
            to={`/learn/${course.id}?lesson=${targetLessonId}`}
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
              isFinished
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isFinished ? 'Review Lectures' : 'Continue Learning'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
