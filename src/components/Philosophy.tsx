import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { LEADERSHIP_PHILOSOPHY } from '../data';

export default function Philosophy() {
  const [activePhilosophyId, setActivePhilosophyId] = useState<string>("phil_1");

  const getPhilosophyIcon = (iconName: string, className: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Compass;
    return <Icon className={className} strokeWidth={1.5} />;
  };

  const activePhilosophy = LEADERSHIP_PHILOSOPHY.find(p => p.id === activePhilosophyId) || LEADERSHIP_PHILOSOPHY[0];

  return (
    <div className="space-y-8" id="philosophy-section">
      <div>
        <span className="text-xs font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Executive Framework
        </span>
        <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
          Operational & Leadership <span className="font-medium text-zinc-800 dark:text-zinc-200">Philosophy</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
          Core directives guiding Joydeep Das's action protocols, people coordination, and dealership profitability benchmarks over long-gestation markets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation / Selection Column */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {LEADERSHIP_PHILOSOPHY.map((phil) => {
            const isActive = phil.id === activePhilosophyId;
            return (
              <button
                key={phil.id}
                onClick={() => setActivePhilosophyId(phil.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 group ${
                  isActive
                    ? 'bg-zinc-900 text-zinc-50 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-md'
                    : 'bg-white/60 dark:bg-zinc-950/45 border-zinc-200/60 dark:border-zinc-900/85 hover:border-zinc-300 dark:hover:border-zinc-800'
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 group-hover:bg-amber-500/5'
                }`}>
                  {getPhilosophyIcon(phil.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm tracking-wide">
                    {phil.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-1 ${
                    isActive ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-400 dark:text-zinc-500'
                  }`}>
                    {phil.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Quote Board Display */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhilosophy.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white/60 dark:bg-zinc-950/45 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-900 relative min-h-[320px] flex flex-col justify-between overflow-hidden shadow-sm"
              id={`philosophy-display-${activePhilosophy.id}`}
            >
              {/* Soft visual detail in background */}
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-12 opacity-5 pointer-events-none">
                {getPhilosophyIcon(activePhilosophy.iconName, "w-56 h-56 text-zinc-900 dark:text-white")}
              </div>

              <div>
                <LucideIcons.Quote size={40} className="text-amber-500/20 mb-4" />
                <blockquote className="text-lg md:text-xl font-sans tracking-tight leading-relaxed text-zinc-800 dark:text-zinc-100 font-light italic">
                  "{activePhilosophy.quote}"
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
                <div>
                  <div className="font-sans font-medium text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Operational Principle
                  </div>
                  <h4 className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-350 mt-0.5">
                    {activePhilosophy.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 bg-amber-500/5 px-3 py-1.5 rounded-xl border border-amber-500/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                  </span>
                  <span>Active Rule</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
