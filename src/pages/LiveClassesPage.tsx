import React, { useState, useEffect } from 'react';
import { Radio, Calendar, Users, Filter, Sparkles, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { LiveClassCard } from '../components/live-classes/LiveClassCard';
import { LiveClassRoomModal } from '../components/live-classes/LiveClassRoomModal';
import { liveClassService } from '../services/liveClassService';
import { categoriesData } from '../data/categoriesData';
import { LiveClass, LiveClassStatus } from '../types';

export const LiveClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<LiveClassStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeRoomClass, setActiveRoomClass] = useState<LiveClass | null>(null);

  useEffect(() => {
    setLoading(true);
    liveClassService.getLiveClasses(statusFilter, selectedCategory).then((data) => {
      setClasses(data);
      setLoading(false);
    });
  }, [statusFilter, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header and Breadcrumbs */}
      <div>
        <Breadcrumbs items={[{ label: 'Live Classes' }]} className="mb-4" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              Interactive Live Classroom
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Live Mentorship & Code-Alongs
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Watch tech leads live code in real time, review architecture, participate in Q&A studios, and join discussions.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setStatusFilter('live')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                statusFilter === 'live'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>Live Now</span>
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'upcoming'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'completed'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recorded Replays
            </button>
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Categories</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Live Classes */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 h-96 p-4 space-y-4">
              <div className="w-full h-44 bg-slate-200 rounded-xl" />
              <div className="w-3/4 h-5 bg-slate-200 rounded" />
              <div className="w-1/2 h-4 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ) : classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((liveClass) => (
            <LiveClassCard
              key={liveClass.id}
              liveClass={liveClass}
              onJoinClick={(cls) => setActiveRoomClass(cls)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No sessions match this filter</h3>
          <p className="text-xs text-slate-500">
            Check back soon or switch filters to view completed session replays.
          </p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold"
          >
            Show All Sessions
          </button>
        </div>
      )}

      {/* Interactive Classroom Demo Modal */}
      <LiveClassRoomModal
        isOpen={!!activeRoomClass}
        onClose={() => setActiveRoomClass(null)}
        liveClass={activeRoomClass}
      />
    </div>
  );
};
