export type CourseLevel = 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "12:45"
  durationMinutes: number;
  videoUrl?: string; // sample video URL or embed placeholder
  isFreePreview?: boolean;
  description?: string;
  notes?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface CourseReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  thumbnail: string;
  previewVideoUrl: string;
  instructor: Instructor;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  level: CourseLevel;
  language: string;
  lastUpdated: string;
  totalDuration: string;
  totalLessons: number;
  sections: CourseSection[];
  learningOutcomes: string[];
  requirements: string[];
  targetAudience: string[];
  reviews: CourseReview[];
}

export type LiveClassStatus = 'upcoming' | 'live' | 'completed';

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: Instructor;
  thumbnail: string;
  scheduledDate: string; // "2026-11-05"
  scheduledTime: string; // "18:00 EST"
  durationMinutes: number;
  status: LiveClassStatus;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  isFree?: boolean;
  meetingDemoId: string;
  agenda: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'instructor';
  avatar: string;
  headline?: string;
  bio?: string;
  joinedDate: string;
}

export interface EnrolledCourseProgress {
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  isCompleted: boolean;
  progressPercent: number;
}

export interface PlatformStat {
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  courseCount: number;
  accentColor: string;
}
