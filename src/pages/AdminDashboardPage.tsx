import React, { useState, useEffect } from 'react';
import {
  Shield,
  BookOpen,
  Users,
  IndianRupee,
  Radio,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Eye,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { StatsCard } from '../components/dashboard/StatsCard';
import { courseService } from '../services/courseService';
import { liveClassService } from '../services/liveClassService';
import { Course, LiveClass, CourseLevel } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const { addToast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [activeTab, setActiveTab] = useState<'courses' | 'live' | 'students' | 'activity'>('courses');

  // Modals state
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  // Form State for Add / Edit Course
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    tagline: '',
    description: '',
    price: 49.99,
    originalPrice: 79.99,
    isFree: false,
    level: 'Intermediate' as CourseLevel,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'Alexander Hayes',
  });

  const loadData = () => {
    courseService.getCourses().then(setCourses);
    liveClassService.getLiveClasses().then(setLiveClasses);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setFormData({
      title: '',
      category: 'Python & Data Science',
      tagline: '',
      description: '',
      price: 5000,
      originalPrice: 9999,
      isFree: false,
      level: 'All Levels',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      instructorName: 'Pushkar Rai',
    });
    setEditingCourse(null);
    setIsAddCourseModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      tagline: course.tagline,
      description: course.description,
      price: course.price,
      originalPrice: course.originalPrice || course.price * 1.5,
      isFree: course.isFree || false,
      level: course.level,
      thumbnail: course.thumbnail,
      instructorName: course.instructor.name,
    });
    setIsAddCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingCourse) {
      await courseService.updateCourse(editingCourse.id, {
        title: formData.title,
        category: formData.category,
        tagline: formData.tagline,
        description: formData.description,
        price: formData.isFree ? 0 : Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        isFree: formData.isFree,
        level: formData.level,
        thumbnail: formData.thumbnail,
      });
      addToast('success', 'Course Updated', `"${formData.title}" saved successfully.`);
    } else {
      await courseService.createCourse({
        title: formData.title,
        tagline: formData.tagline || 'Master cutting-edge industry skills.',
        description: formData.description || 'Hands-on project oriented curriculum.',
        category: formData.category,
        thumbnail: formData.thumbnail,
        previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        instructor: {
          id: 'inst-custom',
          name: formData.instructorName,
          title: 'Senior Technical Lead',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          bio: 'Industry specialist guiding students with modern best practices.',
          rating: 4.9,
          studentsCount: 1200,
          coursesCount: 1,
        },
        price: formData.isFree ? 0 : Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        isFree: formData.isFree,
        rating: 4.9,
        reviewsCount: 1,
        studentsCount: 0,
        level: formData.level,
        language: 'English',
        lastUpdated: 'Just now',
        totalDuration: '4 hours',
        totalLessons: 8,
        sections: [
          {
            id: `sec-${Date.now()}`,
            title: 'Section 1: Core Fundamentals & Project Setup',
            duration: '2 hours',
            lessons: [
              {
                id: `les-${Date.now()}-1`,
                title: 'Introduction and Environment Configuration',
                duration: '15:00',
                durationMinutes: 15,
                isFreePreview: true,
                description: 'Initial walkthrough and repository setup.',
              },
            ],
          },
        ],
        learningOutcomes: [
          'Design and deploy real-world production projects',
          'Master modern tools and industry workflows',
        ],
        requirements: ['Basic computer literacy'],
        targetAudience: ['All developers and digital creators'],
      });
      addToast('success', 'Course Created', `"${formData.title}" is now published.`);
    }

    setIsAddCourseModalOpen(false);
    loadData();
  };

  const confirmDeleteCourse = async () => {
    if (!deletingCourseId) return;
    await courseService.deleteCourse(deletingCourseId);
    addToast('info', 'Course Deleted', 'Course was removed from the demo catalog.');
    setDeletingCourseId(null);
    loadData();
  };

  const handleToggleLiveStatus = async (liveClass: LiveClass) => {
    const nextStatus =
      liveClass.status === 'live'
        ? 'completed'
        : liveClass.status === 'upcoming'
          ? 'live'
          : 'upcoming';

    await liveClassService.updateLiveClass(liveClass.id, { status: nextStatus });
    addToast('success', 'Status Updated', `Workshop is now marked as "${nextStatus}".`);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-950/90 border border-purple-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900 border border-purple-700 text-purple-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            Platform Owner Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Cube Tech Administration
          </h1>
          <p className="text-xs sm:text-sm text-purple-200">
            Manage course catalog, schedule live interactive classes, oversee student enrollments, and inspect analytics.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="relative z-10 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 self-start sm:self-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Admin Demo Notice:</strong> Course creation, updates, and live status changes persist in local demo state. Revenue figures and student counts represent illustrative platform projections and are not actual financial records.
        </p>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Demo Revenue"
          value="₹12,48,250"
          change="+18.4% from last month (Sample)"
          icon={IndianRupee}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatsCard
          title="Active Students"
          value="45,210"
          change="Across 92 countries (Sample)"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Published Courses"
          value={courses.length}
          change="Across 6 core tracks"
          icon={BookOpen}
          iconBgColor="bg-brand-50"
          iconColor="text-brand-600"
        />
        <StatsCard
          title="Live Sessions"
          value={liveClasses.length}
          change={`${liveClasses.filter((c) => c.status === 'live').length} currently live`}
          icon={Radio}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'courses'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Catalog ({courses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'live'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Radio className="w-4 h-4 text-rose-500" />
            <span>Live Class Management ({liveClasses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'students'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Demo Students (Directory)</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-4 px-1 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'activity'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Activity className="w-4 h-4" />
            <span>Platform Activity Log</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Course Management Table */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Platform Courses</h3>
            <span className="text-xs text-slate-500">
              Total: {courses.length} courses published
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Instructor</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Students</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3 min-w-[260px]">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-12 h-8 rounded-lg object-cover shrink-0"
                      />
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {course.title}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {course.category}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {course.instructor.name}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-900">
                      {course.isFree ? 'Free' : formatCurrency(course.price)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {new Intl.NumberFormat().format(course.studentsCount)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-amber-600">
                      ★ {course.rating.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                        title="Edit course"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingCourseId(course.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Live Class Management */}
      {activeTab === 'live' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Live Workshops Schedule</h3>
            <span className="text-xs text-slate-500">
              Interactive session coordinator
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4">Workshop</th>
                  <th className="py-3.5 px-4">Instructor</th>
                  <th className="py-3.5 px-4">Scheduled Date</th>
                  <th className="py-3.5 px-4">Attendees</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Toggle Broadcast</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {liveClasses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.instructor.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.scheduledDate} ({item.scheduledTime})
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.currentAttendees} / {item.maxAttendees}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.isFree || item.price === 0 ? 'Free' : formatCurrency(item.price)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${item.status === 'live'
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : item.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleToggleLiveStatus(item)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                      >
                        Cycle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Demo Student Directory */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Enrolled Students (Sample Directory)</h3>
            <span className="text-xs text-slate-500">Representative demo cohorts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4">Courses Enrolled</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    name: 'Alex Rivera (Demo Student)',
                    email: 'student@aicubetech.demo',
                    joined: 'August 2026',
                    courses: 2,
                    status: 'Active',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
                  },
                  {
                    name: 'Sarah Kim',
                    email: 'sarah.k@stripe.demo',
                    joined: 'September 2026',
                    courses: 4,
                    status: 'Active',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                  },
                  {
                    name: 'Michael Chen',
                    email: 'michael.c@figma.demo',
                    joined: 'October 2026',
                    courses: 3,
                    status: 'Active',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                  },
                  {
                    name: 'Amara Okafor',
                    email: 'amara.o@fintech.demo',
                    joined: 'October 2026',
                    courses: 2,
                    status: 'Active',
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
                  },
                ].map((std, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-2.5">
                      <img
                        src={std.avatar}
                        alt={std.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-900">{std.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{std.email}</td>
                    <td className="py-3.5 px-4 text-slate-600">{std.joined}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-bold">{std.courses} courses</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Platform Activity Log */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Recent Platform Events</h3>
          <div className="space-y-3">
            {[
              {
                title: 'New Student Enrollment',
                detail: 'Alex Rivera enrolled in Modern Full-Stack Web Development',
                time: '12 minutes ago',
              },
              {
                title: 'Live Workshop Registration',
                detail: 'Marcus Sterling registered for Enterprise Micro-Frontends session',
                time: '45 minutes ago',
              },
              {
                title: 'Course Review Submitted',
                detail: 'Elena Rostova gave 5 stars for Enterprise React & TypeScript',
                time: '2 hours ago',
              },
              {
                title: 'Course Lecture Completed',
                detail: 'Student completed Lecture 2: TypeScript Prerequisites',
                time: '3 hours ago',
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{event.title}</p>
                  <p className="text-slate-600 mt-0.5">{event.detail}</p>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Create New Course'}
        description="Configure metadata, curriculum, and pricing for this course."
        size="lg"
      >
        <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Next.js 15 Fullstack Mastery"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="React and TypeScript">React and TypeScript</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Python Programming">Python Programming</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Skill Level</label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value as CourseLevel })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tagline / Short Pitch</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="A concise summary of what this course delivers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Price (₹ INR)</label>
              <input
                type="number"
                step="1"
                disabled={formData.isFree}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Original Price (₹ INR)</label>
              <input
                type="number"
                step="1"
                disabled={formData.isFree}
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: Number(e.target.value) })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="pt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="isFreeCheck"
                checked={formData.isFree}
                onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4"
              />
              <label htmlFor="isFreeCheck" className="font-semibold text-slate-800">
                Make Course Free
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Thumbnail Image URL (Unsplash)
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed course description..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddCourseModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm"
            >
              {editingCourse ? 'Save Changes' : 'Publish Course'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Course Confirmation Dialog */}
      <Modal
        isOpen={!!deletingCourseId}
        onClose={() => setDeletingCourseId(null)}
        title="Confirm Course Deletion"
        size="sm"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Are you sure you want to delete this course from the AI Cube Tech catalog? This action will remove it from the course directory in this demo session.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDeletingCourseId(null)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteCourse}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Delete Course
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
