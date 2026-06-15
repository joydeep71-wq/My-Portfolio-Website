import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { StatMetric } from '../types';
import { EXECUTIVE_STATS } from '../data';

export default function ExecutiveStats() {
  const [selectedMetric, setSelectedMetric] = useState<StatMetric | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Scale' | 'Impact' | 'Leadership'>('All');

  const filteredStats = activeCategory === 'All'
    ? EXECUTIVE_STATS
    : EXECUTIVE_STATS.filter(s => s.category === activeCategory);

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Wrench;
    return <Icon className={className} strokeWidth={1.5} />;
  };

  return (
    <div className="space-y-8" id="stats-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#d97706] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Performance Metrics
          </span>
          <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
            Operational <span className="font-medium text-zinc-800 dark:text-zinc-200">Dashboard</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
            Selected key performance indicators showing scale, quantifiable business growth, and teams managed across global automotive networks.
          </p>
        </div>

        {/* Dashboard Category Controls */}
        <div className="flex items-center flex-wrap gap-2 bg-zinc-150 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60 w-fit self-start">
          {(['All', 'Scale', 'Impact', 'Leadership'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredStats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedMetric(stat)}
            className="group relative cursor-pointer bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md p-6 h-fit rounded-2xl border border-zinc-200/60 dark:border-zinc-900 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-800/80 transition-all flex flex-col justify-between overflow-hidden"
            id={`metric-card-${stat.id}`}
          >
            {/* Soft decorative background glow */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-radial from-amber-500/5 to-transparent dark:from-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-start gap-4">
              <span className="text-4xl md:text-5xl font-sans tracking-tight font-semibold text-zinc-900 dark:text-zinc-50 flex items-baseline">
                {stat.value}
                <span className="text-amber-500 ml-0.5 animate-pulse">.</span>
              </span>
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 dark:group-hover:text-amber-500 group-hover:bg-amber-500/5 transition-all">
                {renderIcon(stat.iconName, "w-5 h-5")}
              </div>
            </div>

            <div className="mt-6">
              <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-mono tracking-widest uppercase block mb-1">
                {stat.category} Matrix
              </span>
              <h3 className="font-sans font-medium text-sm text-zinc-800 dark:text-zinc-200 line-clamp-1">
                {stat.label}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 line-clamp-2 md:line-clamp-none font-sans leading-relaxed">
                {stat.description}
              </p>
              
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-mono mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <span>Analyze impact methodology</span>
                <LucideIcons.ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metric Detail Overlay/Modal Drawer */}
      <AnimatePresence>
        {selectedMetric && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMetric(null)}
              className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
              id="metric-overlay-backdrop"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-3xl shadow-2xl p-6 md:p-8 z-10 overflow-hidden"
              id="metric-modal-content"
            >
              {/* Soft visual highlights */}
              <div className="absolute -left-20 -top-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setSelectedMetric(null)}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-all"
                aria-label="Close modal"
              >
                <LucideIcons.X size={18} />
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                  {renderIcon(selectedMetric.iconName, "w-6 h-6")}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500 bg-amber-500/5 px-2.5 py-0.5 rounded border border-amber-500/10">
                    {selectedMetric.category} Focus
                  </span>
                  <h4 className="text-xs text-zinc-400 dark:text-zinc-500 font-sans mt-1">Joydeep Das Portfolio Metrics</h4>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-5xl font-sans tracking-tight font-semibold text-zinc-900 dark:text-zinc-50">
                  {selectedMetric.value}
                </h3>
                <div>
                  <h4 className="text-lg font-sans font-medium text-zinc-800 dark:text-zinc-100">
                    {selectedMetric.label}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 leading-relaxed">
                    {selectedMetric.description}
                  </p>
                </div>

                <div className="bg-zinc-200/50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-300/30 dark:border-zinc-800/80 space-y-3 mt-4">
                  <h5 className="text-xs font-mono tracking-wider text-zinc-700 dark:text-zinc-300 uppercase flex items-center gap-1.5">
                    <LucideIcons.ShieldAlert size={14} className="text-amber-500" />
                    Strategic Executive Execution
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    {selectedMetric.id === "stat_1" && "Reflects thirty continuous years of scaling dealership networks, troubleshooting P&L targets, and coordinating top OEM relationships like Suzuki, Toyota, Fiat and Mahindra."}
                    {selectedMetric.id === "stat_2" && "Accomplished by managing dynamic workshop turnaround pipelines, staffing optimal mechanics, coordinating high-intensity bodyshops, and using Kaizen methods to eliminate flow delays."}
                    {selectedMetric.id === "stat_3" && "Requires meticulous leadership architecture. Established clear KPIs, created supportive field trainings, and structured regional branches to work autonomously yet strictly standard-compliant."}
                    {selectedMetric.id === "stat_4" && "A service absorption of 95% indicates that nearly the entire structural operating overhead of the dealership is covered purely by service workshop profits, creating complete financial immunity."}
                    {selectedMetric.id === "stat_5" && "Achieved in Iraq via targeted wholesale networks, reorganizing modern parts logistics, expanding dealer sub-outlets, and securing steady business with top fleet partners."}
                    {selectedMetric.id === "stat_6" && "Sustained by driving strict parts inventory turnovers, optimizing body collision billing with premium insurer relations, and raising mechanical workshop efficiency ratios."}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-900 flex justify-end">
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="px-5 py-2 rounded-xl text-xs font-sans tracking-wide bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 shadow-sm transition-all"
                >
                  Conclude Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
