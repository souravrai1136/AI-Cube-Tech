import { EnrolledCourseProgress } from '../types';

const ENROLLMENTS_KEY = 'aicubetech_enrollments';
const WISHLIST_KEY = 'aicubetech_wishlist';
const REGISTERED_CLASSES_KEY = 'aicubetech_registered_live_classes';

// Seed default enrolled courses for the student demo account
const INITIAL_ENROLLMENTS: Record<string, EnrolledCourseProgress> = {
  'course-1': {
    courseId: 'course-1',
    enrolledAt: '2026-10-10',
    completedLessonIds: ['les-1-1-1', 'les-1-1-2'],
    lastAccessedLessonId: 'les-1-1-3',
    lastAccessedAt: '2026-10-28',
    isCompleted: false,
    progressPercent: 35,
  },
  'course-2': {
    courseId: 'course-2',
    enrolledAt: '2026-10-18',
    completedLessonIds: ['les-2-1-1'],
    lastAccessedLessonId: 'les-2-1-1',
    lastAccessedAt: '2026-10-27',
    isCompleted: false,
    progressPercent: 18,
  },
};

const INITIAL_WISHLIST = ['course-3', 'course-4'];
const INITIAL_REGISTERED_CLASSES = ['live-1', 'live-2'];

function getEnrollmentsStore(): Record<string, EnrolledCourseProgress> {
  try {
    const stored = localStorage.getItem(ENROLLMENTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return INITIAL_ENROLLMENTS;
}

function saveEnrollmentsStore(data: Record<string, EnrolledCourseProgress>): void {
  try {
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(data));
  } catch {}
}

export const enrollmentService = {
  /**
   * Get all enrolled courses for the student
   */
  getEnrollments(): Record<string, EnrolledCourseProgress> {
    return getEnrollmentsStore();
  },

  /**
   * Check if a course is enrolled
   */
  isEnrolled(courseId: string): boolean {
    const enrollments = getEnrollmentsStore();
    return !!enrollments[courseId];
  },

  /**
   * Enroll the user in a course
   */
  enrollInCourse(courseId: string, initialLessonId?: string): EnrolledCourseProgress {
    const enrollments = getEnrollmentsStore();
    if (enrollments[courseId]) return enrollments[courseId];

    const progress: EnrolledCourseProgress = {
      courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      completedLessonIds: [],
      lastAccessedLessonId: initialLessonId,
      lastAccessedAt: new Date().toISOString().split('T')[0],
      isCompleted: false,
      progressPercent: 0,
    };

    enrollments[courseId] = progress;
    saveEnrollmentsStore(enrollments);
    return progress;
  },

  /**
   * Mark a lesson as completed / toggle completed status
   */
  toggleLessonCompleted(courseId: string, lessonId: string, totalLessonsInCourse: number): EnrolledCourseProgress {
    const enrollments = getEnrollmentsStore();
    let current = enrollments[courseId];

    if (!current) {
      current = this.enrollInCourse(courseId, lessonId);
    }

    const completed = new Set(current.completedLessonIds);
    if (completed.has(lessonId)) {
      completed.delete(lessonId);
    } else {
      completed.add(lessonId);
    }

    const completedList = Array.from(completed);
    const progressPercent = totalLessonsInCourse > 0
      ? Math.min(100, Math.round((completedList.length / totalLessonsInCourse) * 100))
      : 0;

    const updated: EnrolledCourseProgress = {
      ...current,
      completedLessonIds: completedList,
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString().split('T')[0],
      progressPercent,
      isCompleted: progressPercent === 100,
    };

    enrollments[courseId] = updated;
    saveEnrollmentsStore(enrollments);
    return updated;
  },

  /**
   * Record last accessed lesson
   */
  updateLastAccessedLesson(courseId: string, lessonId: string): void {
    const enrollments = getEnrollmentsStore();
    if (enrollments[courseId]) {
      enrollments[courseId].lastAccessedLessonId = lessonId;
      enrollments[courseId].lastAccessedAt = new Date().toISOString().split('T')[0];
      saveEnrollmentsStore(enrollments);
    }
  },

  /**
   * Wishlist management
   */
  getWishlist(): string[] {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_WISHLIST;
  },

  toggleWishlist(courseId: string): string[] {
    const current = this.getWishlist();
    let next: string[];
    if (current.includes(courseId)) {
      next = current.filter((id) => id !== courseId);
    } else {
      next = [...current, courseId];
    }
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    } catch {}
    return next;
  },

  isInWishlist(courseId: string): boolean {
    return this.getWishlist().includes(courseId);
  },

  /**
   * Live class registrations
   */
  getRegisteredClasses(): string[] {
    try {
      const stored = localStorage.getItem(REGISTERED_CLASSES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_REGISTERED_CLASSES;
  },

  toggleLiveClassRegistration(classId: string): string[] {
    const current = this.getRegisteredClasses();
    let next: string[];
    if (current.includes(classId)) {
      next = current.filter((id) => id !== classId);
    } else {
      next = [...current, classId];
    }
    try {
      localStorage.setItem(REGISTERED_CLASSES_KEY, JSON.stringify(next));
    } catch {}
    return next;
  },

  isRegisteredForClass(classId: string): boolean {
    return this.getRegisteredClasses().includes(classId);
  },
};
