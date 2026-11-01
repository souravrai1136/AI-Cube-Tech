import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { EnrolledCourseProgress } from '../types';
import { enrollmentService } from '../services/enrollmentService';
import { useToast } from './ToastContext';

interface EnrollmentContextType {
  enrollments: Record<string, EnrolledCourseProgress>;
  wishlist: string[];
  registeredClasses: string[];
  isEnrolled: (courseId: string) => boolean;
  enrollInCourse: (courseId: string, initialLessonId?: string) => EnrolledCourseProgress;
  toggleLessonCompleted: (courseId: string, lessonId: string, totalLessonsInCourse: number) => void;
  updateLastAccessedLesson: (courseId: string, lessonId: string) => void;
  toggleWishlist: (courseId: string, courseTitle?: string) => void;
  isInWishlist: (courseId: string) => boolean;
  toggleLiveClassRegistration: (classId: string, classTitle?: string) => void;
  isRegisteredForClass: (classId: string) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enrollments, setEnrollments] = useState<Record<string, EnrolledCourseProgress>>(() =>
    enrollmentService.getEnrollments()
  );
  const [wishlist, setWishlist] = useState<string[]>(() => enrollmentService.getWishlist());
  const [registeredClasses, setRegisteredClasses] = useState<string[]>(() =>
    enrollmentService.getRegisteredClasses()
  );
  const { addToast } = useToast();

  const isEnrolled = useCallback(
    (courseId: string) => {
      return !!enrollments[courseId];
    },
    [enrollments]
  );

  const enrollInCourse = useCallback(
    (courseId: string, initialLessonId?: string) => {
      const progress = enrollmentService.enrollInCourse(courseId, initialLessonId);
      setEnrollments({ ...enrollmentService.getEnrollments() });
      addToast('success', 'Enrolled Successfully!', 'Course added to your learning dashboard.');
      return progress;
    },
    [addToast]
  );

  const toggleLessonCompleted = useCallback(
    (courseId: string, lessonId: string, totalLessonsInCourse: number) => {
      const updated = enrollmentService.toggleLessonCompleted(courseId, lessonId, totalLessonsInCourse);
      setEnrollments({ ...enrollmentService.getEnrollments() });

      const isNowCompleted = updated.completedLessonIds.includes(lessonId);
      if (isNowCompleted) {
        addToast(
          'success',
          'Lesson Completed!',
          `Course progress is now ${updated.progressPercent}%. Keep going!`
        );
      }
    },
    [addToast]
  );

  const updateLastAccessedLesson = useCallback((courseId: string, lessonId: string) => {
    enrollmentService.updateLastAccessedLesson(courseId, lessonId);
    setEnrollments({ ...enrollmentService.getEnrollments() });
  }, []);

  const toggleWishlist = useCallback(
    (courseId: string, courseTitle?: string) => {
      const isAlreadyIn = wishlist.includes(courseId);
      const updated = enrollmentService.toggleWishlist(courseId);
      setWishlist(updated);

      if (isAlreadyIn) {
        addToast('info', 'Removed from Wishlist', courseTitle ? `Removed "${courseTitle}"` : undefined);
      } else {
        addToast('success', 'Saved to Wishlist!', courseTitle ? `Saved "${courseTitle}"` : undefined);
      }
    },
    [wishlist, addToast]
  );

  const isInWishlist = useCallback(
    (courseId: string) => {
      return wishlist.includes(courseId);
    },
    [wishlist]
  );

  const toggleLiveClassRegistration = useCallback(
    (classId: string, classTitle?: string) => {
      const isAlready = registeredClasses.includes(classId);
      const updated = enrollmentService.toggleLiveClassRegistration(classId);
      setRegisteredClasses(updated);

      if (isAlready) {
        addToast('info', 'Registration Cancelled', classTitle ? `Withdrawn from ${classTitle}` : undefined);
      } else {
        addToast('success', 'Registered for Live Class!', classTitle ? `You are registered for ${classTitle}` : undefined);
      }
    },
    [registeredClasses, addToast]
  );

  const isRegisteredForClass = useCallback(
    (classId: string) => {
      return registeredClasses.includes(classId);
    },
    [registeredClasses]
  );

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        wishlist,
        registeredClasses,
        isEnrolled,
        enrollInCourse,
        toggleLessonCompleted,
        updateLastAccessedLesson,
        toggleWishlist,
        isInWishlist,
        toggleLiveClassRegistration,
        isRegisteredForClass,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export function useEnrollment(): EnrollmentContextType {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}
