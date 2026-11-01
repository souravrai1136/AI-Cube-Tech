import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseFilters } from '../components/courses/CourseFilters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { courseService } from '../services/courseService';
import { Course } from '../types';

export const CoursesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'All';
  const priceFilter = (searchParams.get('price') as 'all' | 'free' | 'paid') || 'all';
  const sortBy =
    (searchParams.get('sort') as 'popularity' | 'rating' | 'price-asc' | 'price-desc') ||
    'popularity';

  useEffect(() => {
    setLoading(true);
    courseService
      .getCourses({
        searchQuery,
        category: selectedCategory,
        priceFilter,
        sortBy,
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, [searchQuery, selectedCategory, priceFilter, sortBy]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === 'all' || value === 'popularity') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Header */}
      <div>
        <Breadcrumbs items={[{ label: 'Courses Directory' }]} className="mb-4" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Online Courses
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Curated, production-grade video courses taught by top engineering leads and designers.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => updateParam('q', q)}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => updateParam('category', cat)}
        priceFilter={priceFilter}
        onPriceFilterChange={(price) => updateParam('price', price)}
        sortBy={sortBy}
        onSortByChange={(sort) => updateParam('sort', sort)}
        totalCoursesCount={courses.length}
        onResetFilters={handleResetFilters}
      />

      {/* Course Cards Grid or Loading / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 h-96 p-4 space-y-4">
              <div className="w-full h-44 bg-slate-200 rounded-xl" />
              <div className="w-3/4 h-5 bg-slate-200 rounded" />
              <div className="w-1/2 h-4 bg-slate-200 rounded" />
              <div className="w-full h-10 bg-slate-100 rounded-xl mt-6" />
            </div>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No courses found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              We couldn't find any courses matching your specific search or filter criteria.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
