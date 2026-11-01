import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconBgColor = 'bg-brand-50',
  iconColor = 'text-brand-600',
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </h4>
        {change && (
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            {change}
          </p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
