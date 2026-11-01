import React from 'react';
import { Calendar, Clock, Users, Video, Radio, CheckCircle, ArrowRight } from 'lucide-react';
import { LiveClass } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { useEnrollment } from '../../context/EnrollmentContext';

interface LiveClassCardProps {
  liveClass: LiveClass;
  onJoinClick: (liveClass: LiveClass) => void;
  className?: string;
}

export const LiveClassCard: React.FC<LiveClassCardProps> = ({
  liveClass,
  onJoinClick,
  className = '',
}) => {
  const { isRegisteredForClass, toggleLiveClassRegistration } = useEnrollment();
  const isRegistered = isRegisteredForClass(liveClass.id);
  const isLiveNow = liveClass.status === 'live';
  const isCompleted = liveClass.status === 'completed';

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${className}`}
    >
      {/* Thumbnail & Status Overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={liveClass.thumbnail}
          alt={liveClass.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {isLiveNow && (
            <Badge variant="live" size="sm">
              LIVE NOW
            </Badge>
          )}
          {liveClass.status === 'upcoming' && (
            <Badge variant="primary" size="sm" className="font-semibold bg-white/90 backdrop-blur-xs text-brand-700">
              Upcoming Session
            </Badge>
          )}
          {isCompleted && (
            <Badge variant="secondary" size="sm" className="bg-slate-900/80 text-white backdrop-blur-xs">
              Completed Recording
            </Badge>
          )}
        </div>

        {/* Category & Price Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <Badge
            variant={liveClass.isFree || liveClass.price === 0 ? 'success' : 'secondary'}
            size="sm"
            className="font-bold bg-white/95 backdrop-blur-xs text-slate-900 shadow-xs"
          >
            {liveClass.isFree || liveClass.price === 0 ? 'Free' : formatCurrency(liveClass.price)}
          </Badge>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
            {liveClass.category}
          </span>
        </div>

        {/* Live Indicator overlay if broadcasting */}
        {isLiveNow && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-rose-950/80 backdrop-blur-xs border border-rose-500/40 px-3 py-1 rounded-lg text-rose-200 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Broadcasting with {liveClass.currentAttendees} attendees</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 line-clamp-2 transition-colors mb-2">
          {liveClass.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {liveClass.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 mb-4 mt-auto pt-3 border-t border-slate-100">
          <img
            src={liveClass.instructor.avatar}
            alt={liveClass.instructor.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {liveClass.instructor.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {liveClass.instructor.title}
            </p>
          </div>
        </div>

        {/* Meta Schedule details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-3 border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <span className="truncate">{liveClass.scheduledDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span className="truncate">{liveClass.durationMinutes} mins</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-slate-600 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Time: {liveClass.scheduledTime}</span>
          </div>
        </div>

        {/* Price & Seats Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Fee
            </span>
            <span className="text-base font-extrabold text-slate-900">
              {liveClass.isFree || liveClass.price === 0 ? 'Free' : formatCurrency(liveClass.price)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Enrollment
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {liveClass.currentAttendees} / {liveClass.maxAttendees} seats
            </span>
          </div>
        </div>

        {/* Actions Button */}
        <div className="flex items-center gap-2 pt-1">
          {isLiveNow ? (
            <button
              onClick={() => onJoinClick(liveClass)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Join Live Classroom</span>
            </button>
          ) : isCompleted ? (
            <button
              onClick={() => onJoinClick(liveClass)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Video className="w-4 h-4 text-brand-400" />
              <span>Watch Replay Recording</span>
            </button>
          ) : (
            <div className="w-full flex items-center gap-2">
              <button
                onClick={() =>
                  toggleLiveClassRegistration(liveClass.id, liveClass.title)
                }
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isRegistered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                }`}
              >
                {isRegistered ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registered</span>
                  </>
                ) : (
                  <span>
                    {liveClass.isFree || liveClass.price === 0
                      ? 'Register Free'
                      : `Register • ${formatCurrency(liveClass.price)}`}
                  </span>
                )}
              </button>
              <button
                onClick={() => onJoinClick(liveClass)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                title="Preview Class Agenda"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
