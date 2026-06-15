import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import * as LucideIcons from 'lucide-react';
import { useTheme } from './ThemeContext';

interface ChartDataItem {
  name: string;
  value: number;
  unit: string;
  meta: string;
  achievement: string;
}

const PL_DATA: ChartDataItem[] = [
  {
    name: 'Premsons Motor',
    value: 18.2,
    unit: '%',
    meta: 'Eastern India',
    achievement: 'Optimized parts rotation & collision repairs flow'
  },
  {
    name: 'Rukn Al-Sayarat',
    value: 25.5,
    unit: '%',
    meta: 'Iraq (Toyota)',
    achievement: 'Boosted Toyota parts wholesale expansion by 55%'
  },
  {
    name: 'Saud Bahwan Group',
    value: 12.0,
    unit: '%',
    meta: 'Oman (GCC)',
    achievement: 'Streamlined resource allocation across 25 outlets'
  },
  {
    name: 'Mahindra & Mahindra',
    value: 15.4,
    unit: '%',
    meta: 'India (Regional DGM)',
    achievement: 'Established SLAs with major commercial fleet fleets'
  }
];

const CSI_DATA: ChartDataItem[] = [
  {
    name: 'Premsons Motor',
    value: 985,
    unit: ' / 1000',
    meta: 'Maruti Suzuki Premium Std',
    achievement: 'Enhanced vehicle turnaround using Kaizen processes'
  },
  {
    name: 'Rukn Al-Sayarat',
    value: 948,
    unit: ' / 1000',
    meta: 'Toyota TSM Standards',
    achievement: 'Standardized workshop utilization parameters'
  },
  {
    name: 'Saud Bahwan Group',
    value: 976,
    unit: ' / 1000',
    meta: 'Saud Bahwan Gold Standard',
    achievement: 'Technician capability alignment and standard audits'
  },
  {
    name: 'Mahindra & Mahindra',
    value: 960,
    unit: ' / 1000',
    meta: 'M&M Passenger Standards',
    achievement: 'Pioneered active digital customer advocacy desk'
  }
];

const ABSORPTION_DATA: ChartDataItem[] = [
  {
    name: 'Premsons Motor',
    value: 95.0,
    unit: '%',
    meta: 'Eastern India',
    achievement: 'Dealership overhead covered purely by workshop logic'
  },
  {
    name: 'Saud Bahwan Group',
    value: 88.5,
    unit: '%',
    meta: 'Oman Outlets Matrix',
    achievement: 'Sustained robust bodywork operations and diagnostic flows'
  },
  {
    name: 'Rukn Al-Sayarat',
    value: 78.0,
    unit: '%',
    meta: 'Iraq Operations',
    achievement: 'Fast recovery post market turbulence with fleet works'
  },
  {
    name: 'Mahindra & Mahindra',
    value: 82.3,
    unit: '%',
    meta: 'National Premium Tenures',
    achievement: 'Balanced parts and diagnostic overheads optimization'
  }
];

type MetricType = 'pl' | 'csi' | 'absorption';

export default function PerformanceHighlights() {
  const { theme } = useTheme();
  const [activeMetric, setActiveMetric] = useState<MetricType>('pl');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  const getMetricDetails = () => {
    switch (activeMetric) {
      case 'pl':
        return {
          title: 'Average P&L Improvement %',
          description: 'Sustained year-on-year operating profit growth & margin optimization achieved through smart workflow diagnostics.',
          label: 'Operating Profit Growth',
          data: PL_DATA,
          color: '#f59e0b', // Amber-500
          icon: 'TrendingUp'
        };
      case 'csi':
        return {
          title: 'Customer Satisfaction Index (CSI)',
          description: 'Top-tier satisfaction parameters recorded under prestigious OEM audits and official corporate evaluations.',
          label: 'Customer Satisfaction Score',
          data: CSI_DATA,
          color: '#10b981', // Emerald-500
          icon: 'Award'
        };
      case 'absorption':
        return {
          title: 'Service Absorption Ratio %',
          description: 'The definitive benchmark of financial absolute resilience—offsetting dealership infrastructure expenses purely via workshop intake operations.',
          label: 'Absorption Ratio',
          data: ABSORPTION_DATA,
          color: '#3b82f6', // Blue-500
          icon: 'ShieldAlert'
        };
    }
  };

  const metric = getMetricDetails();
  const isDark = theme === 'dark';

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.TrendingUp;
    return <Icon className={className} strokeWidth={1.5} />;
  };

  // Custom inside tooltip component to match premium dark/light portfolio styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ChartDataItem = payload[0].payload;
      return (
        <div className="bg-[#fcfbf9]/95 dark:bg-zinc-950/95 border border-zinc-200/50 dark:border-zinc-850 p-4 rounded-xl shadow-xl backdrop-blur-md max-w-[260px] pointer-events-none">
          <p className="text-[10px] font-mono tracking-widest text-[#d97706] uppercase">{data.meta}</p>
          <p className="font-sans font-bold text-sm text-zinc-900 dark:text-zinc-50 mt-1">{data.name}</p>
          <div className="mt-2 py-1 px-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-baseline justify-between border border-zinc-200/50 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">Metrics Lift</span>
            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-50">
              {data.value}{data.unit}
            </span>
          </div>
          <p className="text-[11px] text-zinc-650 dark:text-zinc-400 font-sans leading-relaxed mt-2.5 border-t border-dashed border-zinc-200 dark:border-zinc-850 pt-2 italic">
            "{data.achievement}"
          </p>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      onViewportEnter={() => setIsInView(true)}
      className="bg-white/40 dark:bg-zinc-950/20 p-6 md:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-900/60 shadow-xs relative overflow-hidden"
      id="performance-highlights-comp"
    >
      {/* Background soft visual grid */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-radial from-amber-500/5 to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive panel: Summary details & selection tabs */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-mono tracking-widest uppercase mb-2">
              <LucideIcons.Sparkles size={13} className="text-amber-500 shrink-0" />
              <span>Interactive Analytics</span>
            </div>
            <h3 className="text-2xl font-sans tracking-tight font-light text-zinc-900 dark:text-zinc-50 leading-tight">
              Performance <span className="font-semibold text-zinc-800 dark:text-zinc-250">Highlights</span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              Real-time visualization metrics representing verified KPIs of global programs led by Joydeep Das. Switch tabs for detailed comparative reviews.
            </p>
          </motion.div>

          {/* Styled Tabs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2 bg-zinc-150/40 dark:bg-zinc-900/10 p-1.5 rounded-2xl border border-zinc-200/50 dark:border-zinc-900/80">
            <button
              onClick={() => setActiveMetric('pl')}
              className={`w-full text-left p-3 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center justify-between group ${
                activeMetric === 'pl'
                  ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                {renderIcon('TrendingUp', 'w-4 h-4 text-amber-500')}
                <span>P&L Improvement %</span>
              </span>
              <LucideIcons.ChevronRight
                size={12}
                className={`opacity-40 group-hover:opacity-100 transition-transform ${
                  activeMetric === 'pl' ? 'translate-x-0.5 opacity-100' : ''
                }`}
              />
            </button>

            <button
              onClick={() => setActiveMetric('csi')}
              className={`w-full text-left p-3 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center justify-between group ${
                activeMetric === 'csi'
                  ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-850 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                {renderIcon('Award', 'w-4 h-4 text-emerald-500')}
                <span>Customer Satisfaction (CSI)</span>
              </span>
              <LucideIcons.ChevronRight
                size={12}
                className={`opacity-40 group-hover:opacity-100 transition-transform ${
                  activeMetric === 'csi' ? 'translate-x-0.5 opacity-100' : ''
                }`}
              />
            </button>

            <button
              onClick={() => setActiveMetric('absorption')}
              className={`w-full text-left p-3 rounded-xl text-xs font-sans tracking-wide transition-all flex items-center justify-between group ${
                activeMetric === 'absorption'
                  ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-855 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2">
                {renderIcon('ShieldAlert', 'w-4 h-4 text-blue-500')}
                <span>Service Absorption Ratio %</span>
              </span>
              <LucideIcons.ChevronRight
                size={12}
                className={`opacity-40 group-hover:opacity-100 transition-transform ${
                  activeMetric === 'absorption' ? 'translate-x-0.5 opacity-100' : ''
                }`}
              />
            </button>
          </motion.div>

          {/* Metric Details Narrative card */}
          <motion.div variants={itemVariants} className="bg-zinc-100/50 dark:bg-zinc-900/30 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-900 select-none cursor-default">
            <h4 className="text-xs font-mono tracking-widest text-[#d97706] uppercase flex items-center gap-1.5">
              {renderIcon(metric.icon, 'w-3.5 h-3.5')}
              Operational Impact
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              {metric.description}
            </p>
          </motion.div>
        </div>

        {/* Right Panel: Recharts Interactive Area chart visualization */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full">
          
          <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: metric.color }} />
              <span className="text-[10px] font-mono tracking-wider text-zinc-455 uppercase">
                Active Benchmark: {metric.title}
              </span>
            </div>
            
            {/* Legend info */}
            <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-550">
              Interactive Hover: Reveal precise implementation strategy
            </div>
          </motion.div>

          {/* Staggered chart entry container */}
          <motion.div variants={itemVariants} className="w-full h-[280px] md:h-[300px] mt-2 relative select-none">
            <ResponsiveContainer key={`${activeMetric}-${isInView ? 'in' : 'out'}`} width="100%" height="100%">
              <BarChart
                data={metric.data}
                margin={{ top: 20, right: 10, left: -22, bottom: 5 }}
                onMouseMove={(state: any) => {
                  if (state && state.activeTooltipIndex !== undefined) {
                    setHoveredIndex(state.activeTooltipIndex);
                  } else {
                    setHoveredIndex(null);
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 10,
                    fontFamily: 'JetBrains Mono',
                    fill: isDark ? '#a1a1aa' : '#71717a'
                  }}
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 10,
                    fontFamily: 'JetBrains Mono',
                    fill: isDark ? '#a1a1aa' : '#71717a'
                  }}
                  domain={activeMetric === 'csi' ? [800, 1000] : [0, 'auto']}
                  dx={-5}
                />
                <Tooltip
                  cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(24, 24, 27, 0.02)' }}
                  content={<CustomTooltip />}
                  allowEscapeViewBox={{ x: true, y: true }}
                />
                
                {activeMetric === 'absorption' && (
                  <ReferenceLine
                    y={100}
                    stroke="#10b981"
                    strokeDasharray="4 4"
                    label={{
                      value: '100% Breakeven Target',
                      position: 'top',
                      fill: isDark ? '#fbbf24' : '#d97706',
                      fontSize: 9,
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                )}

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={55}
                  isAnimationActive={isInView}
                  animationDuration={1100}
                  animationEasing="ease-out"
                >
                  {metric.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={metric.color}
                      fillOpacity={hoveredIndex === null || hoveredIndex === index ? 1.0 : 0.4}
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick Context display beneath chart */}
          <motion.div variants={itemVariants} className="mt-4 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-900/50 bg-[#fcfbf9]/50 dark:bg-black/10 flex items-start gap-3 select-none">
            <div className="p-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-900 text-zinc-500 shrink-0">
              <LucideIcons.HelpCircle size={14} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#d97706]">Selected Milestone Action</p>
              <p className="text-[11px] text-zinc-650 dark:text-zinc-400 mt-1 leading-relaxed">
                {hoveredIndex !== null ? (
                  <span>
                    <strong>{metric.data[hoveredIndex].name}</strong>: {metric.data[hoveredIndex].achievement} (<span className="font-mono text-zinc-900 dark:text-zinc-100">{metric.data[hoveredIndex].value}{metric.data[hoveredIndex].unit}</span>)
                  </span>
                ) : (
                  <span>Hover any bar above to focus on the concrete operational methodology initiated by Joydeep.</span>
                )}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}

