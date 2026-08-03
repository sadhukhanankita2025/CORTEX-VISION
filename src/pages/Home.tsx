import React from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'framer-motion';
import { Brain3DVisualizer } from '../components/Brain3DVisualizer';
import { CtaSection } from '../components/CtaSection';
import {
  Upload, Sparkles, ArrowRight, Activity, ShieldCheck, Zap,
  FileCheck2, Cpu, Users, Layers, UserCheck, FileDown, ArrowDown,
  CheckCircle2, ArrowRightCircle, Stethoscope, Microscope
} from 'lucide-react';

interface HomeProps {
  onStartPrediction: () => void;
  onViewReport?: (prediction: any) => void;
  onNavigate?: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  onStartPrediction,
  onViewReport,
  onNavigate
}) => {
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      onStartPrediction();
    }
  };

  // Stagger container animation variant
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-20 pb-16 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Animated Background Particles & Cyber Glows */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-162.5 bg-cyan-500/20 dark:bg-cyan-500/25 rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-10 w-112.5 h-112.5 bg-indigo-500/20 dark:bg-indigo-500/25 rounded-full blur-[110px] pointer-events-none"
        />

        {/* Dark Mode Floating Cyber Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
          <motion.div
            animate={{ y: [0, -100, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/6 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          />
          <motion.div
            animate={{ y: [0, -80, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]"
          />
          <motion.div
            animate={{ y: [0, -120, 0], opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"
          />
        </div>

        {/* Floating Decorative Medical Icons in Hero Background */}
        <motion.div
          animate={{ y: [-12, 12, -12], rotate: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-10 hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 dark:border-cyan-400/40 backdrop-blur-md text-cyan-600 dark:text-cyan-300 pointer-events-none shadow-lg dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Microscope className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{ y: [12, -12, 12], rotate: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 right-12 hidden xl:flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-400/40 backdrop-blur-md text-indigo-600 dark:text-indigo-300 pointer-events-none shadow-lg dark:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          <Stethoscope className="w-6 h-6" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >

              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-medium shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                <span>Next-Gen Edge AI Medical Intelligence</span>
              </motion.div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                <span className="text-sky-500 dark:text-white">AI-Powered</span>{" "}
                <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-cyan-600 via-blue-700 to-indigo-800 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                  Brain Tumor Detection
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Upload MRI scans and receive AI-assisted predictions with downloadable reports. Powered by deep neural networks with real-time explainability maps.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartPrediction}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload MRI</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartPrediction}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-blue-500 dark:border-slate-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-cyan-400" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNav('about')}
                  className="flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer text-sm font-medium"
                >
                  <span>Learn More</span>
                </motion.button>
              </div>

              {/* Tech Badges Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="pt-6 border-t border-slate-300/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400 font-mono"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <span>94.81% Model Accuracy</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Sub-Second Inference</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
                  <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>best_brain_tumor_model.pth</span>
                </motion.div>
              </motion.div>

            </motion.div>

            {/* Right Side Animated Visual Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center"
            >
              <Brain3DVisualizer />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SYSTEM WORKFLOW ARCHITECTURE SECTION */}
      {/* SYSTEM WORKFLOW ARCHITECTURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-blue-50/90 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 shadow-xl space-y-10 relative overflow-hidden"
        >

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span>Step-by-Step Clinical Pipeline</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-white tracking-tight">
              AI Diagnostic Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Seamless end-to-end processing from MRI scan upload to instant prediction &amp; report download.
            </p>
          </div>

          {/* VERTICAL DIAGRAM FLOW CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto p-6 rounded-3xl bg-sky-100/80 dark:bg-slate-950 border border-sky-300 dark:border-cyan-500/40 glow-cyan font-sans text-xs shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-center pb-3 border-b border-sky-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 font-bold tracking-wider uppercase flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span>VERTICAL DIAGRAM FLOW CARD</span>
            </div>

            <div className="flex flex-col items-center space-y-2 relative z-10">

              {/* Node 1 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                className="w-full max-w-md p-4 rounded-xl bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-500/50 text-slate-900 dark:text-white shadow-md transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2.5 font-bold text-sm text-slate-900 dark:text-white">
                    <Upload className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-125 transition-transform shrink-0" />
                    <span>Upload MRI</span>
                  </span>
                  <span className="text-[10px] text-cyan-700 dark:text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded font-mono font-bold border border-cyan-500/30">01</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  Drag &amp; drop brain MRI scans (PNG, JPG, JPEG) or select sample scans.
                </p>
              </motion.div>

              {/* Arrow */}
              <div className="text-cyan-600 dark:text-cyan-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 2 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                className="w-full max-w-md p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/50 text-slate-900 dark:text-white shadow-md transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2.5 font-bold text-sm text-slate-900 dark:text-white">
                    <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-125 transition-transform shrink-0" />
                    <span>Fill Patient Details</span>
                  </span>
                  <span className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold border border-indigo-500/30">02</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  Enter patient ID, practitioner name, hospital center, and clinical notes.
                </p>
              </motion.div>

              {/* Arrow */}
              <div className="text-indigo-600 dark:text-indigo-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 3 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                className="w-full max-w-md p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-500/50 text-slate-900 dark:text-white shadow-md transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2.5 font-bold text-sm text-slate-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-125 transition-transform shrink-0" />
                    <span>shows Prediction</span>
                  </span>
                  <span className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded font-mono font-bold border border-purple-500/30">03</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  Instant PyTorch model inference output showing tumor type and confidence score.
                </p>
              </motion.div>

              {/* Arrow */}
              <div className="text-purple-600 dark:text-purple-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 4 */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                className="w-full max-w-md p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/50 text-slate-900 dark:text-white shadow-md transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2.5 font-bold text-sm text-slate-900 dark:text-white">
                    <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-125 transition-transform shrink-0" />
                    <span>User downloads Report</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">04</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  Generate and export printable HIPAA-compliant PDF medical diagnostic report.
                </p>
              </motion.div>

            </div>

            <div className="pt-3 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStartPrediction}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Launch Interactive Pipeline</span>
                <ArrowRightCircle className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>

        </motion.div>
      </section>

      {/* ABOUT SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span>Diagnostic Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-white tracking-tight">
            Advanced Clinical AI Core Features
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Engineered with deep learning architectures to assist neuro-radiologists with fast, explainable brain MRI insights.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-cyan-500/50 glow-cyan-hover transition-all duration-300 group shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 w-fit mb-4 group-hover:scale-125 group-hover:rotate-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-cyan-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">Deep Learning Core</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Trained on multi-institutional MRI datasets utilizing EfficientNetB0 and 3D ResNet architectures for multi-class tumor classification.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-indigo-500/50 glow-indigo-hover transition-all duration-300 group shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 w-fit mb-4 group-hover:scale-125 group-hover:-rotate-6 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-indigo-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">MRI Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Supports T1-weighted, T2-weighted, FLAIR, and DICOM formats with automated skull stripping and contrast normalizations.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-amber-500/50 glow-amber-hover transition-all duration-300 group shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 w-fit mb-4 group-hover:scale-125 group-hover:rotate-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-amber-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">Fast Prediction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-second inference speeds (0.82s avg) enabling real-time clinical triage and rapid emergency room decision support.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-emerald-500/50 glow-emerald-hover transition-all duration-300 group shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit mb-4 group-hover:scale-125 group-hover:-rotate-6 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-md shadow-emerald-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">Secure Reports</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated PDF generation with patient demographics, Grad-CAM heatmaps, AI recommendations, and printable medical layouts.
            </p>
          </motion.div>

        </motion.div>
      </section>

      {/* CTA SECTION */}
      <CtaSection onStartPrediction={onStartPrediction} />

    </div >
  );
};
