import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { EXECUTIVE_HEADER } from '../data';

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 flex flex-col items-center" id="business-card-section">
      <div className="text-center max-w-sm mb-2">
        <span className="text-xs font-mono tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Executive Networking
        </span>
        <h3 className="text-2xl font-sans tracking-tight font-light mt-3 text-zinc-900 dark:text-zinc-50">
          Digital <span className="font-semibold text-zinc-800 dark:text-zinc-200">Business Card</span>
        </h3>
        <p className="text-zinc-500 dark:text-zinc-450 text-xs mt-1.5 leading-relaxed">
          Hover to tilt, click to flip. Easily scan the credentials, dial directly, or print a hard-copy.
        </p>
      </div>

      {/* 3D Flip Card Container */}
      <div className="w-full max-w-md h-64 relative group [perspective:1200px]" id="flip-card-box">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          {/* FRONT SIDE (Executive Info) */}
          <div className="absolute inset-0 w-full h-full p-6 md:p-8 rounded-3xl [backface-visibility:hidden] bg-radial from-zinc-800 to-zinc-950 dark:from-zinc-900 dark:to-black text-white border border-zinc-800/80 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Visual design patterns on the card */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-linear-to-l from-amber-500/10 to-transparent pointer-events-none" />
            <div className="absolute right-6 top-6 opacity-20">
              <LucideIcons.Tv size={35} className="text-amber-500" />
            </div>

            {/* Header section of card */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-semibold">
                  AUTOMOTIVE LEADER
                </span>
                <h4 className="text-xl md:text-2xl font-sans font-bold tracking-tight mt-1 text-zinc-50">
                  {EXECUTIVE_HEADER.name}
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-snug max-w-[280px]">
                  {EXECUTIVE_HEADER.title}
                </p>
              </div>

              {/* Logo / Initials Badge */}
              <span className="w-12 h-12 bg-zinc-800 border border-zinc-700/60 rounded-2xl flex items-center justify-center font-mono font-bold text-lg text-amber-500/95 shadow-inner">
                {EXECUTIVE_HEADER.initials}
              </span>
            </div>

            {/* Footer section of card */}
            <div className="flex justify-between items-end">
              <div className="space-y-1 text-xs text-zinc-400 font-sans">
                <div className="flex items-center gap-2">
                  <LucideIcons.Mail size={12} className="text-amber-500 shrink-0" />
                  <span>{EXECUTIVE_HEADER.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.Phone size={12} className="text-amber-500 shrink-0" />
                  <span>{EXECUTIVE_HEADER.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.MapPin size={12} className="text-amber-500 shrink-0" />
                  <span>{EXECUTIVE_HEADER.location}</span>
                </div>
              </div>

              {/* Flip Button Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="bg-zinc-800/80 hover:bg-zinc-700 hover:text-amber-500 text-zinc-400 px-3 py-1.5 rounded-xl border border-zinc-700 text-[10px] font-mono flex items-center gap-1 transition-all"
              >
                <span>Flip Card</span>
                <LucideIcons.RotateCcw size={10} />
              </button>
            </div>
          </div>

          {/* BACK SIDE (Scan QR & Action) */}
          <div className="absolute inset-0 w-full h-full p-6 md:p-8 rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-linear-to-b from-zinc-900 to-black text-white border border-zinc-805 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Soft backdrop decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_55%)] pointer-events-none" />

            {/* Content layout */}
            <div className="flex items-center gap-6 my-auto">
              {/* Simulated Premium high-contrast QR code as an elegant scalable SVG */}
              <div className="p-2.5 bg-white rounded-2xl border border-zinc-700/60 shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-350 bg-white">
                <svg className="w-24 h-24 text-zinc-950" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer Frame Anchors */}
                  <rect x="5" y="5" width="25" height="25" fill="#18181b" />
                  <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
                  <rect x="13" y="13" width="9" height="9" fill="#d97706" />

                  <rect x="70" y="5" width="25" height="25" fill="#18181b" />
                  <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
                  <rect x="78" y="13" width="9" height="9" fill="#18181b" />

                  <rect x="5" y="70" width="25" height="25" fill="#18181b" />
                  <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
                  <rect x="13" y="78" width="9" height="9" fill="#18181b" />

                  {/* Dynamic internal maze patterns simulating credentials payload */}
                  <rect x="35" y="5" width="10" height="5" />
                  <rect x="35" y="15" width="5" height="15" fill="#d97706" />
                  <rect x="50" y="10" width="15" height="5" />
                  <rect x="55" y="20" width="10" height="10" />
                  
                  <rect x="5" y="35" width="15" height="5" />
                  <rect x="25" y="35" width="20" height="5" />
                  <rect x="55" y="35" width="5" height="15" />
                  
                  <rect x="35" y="50" width="10" height="5" fill="#d97706" />
                  <rect x="15" y="55" width="10" height="10" />
                  <rect x="35" y="60" width="15" height="5" />

                  <rect x="50" y="50" width="30" height="5" />
                  <rect x="55" y="60" width="5" height="15" />
                  <rect x="70" y="60" width="15" height="5" fill="#d97706" />

                  <rect x="35" y="75" width="5" height="20" />
                  <rect x="50" y="75" width="15" height="5" />
                  <rect x="55" y="85" width="20" height="10" />
                  <rect x="85" y="75" width="10" height="10" />
                </svg>
              </div>

              {/* Backside Metadata and QR Explainer */}
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-semibold">
                  SCAN FOR INTERACTIVE PORTFOLIO
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Joydeep Das's active inbox: <br />
                  <span className="font-mono text-zinc-100 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-705 text-[11px] block mt-1 w-fit select-all">
                    {EXECUTIVE_HEADER.email}
                  </span>
                </p>
                <div className="text-[11px] text-zinc-400 font-sans flex items-center gap-1 pt-1">
                  <LucideIcons.Globe size={11} className="text-amber-500 shrink-0" />
                  <span>Licensed India/GCC Operations</span>
                </div>
              </div>
            </div>

            {/* Backside actions */}
            <div className="flex justify-between items-center border-t border-zinc-800 pt-3">
              <span className="text-[10px] font-mono text-zinc-500">
                Created: Chennai, India (2026)
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-350 hover:text-amber-500 px-3 py-1.5 rounded-xl border border-zinc-705 text-[10px] font-mono flex items-center gap-1 transition-all"
              >
                <span>Back to Front</span>
                <LucideIcons.ArrowLeft size={10} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Networking Action Controls */}
      <div className="flex flex-wrap gap-2.5 justify-center mt-3">
        <button
          onClick={() => handleCopy(EXECUTIVE_HEADER.email, "Email")}
          className="bg-white/80 dark:bg-zinc-950/80 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-xl text-xs font-sans tracking-wide border border-zinc-200 dark:border-zinc-900 shadow-xs flex items-center gap-2 transition-all"
        >
          <LucideIcons.Mail size={13} className="text-amber-500" />
          <span>{copiedText === "Email" ? "Copied!" : "Copy Email"}</span>
        </button>

        <button
          onClick={() => handleCopy(EXECUTIVE_HEADER.phone, "Phone")}
          className="bg-white/80 dark:bg-zinc-950/80 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-xl text-xs font-sans tracking-wide border border-zinc-200 dark:border-zinc-900 shadow-xs flex items-center gap-2 transition-all"
        >
          <LucideIcons.Phone size={13} className="text-amber-500" />
          <span>{copiedText === "Phone" ? "Copied!" : "Copy Phone"}</span>
        </button>

        <button
          onClick={handlePrint}
          className="bg-white/80 dark:bg-zinc-950/80 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-xl text-xs font-sans tracking-wide border border-zinc-200 dark:border-zinc-900 shadow-xs flex items-center gap-2 transition-all"
        >
          <LucideIcons.Printer size={13} className="text-zinc-500" />
          <span>Print Credentials</span>
        </button>
      </div>

      {/* Toast Alert Feedback */}
      {copiedText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 px-4 py-2 rounded-full text-xs font-sans tracking-wide shadow-md flex items-center gap-2 fixed bottom-6 z-50 border border-zinc-800"
        >
          <LucideIcons.CheckCircle size={14} className="text-amber-500" />
          <span>{copiedText} captured to your clipboard!</span>
        </motion.div>
      )}
    </div>
  );
}
