import React from 'react';
import { motion } from 'motion/react';
import {
  Upload, Sparkles, FileText, Clock, Moon, Activity,
  ShieldCheck, Microscope, Zap, Eye, Cpu, CheckCircle2,
  Lock, BarChart3, Database, Layers
} from 'lucide-react';
import { CtaSection } from '../components/CtaSection';

interface FeaturesProps {
  onStartPrediction?: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onStartPrediction }) => {
  const featureList = [
    {
      icon: <Upload className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      tag: "INPUT MODULE",
      title: 'Drag & Drop MRI Intake',
      desc: 'Seamless multi-format file input supporting DICOM, PNG, JPG, and JPEG with instant canvas rendering and image resolution validation.',
      glowColor: 'cyan',
      borderColor: 'border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      glowBg: 'bg-cyan-500/15 dark:bg-cyan-500/20'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tag: "CORE AI MODEL",
      title: 'PyTorch Tumor Classifier',
      desc: 'Multi-class deep convolutional model trained to detect Glioma, Meningioma, Pituitary Tumors, and Healthy Brain Tissue.',
      glowColor: 'indigo',
      borderColor: 'border-indigo-300 dark:border-indigo-500/30 hover:border-indigo-500 dark:hover:border-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      glowBg: 'bg-indigo-500/15 dark:bg-indigo-500/20'
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tag: "ANALYTICS",
      title: 'Probability Confidence Breakdown',
      desc: 'Live dynamic progress meters showcasing relative softmax likelihoods across all diagnostic classes down to 0.01% accuracy.',
      glowColor: 'emerald',
      borderColor: 'border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-500 dark:hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      glowBg: 'bg-emerald-500/15 dark:bg-emerald-500/20'
    },
    {
      icon: <Microscope className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      tag: "EXPLAINABILITY",
      title: 'Grad-CAM Attention Heatmaps',
      desc: 'Highlights critical regions of interest (ROI) inside brain tissue, giving radiologists verifiable visual proof for every AI call.',
      glowColor: 'amber',
      borderColor: 'border-amber-300 dark:border-amber-500/30 hover:border-amber-500 dark:hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
      glowBg: 'bg-amber-500/15 dark:bg-amber-500/20'
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      tag: "OUTPUT ENGINE",
      title: 'Clinical PDF Report Export',
      desc: 'Generates formal authenticated medical reports complete with hospital headers, scan metadata, doctor signatures, and PDF download.',
      glowColor: 'purple',
      borderColor: 'border-purple-300 dark:border-purple-500/30 hover:border-purple-500 dark:hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
      glowBg: 'bg-purple-500/15 dark:bg-purple-500/20'
    },
    {
      icon: <Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      tag: "PATIENT LOGS",
      title: 'Searchable Diagnostic History',
      desc: 'Centralized patient record ledger equipped with instant search, filter by tumor type, scan timestamps, and patient ID lookup.',
      glowColor: 'rose',
      borderColor: 'border-rose-300 dark:border-rose-500/30 hover:border-rose-500 dark:hover:border-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
      glowBg: 'bg-rose-500/15 dark:bg-rose-500/20'
    },
    {
      icon: <Moon className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      tag: "THEME ENGINE",
      title: 'Adaptable Light & Dark Themes',
      desc: 'Switch between crisp medical white mode for lit offices and deep dark navy mode for radiologist darkrooms with instant toggle.',
      glowColor: 'sky',
      borderColor: 'border-sky-300 dark:border-sky-500/30 hover:border-sky-500 dark:hover:border-sky-400',
      badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30',
      glowBg: 'bg-sky-500/15 dark:bg-sky-500/20'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      tag: "SECURITY",
      title: 'Privacy & Client Data Safeguards',
      desc: 'Transient processing model that keeps patient scans secure without unauthorized cloud storage, aligned with strict privacy norms.',
      glowColor: 'teal',
      borderColor: 'border-teal-300 dark:border-teal-500/30 hover:border-teal-500 dark:hover:border-teal-400',
      badgeBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
      glowBg: 'bg-teal-500/15 dark:bg-teal-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 overflow-hidden">

      {/* HERO / HEADER SECTION */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">

        {/* Floating Background Glow Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <span>Neuro-Diagnostic Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
        >
          <span className="text-purple-600 dark:text-white">Comprehensive</span> <br />
          <span className="bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-700 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
            AI Diagnostic Suite
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Engineered specifically for clinicians and radiologists, providing deep neural network analysis, explainable ROI attention maps, and instant clinical report generation.
        </motion.p>

      </div>

      {/* FEATURE CARDS GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {featureList.map((f, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -8 }}
            className={`p-6 rounded-3xl bg-white dark:bg-slate-900/90 border ${f.borderColor} transition-all duration-300 group shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-2xl relative overflow-hidden flex flex-col justify-between`}
          >
            {/* Background Glow Orb on Hover */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 ${f.glowBg} rounded-full blur-2xl group-hover:scale-175 transition-transform duration-500 pointer-events-none`} />

            <div className="space-y-4 relative z-10">

              {/* Header Badge & Icon Row */}
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  {f.icon}
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${f.badgeBg}`}>
                  {f.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>

            </div>

            {/* Bottom Status Indicator */}
            <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 relative z-10">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>Active Feature</span>
              </span>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore &rarr;
              </span>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* FEATURED PIPELINE BANNER HIGHLIGHT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-10 rounded-3xl bg-linear-to-r from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border border-sky-300 dark:border-slate-800 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-bounce" />
              <span>Real-Time Inference Speed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sub-Second Neural Prediction Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Every scan is normalized, cropped, and passed through PyTorch inference kernels in under 800 milliseconds, outputting instant multi-class probability scores directly on screen.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-md flex items-center space-x-3"
            >
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white">94.81% Val Accuracy</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Tested on 2,870 MRI Scans</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-md flex items-center space-x-3"
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white">PyTorch Native Engine</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">best_brain_tumor_model.pth</div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>


    </div>
  );
};


