import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { ContactMessage } from '../types';
import { EXECUTIVE_HEADER } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Partnership Proposal',
    message: ''
  });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showCRM, setShowCRM] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load old messages from local storage
  useEffect(() => {
    const saved = localStorage.getItem('joydeep_das_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error("Failed parsing message logs", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const newMessage: ContactMessage = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Independent',
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toLocaleString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('joydeep_das_messages', JSON.stringify(updated));

    // Reset Form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: 'Partnership Proposal',
      message: ''
    });

    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  const deleteMessage = (idx: number) => {
    const updated = messages.filter((_, i) => i !== idx);
    setMessages(updated);
    localStorage.setItem('joydeep_das_messages', JSON.stringify(updated));
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem('joydeep_das_messages');
  };

  return (
    <div className="space-y-8" id="contact-section">
      <div>
        <span className="text-xs font-mono tracking-widest text-[#d97706] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Executive Portal
        </span>
        <h2 className="text-3xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
          Corporate <span className="font-medium text-zinc-800 dark:text-zinc-200">Commission & Inquiry</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-xl">
          Coordinate on national/regional dealership expansions, board consultation retainers, after-sales audits, or high-level recruitment mandates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Inquiries */}
        <div className="lg:col-span-7 bg-white/60 dark:bg-zinc-950/45 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-900 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Anurag Das"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-xl py-2.5 px-4 text-xs font-sans text-zinc-850 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-650 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-xl py-2.5 px-4 text-xs font-sans text-zinc-850 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-650 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  Organization / Manufacturer
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., Toyota India, SBG Oman"
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-xl py-2.5 px-4 text-xs font-sans text-zinc-850 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-650 focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                  Inquiry Core Type
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-xl py-2.5 px-4 text-xs font-sans text-zinc-805 dark:text-zinc-200 focus:outline-hidden transition-all"
                >
                  <option value="Partnership Proposal">Partnership Proposal</option>
                  <option value="Consul retainer">Strategy Consulting Retainer</option>
                  <option value="Auditing request">Workshop/Bodyshop Audit Action</option>
                  <option value="Recruitment Mandate">Senior Leadership Placement</option>
                  <option value="General Conversation">General Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                Operational Statement & Requirements *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Kindly type here your specific operational constraints, timeline, location, and key metrics required..."
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 rounded-xl py-2.5 px-4 text-xs font-sans text-zinc-850 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-650 focus:outline-hidden transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-sans font-semibold tracking-wide bg-amber-500 hover:bg-amber-600 text-zinc-950 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <LucideIcons.Send size={13} />
                <span>Transmit Secure Inquiry</span>
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400"
                  >
                    <LucideIcons.CheckCircle size={14} />
                    <span>Inquiry logged successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-1.5 text-xs text-red-500"
                  >
                    <LucideIcons.AlertTriangle size={14} />
                    <span>Please write operational inputs!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        {/* Right Column: Connection details and CRM Log toggle */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-zinc-100/60 dark:bg-zinc-950/20 p-6 md:p-8 rounded-3xl border border-zinc-200/55 dark:border-zinc-900/60 space-y-5">
            <h4 className="font-sans font-semibold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Communication Office
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  <LucideIcons.Phone size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    Call / WhatsApp
                  </h5>
                  <a href={`tel:${EXECUTIVE_HEADER.phone}`} className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1 hover:underline block">
                    {EXECUTIVE_HEADER.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  <LucideIcons.Mail size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    Corporate Email
                  </h5>
                  <a href={`mailto:${EXECUTIVE_HEADER.email}`} className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1 hover:underline block">
                    {EXECUTIVE_HEADER.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  <LucideIcons.MapPin size={14} />
                </div>
                <div>
                  <h5 className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    Primary Hub
                  </h5>
                  <p className="text-xs text-zinc-650 dark:text-zinc-350 font-sans mt-0.5">
                    {EXECUTIVE_HEADER.location} (Licensed to execute India & GCC wide operations)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CRM Log Control Box */}
          <div className="bg-zinc-100/30 dark:bg-zinc-950/10 p-5 rounded-2xl border border-zinc-200/65 dark:border-zinc-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div>
                <h5 className="text-xs font-sans font-medium text-zinc-800 dark:text-zinc-200">
                  Secured CRM Log
                </h5>
                <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                  LocalStorage: {messages.length} messages active
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCRM(!showCRM)}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-3 py-1.5 rounded-xl text-[10px] font-mono flex items-center gap-1.5 transition-colors self-center cursor-pointer"
            >
              <LucideIcons.NotebookTabs size={12} />
              <span>{showCRM ? 'Hide CRM' : 'Inspect CRM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CRM Interactive Dashboard Drawer */}
      <AnimatePresence>
        {showCRM && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border border-zinc-200 dark:border-zinc-900 rounded-3xl p-5 md:p-6 bg-zinc-100/50 dark:bg-zinc-950/20 backdrop-blur-md"
            id="crm-dashboard-box"
          >
            <div className="flex items-center justify-between gap-4 mb-4 border-b border-zinc-200 dark:border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <LucideIcons.Database size={15} className="text-amber-500" />
                <h4 className="text-sm font-sans font-semibold text-zinc-800 dark:text-zinc-100">
                  Local CRM Sandbox Registry
                </h4>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={clearAllMessages}
                  className="text-[10px] font-mono text-red-500 hover:text-red-400 flex items-center gap-1"
                >
                  <LucideIcons.Trash2 size={11} />
                  <span>Purge Registry</span>
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-8 text-zinc-400 dark:text-zinc-500 text-xs font-mono">
                Registry empty. Transmit a secure operational inquiry above to inspect database state.
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-850">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-900 flex justify-between items-start gap-4 relative"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center flex-wrap gap-2 text-[10px] font-mono">
                        <span className="text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                          {msg.subject}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          ID: {messages.length - index}
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500">
                          {msg.timestamp}
                        </span>
                      </div>

                      <h5 className="text-xs font-sans font-bold text-zinc-800 dark:text-zinc-250 pt-1">
                        {msg.name} ({msg.company})
                      </h5>
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block pb-1">
                        {msg.email}
                      </span>
                      <p className="text-xs text-zinc-650 dark:text-zinc-450 font-sans leading-relaxed pt-1 select-text">
                        {msg.message}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteMessage(index)}
                      className="p-1 px-1.5 rounded-lg border border-zinc-200 hover:border-red-500/30 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all self-start shrink-0 text-xs"
                      aria-label="Delete logged message"
                    >
                      <LucideIcons.Trash size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
