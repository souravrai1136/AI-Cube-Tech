import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, Lock, CheckCircle2, Clock } from 'lucide-react';
import { CourseSection, Lesson } from '../../types';

interface CurriculumAccordionProps {
  sections: CourseSection[];
  courseId: string;
  isEnrolled?: boolean;
  completedLessonIds?: string[];
  onSelectPreviewLesson?: (lesson: Lesson) => void;
  onSelectLesson?: (lesson: Lesson) => void;
  currentLessonId?: string;
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({
  sections,
  isEnrolled = false,
  completedLessonIds = [],
  onSelectPreviewLesson,
  onSelectLesson,
  currentLessonId,
}) => {
  // Initially expand the first section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [sections[0]?.id || '']: true,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    sections.forEach((s) => (all[s.id] = true));
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  return (
    <div className="space-y-3">
      {/* Expand/Collapse All buttons */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
        <span>
          {sections.length} sections •{' '}
          {sections.reduce((acc, s) => acc + s.lessons.length, 0)} total lectures
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="hover:text-brand-600 transition-colors font-medium"
          >
            Expand all
          </button>
          <span>•</span>
          <button
            onClick={collapseAll}
            className="hover:text-brand-600 transition-colors font-medium"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
        {sections.map((section, sIndex) => {
          const isExpanded = !!expandedSections[section.id];
          return (
            <div key={section.id} className="bg-white">
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className="font-semibold text-sm text-slate-900">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                  <span>{section.lessons.length} lessons</span>
                  <span>•</span>
                  <span>{section.duration}</span>
                </div>
              </button>

              {/* Lessons Accordion Content */}
              {isExpanded && (
                <div className="divide-y divide-slate-100">
                  {section.lessons.map((lesson, lIndex) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isCurrent = currentLessonId === lesson.id;
                    const canAccess = isEnrolled || lesson.isFreePreview;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-3.5 sm:px-5 flex items-center justify-between gap-3 text-sm transition-colors ${
                          isCurrent
                            ? 'bg-brand-50/70 text-brand-900 font-medium'
                            : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Completion or Lock icon */}
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : canAccess ? (
                            <PlayCircle className="w-4 h-4 text-brand-600 shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          )}

                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (canAccess && onSelectLesson) {
                                  onSelectLesson(lesson);
                                } else if (lesson.isFreePreview && onSelectPreviewLesson) {
                                  onSelectPreviewLesson(lesson);
                                }
                              }}
                              className={`text-left text-xs sm:text-sm truncate block hover:text-brand-600 transition-colors ${
                                canAccess ? 'cursor-pointer' : 'cursor-default'
                              }`}
                            >
                              <span className="text-slate-400 mr-2 text-xs font-mono">
                                {sIndex + 1}.{lIndex + 1}
                              </span>
                              {lesson.title}
                            </button>
                          </div>
                        </div>

                        {/* Right side: Preview Button & Duration */}
                        <div className="flex items-center gap-3 shrink-0">
                          {lesson.isFreePreview && !isEnrolled && (
                            <button
                              type="button"
                              onClick={() =>
                                onSelectPreviewLesson && onSelectPreviewLesson(lesson)
                              }
                              className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-md transition-colors"
                            >
                              Free Preview
                            </button>
                          )}
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
