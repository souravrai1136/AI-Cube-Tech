import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';

interface CourseFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceFilter: 'all' | 'free' | 'paid';
  onPriceFilterChange: (price: 'all' | 'free' | 'paid') => void;
  sortBy: 'popularity' | 'rating' | 'price-asc' | 'price-desc';
  onSortByChange: (sort: 'popularity' | 'rating' | 'price-asc' | 'price-desc') => void;
  totalCoursesCount: number;
  onResetFilters: () => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
  sortBy,
  onSortByChange,
  totalCoursesCount,
  onResetFilters,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    priceFilter !== 'all' ||
    sortBy !== 'popularity';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-8 space-y-5">
      {/* Search and Sort row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search courses by title, keywords, instructor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(
                e.target.value as 'popularity' | 'rating' | 'price-asc' | 'price-desc'
              )
            }
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Price Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.name
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Price filter segmented control */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => onPriceFilterChange('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                priceFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => onPriceFilterChange('free')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                priceFilter === 'free'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => onPriceFilterChange('paid')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                priceFilter === 'paid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paid
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count bar */}
      <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
        <span>
          Showing <strong className="text-slate-800">{totalCoursesCount}</strong> courses
        </span>
      </div>
    </div>
  );
};
