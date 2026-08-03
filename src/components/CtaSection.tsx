import React from 'react';
import { Upload, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaSectionProps {
  onStartPrediction?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartPrediction }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <motion.div
        whileHover={{ scale: 1.01, y: -3 }}
        transition={{ duration: 0.3 }}
        className="cta-card-white-text relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-linear-to-r from-purple-900/40 via-cyan-900/40 to-slate-900/90 border-2 border-blue-500 shadow-[0_10px_50px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_60px_rgba(37,99,235,0.55)] text-center space-y-6 transition-all duration-300 group backdrop-blur-xl"
      >

        {/* Multi-Color Animated Glow Background Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/25 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/60 text-white text-xs font-mono font-bold shadow-lg shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow" />
            <span className="text-white">Clinical AI Workflow</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Continue to the MRI Analysis Experience
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartPrediction}
            className="flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 transition-all cursor-pointer border border-blue-300/40"
          >
            <Upload className="w-4 h-4 text-white" />
            <span className="text-white">Start MRI Analysis Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};

