import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FileText,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { CurriculumAccordion } from '../components/courses/CurriculumAccordion';
import { courseService } from '../services/courseService';
import { useEnrollment } from '../context/EnrollmentContext';
import { Course, Lesson } from '../types';

export const VideoLearningPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { enrollments, toggleLessonCompleted, updateLastAccessedLesson, isEnrolled } =
    useEnrollment();

  const lessonParam = searchParams.get('lesson');

  useEffect(() => {
    if (id) {
      courseService.getCourseById(id).then((found) => {
        if (found) {
          setCourse(found);
          // Find target lesson
          const allLessons = found.sections.flatMap((s) => s.lessons);
          const initialLesson =
            allLessons.find((l) => l.id === lessonParam) || allLessons[0];
          setCurrentLesson(initialLesson);

          if (initialLesson) {
            updateLastAccessedLesson(found.id, initialLesson.id);
          }
        }
      });
    }
  }, [id, lessonParam, updateLastAccessedLesson]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading learning environment...</p>
        </div>
      </div>
    );
  }

  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const userProgress = enrollments[course.id];
  const isLessonCompleted =
    userProgress?.completedLessonIds.includes(currentLesson.id) || false;

  const handleLessonChange = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setSearchParams({ lesson: lesson.id });
    updateLastAccessedLesson(course.id, lesson.id);
    setIsPlaying(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleToggleComplete = () => {
    toggleLessonCompleted(course.id, currentLesson.id, course.totalLessons);
  };

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setVideoProgress((current / total) * 100);
      }
    }
  };

  const sampleVideoSrc =
    currentLesson.videoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Learning Topbar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
            title="Back to Course Details"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
            {course.title}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {userProgress ? userProgress.progressPercent : 0}% Complete
            </span>
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full transition-all duration-300"
                style={{ width: `${userProgress ? userProgress.progressPercent : 0}%` }}
              />
            </div>
          </div>

          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Toggle curriculum sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Body: Video Area + Collapsible Curriculum Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left: Video Player and Lecture Information */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* The Video Area */}
            <div className="relative aspect-video max-h-[65vh] w-full bg-black flex items-center justify-center group">
              <video
                ref={videoRef}
                src={sampleVideoSrc}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  setIsPlaying(false);
                  if (!isLessonCompleted) {
                    handleToggleComplete();
                  }
                }}
                playsInline
              />

              {/* Center Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlayToggle}
                  className="absolute w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center hover:scale-110 hover:bg-brand-500 transition-all shadow-2xl"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              {/* Controls Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="bg-brand-500 h-full transition-all"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={handlePlayToggle} className="hover:text-brand-400">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                          setIsMuted(!isMuted);
                        }
                      }}
                      className="hover:text-brand-400"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span>{currentLesson.duration}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="hover:text-brand-400"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lecture Details and Navigation Bar */}
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              {/* Prev / Next & Mark Complete Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => previousLesson && handleLessonChange(previousLesson)}
                    disabled={!previousLesson}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => nextLesson && handleLessonChange(nextLesson)}
                    disabled={!nextLesson}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleToggleComplete}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                    isLessonCompleted
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                      : 'bg-brand-600 hover:bg-brand-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isLessonCompleted ? 'Marked as Completed' : 'Mark as Complete'}</span>
                </button>
              </div>

              {/* Lesson Title & Notes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800">
                    Lecture {currentIndex + 1} of {allLessons.length}
                  </span>
                  <span className="text-xs text-slate-400">Duration: {currentLesson.duration}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {currentLesson.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLesson.description ||
                    'In this lesson we deep-dive into modular component architecture, hands-on implementation steps, and production testing.'}
                </p>
              </div>

              {/* Instructor Bio & Resources Tab */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{course.instructor.name}</h4>
                    <p className="text-[11px] text-slate-400">{course.instructor.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-400 hover:text-brand-300 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  <span>Lecture Resources (GitHub Repo)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Expandable Curriculum Sidebar */}
        {sidebarOpen && (
          <aside className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Course Content
              </h3>
              <span className="text-xs text-slate-500">
                {userProgress?.completedLessonIds.length || 0} / {course.totalLessons} Completed
              </span>
            </div>

            <div className="p-3">
              <CurriculumAccordion
                sections={course.sections}
                courseId={course.id}
                isEnrolled={true}
                completedLessonIds={userProgress?.completedLessonIds || []}
                currentLessonId={currentLesson.id}
                onSelectLesson={(lesson) => handleLessonChange(lesson)}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
