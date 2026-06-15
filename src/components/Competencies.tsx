import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { CORE_COMPETENCIES } from '../data';

interface CompetenciesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Competencies({ searchTerm, setSearchTerm }: CompetenciesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getIcon = (iconName: string, className: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Cpu;
    return <Icon className={className} strokeWidth={1.5} />;
  };

  // Match search terms against content
  const matchesSearch = (text: string) => {
    if (!searchTerm) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="space-y-8" id="competencies-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Professional Strengths
          </span>
          <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
            Core <span className="font-medium text-zinc-800 dark:text-zinc-200">Competencies</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
            A breakdown of Joydeep Das's executive capability matrix, optimized over three decades of field operations and top-tier industrial assignments.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full md:max-w-xs group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-amber-500 transition-colors">
            <LucideIcons.Search size={16} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords (e.g., P&L, Kaizen)..."
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 rounded-2xl py-2.5 pl-10 pr-8 text-xs font-sans text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 shadow-xs focus:outline-hidden transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Clear search"
            >
              <LucideIcons.X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CORE_COMPETENCIES.map((category, idx) => {
          const matchingSkills = category.skills.filter(skill => matchesSearch(skill) || matchesSearch(category.title) || matchesSearch(category.description));
          const hasMatches = matchingSkills.length > 0;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: hasMatches ? 1 : 0.4, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative bg-white/60 dark:bg-zinc-950/40 backdrop-blur-md p-6 rounded-2xl border transition-all ${
                selectedCategory === category.id
                  ? 'border-amber-500/50 dark:border-amber-500/40 shadow-md ring-1 ring-amber-500/10'
                  : 'border-zinc-200/60 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800'
              }`}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`p-2.5 rounded-xl transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'bg-zinc-150 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}>
                  {getIcon(category.iconName, "w-5 h-5")}
                </div>
                <h3 className="font-sans font-medium text-base text-zinc-800 dark:text-zinc-100">
                  {category.title}
                </h3>
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-sans min-h-[48px] mb-6">
                {category.description}
              </p>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block mb-1">
                  Core Attributes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, sIdx) => {
                    const isMatched = searchTerm && skill.toLowerCase().includes(searchTerm.toLowerCase());
                    return (
                      <span
                        key={sIdx}
                        className={`text-xs px-2.5 py-1.5 rounded-xl font-sans transition-all border flex items-center gap-1.5 ${
                          isMatched
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-zinc-100 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-350 border-zinc-200/50 dark:border-zinc-850'
                        }`}
                      >
                        <LucideIcons.CheckCircle2
                          size={12}
                          className={isMatched || selectedCategory === category.id ? "text-amber-500" : "text-zinc-400 dark:text-zinc-600"}
                        />
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action notice helper */}
              <div className="absolute bottom-3 right-5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                <LucideIcons.HelpCircle size={12} className="text-zinc-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Resume Feature Check for HR Scan */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-850 flex items-center justify-between"
          id="search-helper-result-bar"
        >
          <div className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
            <LucideIcons.Sparkles size={14} className="text-amber-500 shrink-0" />
            <span>
              Recruiter Filter: Displaying attributes matching "<strong>{searchTerm}</strong>".
            </span>
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="text-[10px] font-mono text-amber-600 hover:text-amber-500 bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/20"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
