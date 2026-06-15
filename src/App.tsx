import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';

// Theme & Content Data
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { EXECUTIVE_HEADER, EDUCATION_CREDENTIALS } from './data';
import profilePic from '@/assets/profile.jpg';

// Custom Segment Components
import ExecutiveStats from './components/ExecutiveStats';
import PerformanceHighlights from './components/PerformanceHighlights';
import Competencies from './components/Competencies';
import CareerTimeline from './components/CareerTimeline';
import Philosophy from './components/Philosophy';
import BusinessCard from './components/BusinessCard';
import ContactSection from './components/ContactSection';

function PortfolioApp() {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Dashboard', id: 'stats-section' },
    { label: 'Expertise', id: 'competencies-section' },
    { label: 'Career Milestone', id: 'experience-section' },
    { label: 'Philosophy', id: 'philosophy-section' },
    { label: 'Credentials', id: 'education-section' },
    { label: 'Connect', id: 'contact-section' }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 85; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-zinc-900 dark:bg-[#0c0d0e] dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-amber-500/30">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-linear-to-b from-amber-500/5 to-transparent rounded-full blur-3xl opacity-60 dark:opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-linear-to-tr from-zinc-300/10 to-transparent rounded-full blur-3xl opacity-50 dark:opacity-20" />
        {/* Subtle executive grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100" />
      </div>

      {/* HEADER & NAVIGATIONAL MATRIX */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/80 dark:bg-[#0c0d0e]/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          
          {/* Executive Shield Seal */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-10 h-10 bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm tracking-wide rounded-xl flex items-center justify-center border border-zinc-850 dark:border-zinc-300 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all shadow-sm">
              {EXECUTIVE_HEADER.initials}
            </span>
            <div className="text-left hidden sm:block">
              <h1 className="font-sans font-bold text-sm tracking-wider text-zinc-850 dark:text-zinc-50">
                {EXECUTIVE_HEADER.name}
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-[#d97706] uppercase">
                Operations Director
              </p>
            </div>
          </button>

          {/* Core Desktop Navbar */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wide transition-all relative ${
                    isActive
                      ? 'text-zinc-950 dark:text-zinc-50 font-medium'
                      : 'text-zinc-500 hover:text-zinc-855 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-amber-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Hub (Theme, print & mobile trigger) */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-500 hover:border-zinc-300 dark:hover:border-zinc-850 transition-all cursor-pointer"
              aria-label="Toggle theme color"
              id="theme-icon-toggle"
            >
              {theme === 'dark' ? <LucideIcons.Sun size={15} /> : <LucideIcons.Moon size={15} />}
            </button>

            {/* Quick CV/Print Button */}
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-sans tracking-wide p-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <LucideIcons.Printer size={13} />
              <span>Print CV</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer"
              aria-label="Menu drawer"
            >
              {isMobileMenuOpen ? <LucideIcons.X size={15} /> : <LucideIcons.Menu size={15} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER ACCENT */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute top-auto left-0 right-0 bg-[#fcfbf9] dark:bg-[#0c0d0e] border-b border-zinc-200 dark:border-zinc-900 overflow-hidden shadow-lg"
              id="mobile-navigation-drawer"
            >
              <div className="px-5 py-4 space-y-2 flex flex-col pb-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left py-2.5 px-4 rounded-xl text-xs font-sans tracking-wide text-zinc-650 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <LucideIcons.ChevronRight size={13} className="text-zinc-400" />
                  </button>
                ))}
                
                <hr className="border-zinc-200 dark:border-zinc-900 my-2" />
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.print();
                  }}
                  className="w-full py-2.5 px-4 bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-sans text-xs tracking-wide rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <LucideIcons.Printer size={13} />
                  <span>Download / Print PDF Resume</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CORE PORTFOLIO STAGE CONTAINER */}
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-16 space-y-20 md:space-y-32 relative z-10">

        {/* 1. HERO EXECUTIVE SUMMARY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" id="hero-sec">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-left">
            {/* Executive Portrait Card */}
            <div className="relative shrink-0 group">
              {/* Premium Glow Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#d97706] to-[#f59e0b] rounded-3xl blur-md opacity-45 group-hover:opacity-75 transition duration-500" />
              {/* Image Frame */}
              <div className="relative w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-white shadow-xl">
                <img 
                  src={profilePic} 
                  alt={EXECUTIVE_HEADER.name} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                {/* Micro reflection layer for realism */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Headline and text content */}
            <div className="space-y-6 flex-1">
              {/* Visual Experience Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-mono font-medium tracking-wide text-[#d97706] dark:text-amber-400">
                  Senior Management Executive • {EXECUTIVE_HEADER.yearsOfExperience} Experience
                </span>
              </div>

              {/* Main Visual Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight leading-tight text-zinc-950 dark:text-zinc-50">
                Transforming <br />
                <span className="font-bold relative text-zinc-900 dark:text-zinc-50">
                  Automotive After-Sales
                  <span className="absolute bottom-1 left-0 w-full h-[5px] bg-amber-500/20" />
                </span>
              </h1>

              {/* Title Tag */}
              <h2 className="text-base md:text-lg font-sans tracking-wide text-zinc-700 dark:text-zinc-300 font-light max-w-xl">
                {EXECUTIVE_HEADER.title}. Currently GM of Eastern India's largest Maruti Suzuki distribution service network.
              </h2>

              {/* Brief introductory bio */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-2xl font-light">
                {EXECUTIVE_HEADER.summary}
              </p>

              {/* Dynamic CTA button groups */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => scrollToSection('contact-section')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-sans font-semibold tracking-wide rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Initiate Consultation</span>
                  <LucideIcons.ArrowRight size={14} />
                </button>

                <button
                  onClick={() => scrollToSection('stats-section')}
                  className="px-6 py-3 border border-zinc-200 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 hover:border-zinc-305 dark:hover:border-zinc-850 text-zinc-700 dark:text-zinc-300 text-xs font-sans tracking-wide rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Operational Dashboard</span>
                  <LucideIcons.LineChart size={13} className="text-amber-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Business Card Widget */}
          <div className="lg:col-span-4 flex items-center justify-center md:pb-6 lg:pb-0">
            <BusinessCard />
          </div>
        </section>

        {/* 2. SLIDING BRANDS BAR (The OEM Sponsor Showcase) */}
        <section className="py-6 border-y border-zinc-200/50 dark:border-zinc-900/40 relative overflow-hidden bg-zinc-500/5 rounded-3xl" id="brand-ticker">
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#fcfbf9] to-transparent dark:from-[#0c0d0e] pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#fcfbf9] to-transparent dark:from-[#0c0d0e] pointer-events-none z-10" />
          
          <div className="flex items-center gap-5 md:gap-10 overflow-hidden whitespace-nowrap py-1">
            <div className="flex gap-14 md:gap-24 animate-[infinite-scroll_25s_linear_infinite] whitespace-nowrap text-zinc-400 dark:text-zinc-650 text-xs md:text-sm font-mono tracking-widest font-semibold">
              <span>TOYOTA</span>
              <span>MARUTI SUZUKI</span>
              <span>MAHINDRA & MAHINDRA</span>
              <span>SAUD BAHWAN GROUP</span>
              <span>FIAT</span>
              <span>DAEWOO</span>
              <span>TATA MOTORS</span>
              <span>PREMSONS MOTOR</span>
            </div>
            {/* Mirror loop to prevent visual pop glitches */}
            <div className="flex gap-14 md:gap-24 animate-[infinite-scroll_25s_linear_infinite] whitespace-nowrap text-zinc-400 dark:text-zinc-650 text-xs md:text-sm font-mono tracking-widest font-semibold" aria-hidden="true">
              <span>TOYOTA</span>
              <span>MARUTI SUZUKI</span>
              <span>MAHINDRA & MAHINDRA</span>
              <span>SAUD BAHWAN GROUP</span>
              <span>FIAT</span>
              <span>DAEWOO</span>
              <span>TATA MOTORS</span>
              <span>PREMSONS MOTOR</span>
            </div>
          </div>
        </section>

        {/* Custom scroll support tickers CSS styles */}
        <style>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          .animate-\\[infinite-scroll_25s_linear_infinite\\] {
            animation: infinite-scroll 25s linear infinite;
          }
        `}</style>

        {/* 3. EXECUTIVE OPERATIONS GRID (STAT METRICS) */}
        <section className="scroll-mt-24 space-y-12">
          <ExecutiveStats />
          <PerformanceHighlights />
        </section>

        {/* 4. EXPERTISE & FUNCTIONAL MATRIX */}
        <section className="scroll-mt-24">
          <Competencies searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </section>

        {/* 5. CAREER PROGRESSION TIMELINE */}
        <section className="scroll-mt-24">
          <CareerTimeline searchTerm={searchTerm} />
        </section>

        {/* 6. OPERATIONS PORTFOLIO / LEADERSHIP PLAYBOOK */}
        <section className="scroll-mt-24">
          <Philosophy />
        </section>

        {/* 7. ACADEMIC CREDENTIALS & LICENSES */}
        <section className="space-y-8 scroll-mt-24" id="education-section">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#d97706] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Academics & Credentials
            </span>
            <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
              Executive <span className="font-medium text-zinc-800 dark:text-zinc-200">Qualifications</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
              Equipped with a solid blend of premier management education (IIM) and specialized automotive system engineering foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION_CREDENTIALS.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/60 dark:bg-zinc-950/45 p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-900 relative flex flex-col justify-between overflow-hidden group shadow-xs"
              >
                {/* Visual decoration mirroring certificates */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${edu.color.includes('blue') ? 'from-blue-500 to-cyan-500' : edu.color.includes('amber') ? 'from-amber-500 to-orange-500' : 'from-zinc-400 to-zinc-600'}`} />

                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-zinc-400">
                      Degree Cert.
                    </span>
                    <span className="text-[10px] font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-full">
                      {edu.badge}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base md:text-lg text-zinc-850 dark:text-zinc-50 font-display">
                    {edu.degree}
                  </h3>
                  <p className="text-[#d97706] dark:text-amber-500 text-xs font-sans font-medium mt-1">
                    {edu.institution}
                  </p>

                  <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-sans mt-4 font-light">
                    {edu.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-200/50 dark:border-zinc-900/50 flex justify-between items-center text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <LucideIcons.BookOpen size={12} className="text-amber-500" />
                    <span>Academic Verified</span>
                  </span>
                  <LucideIcons.Award size={13} className="opacity-40 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. COMMISSION INCIDENT FORM & CRM LOGS */}
        <section className="scroll-mt-24">
          <ContactSection />
        </section>

      </main>

      {/* SECURED REGIONAL COMPLIANCE FOOTER */}
      <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-900/80 mt-20 md:mt-32">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-16 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center">
                  JD
                </span>
                <h3 className="font-sans font-bold text-sm tracking-wide">
                  JOYDEEP DAS PORTFOLIO
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light max-w-sm">
                Senior management operations leader. Providing 30+ years of expertise in high-yield after-sales network growth, bodyshop logistics, and P&L governance.
              </p>
            </div>

            {/* Quick anchors */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-[#d97706] uppercase">
                Section Registry
              </h4>
              <ul className="space-y-2 text-xs">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-[#d97706] uppercase">
                Academics & Contact
              </h4>
              <ul className="space-y-2 text-xs">
                {navLinks.slice(3).map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollToSection(link.id)} className="text-zinc-500 hover:text-zinc-805 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-900" />

          {/* Copyright disclosures */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
            <div>
              © {currentYear} Joydeep Das. All rights reserved. Managed globally across India-Oman-Iraq regions.
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <LucideIcons.ShieldAlert size={12} className="text-green-500/80" />
                <span>Executive Verified Compliance</span>
              </span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Navigate to Top</span>
                <LucideIcons.ChevronDown size={12} className="rotate-180" />
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
