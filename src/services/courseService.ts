import { Course } from '../types';
import { coursesData } from '../data/coursesData';

const COURSES_STORAGE_KEY = 'aicubetech_courses_data_v6';

export interface CourseFilterOptions {
  searchQuery?: string;
  category?: string;
  priceFilter?: 'all' | 'free' | 'paid';
  level?: string;
  sortBy?: 'popularity' | 'rating' | 'price-asc' | 'price-desc' | 'newest';
}

function getStoredCourses(): Course[] {
  try {
    // Clean up older keys if present
    localStorage.removeItem('learnora_courses_data');
    localStorage.removeItem('learnora_courses_data_inr');
    localStorage.removeItem('aicubetech_courses_data_v2');
    localStorage.removeItem('aicubetech_courses_data_v3');
    localStorage.removeItem('aicubetech_courses_data_v4');
    localStorage.removeItem('aicubetech_courses_data_v5');

    const stored = localStorage.getItem(COURSES_STORAGE_KEY);
    if (stored) {
      const parsed: Course[] = JSON.parse(stored);
      if (
        parsed.length !== coursesData.length ||
        parsed.some(
          (c) =>
            c.price !== 5000 ||
            c.instructor.name !== 'Pushkar Rai' ||
            c.instructor.avatar !== '/assets/pushkar-rai-vector.svg'
        )
      ) {
        persistCourses(coursesData);
        return coursesData;
      }
      return parsed;
    }
  } catch {
    // Fallback to initial courses
  }
  return coursesData;
}

function persistCourses(courses: Course[]): void {
  try {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  } catch {
    // ignore storage quota issues
  }
}

export const courseService = {
  /**
   * Get all courses with optional filters and sorting
   */
  async getCourses(filters?: CourseFilterOptions): Promise<Course[]> {
    let courses = getStoredCourses();

    if (!filters) return courses;

    const { searchQuery, category, priceFilter, level, sortBy } = filters;

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All' && category !== 'all') {
      courses = courses.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }

    if (priceFilter === 'free') {
      courses = courses.filter((c) => c.price === 0 || c.isFree);
    } else if (priceFilter === 'paid') {
      courses = courses.filter((c) => c.price > 0 && !c.isFree);
    }

    if (level && level !== 'All' && level !== 'All Levels') {
      courses = courses.filter((c) => c.level === level);
    }

    if (sortBy) {
      courses = [...courses].sort((a, b) => {
        switch (sortBy) {
          case 'popularity':
            return b.studentsCount - a.studentsCount;
          case 'rating':
            return b.rating - a.rating;
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return b.id.localeCompare(a.id);
          default:
            return 0;
        }
      });
    }

    return courses;
  },

  /**
   * Get single course by ID
   */
  async getCourseById(id: string): Promise<Course | null> {
    const courses = getStoredCourses();
    return courses.find((c) => c.id === id || c.slug === id) || null;
  },

  /**
   * Get featured courses for homepage showcase
   */
  async getFeaturedCourses(): Promise<Course[]> {
    const courses = getStoredCourses();
    return courses.filter((c) => c.isFeatured).slice(0, 4);
  },

  /**
   * Admin: Add new course (persists to demo localStorage store)
   */
  async createCourse(newCourse: Omit<Course, 'id' | 'slug' | 'reviews'>): Promise<Course> {
    const courses = getStoredCourses();
    const created: Course = {
      ...newCourse,
      id: `course-${Date.now()}`,
      slug: newCourse.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      reviews: [],
    };
    const updated = [created, ...courses];
    persistCourses(updated);
    return created;
  },

  /**
   * Admin: Update existing course
   */
  async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    const courses = getStoredCourses();
    const idx = courses.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    courses[idx] = { ...courses[idx], ...updates };
    persistCourses(courses);
    return courses[idx];
  },

  /**
   * Admin: Delete course
   */
  async deleteCourse(id: string): Promise<boolean> {
    const courses = getStoredCourses();
    const filtered = courses.filter((c) => c.id !== id);
    if (filtered.length === courses.length) return false;
    persistCourses(filtered);
    return true;
  },

  /**
   * Reset courses back to default demo state
   */
  resetCourses(): void {
    localStorage.removeItem(COURSES_STORAGE_KEY);
  },
};
