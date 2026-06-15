import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { CAREER_MILESTONES } from '../data';
import { CareerMilestone } from '../types';

interface CareerTimelineProps {
  searchTerm: string;
}

export default function CareerTimeline({ searchTerm }: CareerTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>("milestone_1"); // Default expand the latest GM role
  const [filterCategory, setFilterCategory] = useState<'All' | 'Executive' | 'Management'>('All');

  // Filter based on search criteria and category selection
  const filteredMilestones = CAREER_MILESTONES.filter((milestone) => {
    // Category check
    if (filterCategory !== 'All' && milestone.category !== filterCategory && filterCategory !== 'Management') {
      return false;
    }
    if (filterCategory === 'Management' && milestone.category !== 'Management' && milestone.category !== 'Earlier') {
      return false;
    }

    // Search term check
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      milestone.role.toLowerCase().includes(searchLower) ||
      milestone.company.toLowerCase().includes(searchLower) ||
      milestone.location.toLowerCase().includes(searchLower) ||
      milestone.description.toLowerCase().includes(searchLower) ||
      milestone.details.some(detail => detail.toLowerCase().includes(searchLower))
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8" id="experience-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#d97706] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Professional Track
          </span>
          <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
            Executive <span className="font-medium text-zinc-800 dark:text-zinc-200">Timeline</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
            A comprehensive overview of leading after-sales operations, dealership profitability, and customer networks across India and the GCC.
          </p>
        </div>

        {/* Level Controls */}
        <div className="flex items-center flex-wrap gap-2 bg-zinc-150 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60 w-fit self-start">
          <button
            onClick={() => setFilterCategory('All')}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
              filterCategory === 'All'
                ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilterCategory('Executive')}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
              filterCategory === 'Executive'
                ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Premium Executive (GM+)
          </button>
          <button
            onClick={() => setFilterCategory('Management')}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
              filterCategory === 'Management'
                ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Management & Earlier
          </button>
        </div>
      </div>

      {filteredMilestones.length === 0 ? (
        <div className="text-center py-12 bg-zinc-100/30 dark:bg-zinc-950/25 border border-dashed border-zinc-200 dark:border-zinc-900 rounded-2xl">
          <LucideIcons.Briefcase className="mx-auto text-zinc-350 dark:text-zinc-700 w-8 h-8 mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400 text-xs">No corporate roles found matching your search term.</p>
        </div>
      ) : (
        <div className="relative border-l border-zinc-200 dark:border-zinc-900 ml-4 md:ml-6 pl-6 md:pl-10 space-y-6 md:space-y-10">
          {filteredMilestones.map((milestone, index) => {
            const isExpanded = expandedId === milestone.id;

            return (
              <div key={milestone.id} className="relative group" id={`milestone-${milestone.id}`}>
                {/* Visual marker node */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 ring-2 ring-zinc-200 dark:ring-zinc-900 group-hover:ring-amber-500 transition-colors z-10">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-zinc-400 dark:bg-zinc-700 group-hover:bg-amber-500 transition-colors" />
                </span>

                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-stretch">
                  {/* Left Column: Core Experience Card */}
                  <div className="flex-1 w-full">
                    <div
                      onClick={() => toggleExpand(milestone.id)}
                      className={`cursor-pointer p-6 rounded-2xl border transition-all relative ${
                        isExpanded
                          ? 'bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800/80 shadow-md'
                          : 'bg-white/60 dark:bg-zinc-950/45 border-zinc-200/60 dark:border-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-800/60'
                      }`}
                    >
                      {/* Company badge header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {milestone.logoInitial && (
                            <span className="h-8 w-8 rounded-lg flex items-center justify-center font-mono font-semibold text-xs bg-zinc-150 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-850">
                              {milestone.logoInitial}
                            </span>
                          )}
                          <div>
                            <h4 className="font-sans font-medium text-sm text-zinc-500 dark:text-zinc-400">
                              {milestone.company}
                            </h4>
                            <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                              <LucideIcons.MapPin size={11} />
                              {milestone.location}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-250 dark:border-zinc-850">
                          {milestone.period}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className="font-sans font-semibold text-base md:text-lg text-zinc-800 dark:text-zinc-50 mt-1 flex items-center gap-2">
                        {milestone.role}
                      </h3>

                      {/* Brief overview */}
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed font-sans font-light">
                        {milestone.description}
                      </p>

                      {/* Expandable achievements and tasks */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-5 pt-5 border-t border-zinc-200/60 dark:border-zinc-900"
                          >
                            <h5 className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3 flex items-center gap-1.5">
                              <LucideIcons.Award size={12} className="text-amber-500" />
                              Key Accomplishments & Impact
                            </h5>
                            <ul className="space-y-3">
                              {milestone.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2.5 items-start text-xs text-zinc-600 dark:text-zinc-350 leading-relaxed font-sans font-normal">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80 mt-1.5 shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dropdown Indicator footer */}
                      <div className="mt-4 pt-3 border-t border-dashed border-zinc-200/50 dark:border-zinc-900/60 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                        <span>Click to {isExpanded ? 'collapse' : 'reveal'} details</span>
                        <LucideIcons.ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-500' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key metrics sidebar for the role */}
                  <div className="w-full lg:w-60 flex flex-col justify-start gap-3">
                    {milestone.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-zinc-100/60 dark:bg-zinc-950/20 p-4 rounded-xl border border-zinc-200 dark:border-zinc-900/50 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 dark:bg-amber-500/5 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                          {metric.label}
                        </span>
                        <span className="text-lg md:text-xl font-sans font-semibold text-zinc-800 dark:text-zinc-150 mt-1">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
