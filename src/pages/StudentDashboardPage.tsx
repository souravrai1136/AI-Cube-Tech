import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Radio,
  Heart,
  Settings,
  Award,
  Clock,
  PlayCircle,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnrollment } from '../context/EnrollmentContext';
import { courseService } from '../services/courseService';
import { liveClassService } from '../services/liveClassService';
import { EnrolledCourseCard } from '../components/dashboard/EnrolledCourseCard';
import { StatsCard } from '../components/dashboard/StatsCard';
import { CourseCard } from '../components/courses/CourseCard';
import { LiveClassCard } from '../components/live-classes/LiveClassCard';
import { LiveClassRoomModal } from '../components/live-classes/LiveClassRoomModal';
import { Course, LiveClass } from '../types';

export const StudentDashboardPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { enrollments, wishlist, registeredClasses } = useEnrollment();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'courses';

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allLiveClasses, setAllLiveClasses] = useState<LiveClass[]>([]);
  const [activeLiveModal, setActiveLiveModal] = useState<LiveClass | null>(null);

  // Settings form local state
  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');

  useEffect(() => {
    courseService.getCourses().then(setAllCourses);
    liveClassService.getLiveClasses().then(setAllLiveClasses);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setHeadline(user.headline || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const enrolledCourseIds = Object.keys(enrollments);
  const enrolledCourses = allCourses.filter((c) => enrolledCourseIds.includes(c.id));
  const completedCourses = enrolledCourses.filter(
    (c) => enrollments[c.id]?.isCompleted || enrollments[c.id]?.progressPercent === 100
  );
  const inProgressCourses = enrolledCourses.filter(
    (c) => !(enrollments[c.id]?.isCompleted || enrollments[c.id]?.progressPercent === 100)
  );

  const wishlistCourses = allCourses.filter((c) => wishlist.includes(c.id));
  const registeredLiveList = allLiveClasses.filter((lc) => registeredClasses.includes(lc.id));

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, headline, bio });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Student Welcome Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Welcome back, {user?.name || 'Student'}! 👋
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                {user?.headline || 'Continuous learning path in Frontend Architecture & UI/UX.'}
              </p>
              <div className="flex items-center gap-3 text-xs text-brand-300 font-medium mt-2">
                <span>Member since {user?.joinedDate || '2026'}</span>
                <span>•</span>
                <span className="capitalize">{user?.role} Portal</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/courses"
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore New Courses</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Enrolled Courses"
          value={enrolledCourses.length}
          change={`${inProgressCourses.length} in progress`}
          icon={BookOpen}
          iconBgColor="bg-brand-50"
          iconColor="text-brand-600"
        />
        <StatsCard
          title="Completed Courses"
          value={completedCourses.length}
          change="Modules completed"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatsCard
          title="Registered Live Classes"
          value={registeredLiveList.length}
          change="Interactive sessions"
          icon={Radio}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
        <StatsCard
          title="Wishlist Items"
          value={wishlistCourses.length}
          change="Saved for later"
          icon={Heart}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleTabChange('courses')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Enrolled Courses ({enrolledCourses.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('live')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'live'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-500" />
            <span>My Live Workshops ({registeredLiveList.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('wishlist')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'wishlist'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistCourses.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('settings')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const progress = enrollments[course.id];
                if (!progress) return null;
                return (
                  <EnrolledCourseCard
                    key={course.id}
                    course={course}
                    progress={progress}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  You haven't enrolled in any courses yet
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Start with our free courses or pick an enterprise curriculum to accelerate your learning.
                </p>
              </div>
              <Link
                to="/courses"
                className="inline-block px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
              >
                Browse Catalog
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Live Workshops */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          {registeredLiveList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredLiveList.map((liveClass) => (
                <LiveClassCard
                  key={liveClass.id}
                  liveClass={liveClass}
                  onJoinClick={(cls) => setActiveLiveModal(cls)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <Radio className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  No registered live workshops
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Register for upcoming live sessions to code along with industry experts and ask live questions.
                </p>
              </div>
              <Link
                to="/live-classes"
                className="inline-block px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
              >
                View Live Schedule
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click the heart icon on any course card to bookmark courses you're interested in.
                </p>
              </div>
              <Link
                to="/courses"
                className="inline-block px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
              >
                Find Courses to Save
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Account Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 max-w-2xl shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Student Profile & Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your public learning bio, credentials, and notification preferences.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Aspiring Full-Stack Developer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bio / Learning Goals
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your experience and what technologies you are mastering..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactive Classroom Demo Modal */}
      <LiveClassRoomModal
        isOpen={!!activeLiveModal}
        onClose={() => setActiveLiveModal(null)}
        liveClass={activeLiveModal}
      />
    </div>
  );
};
