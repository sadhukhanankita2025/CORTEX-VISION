import React from 'react';
import { motion } from 'motion/react';
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/20 dark:bg-cyan-500/25 rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-500/20 dark:bg-indigo-500/25 rounded-full blur-[110px] pointer-events-none"
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

          {/* HORIZONTAL WORKFLOW STEPS (DESKTOP) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden lg:grid grid-cols-4 gap-6 relative"
          >

            {/* Step 1: Upload MRI */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-cyan-300 dark:border-cyan-500/40 glow-cyan glow-cyan-hover transition-all duration-300 space-y-3 group text-center relative z-10 overflow-hidden shadow-md dark:shadow-none"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-lg shadow-cyan-500/20">
                <Upload className="w-7 h-7" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                STEP 01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Upload MRI</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Drag &amp; drop brain MRI scans (PNG, JPG, JPEG) or select sample scans.
              </p>
            </motion.div>

            {/* Step 2: Fill Patient Details */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-indigo-300 dark:border-indigo-500/40 glow-indigo glow-indigo-hover transition-all duration-300 space-y-3 group text-center relative z-10 overflow-hidden shadow-md dark:shadow-none"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all shadow-lg shadow-indigo-500/20">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/30">
                STEP 02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Fill Patient Details</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter patient ID, practitioner name, hospital center, and clinical notes.
              </p>
            </motion.div>

            {/* Step 3: shows Prediction */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-purple-300 dark:border-purple-500/40 glow-purple glow-purple-hover transition-all duration-300 space-y-3 group text-center relative z-10 overflow-hidden shadow-md dark:shadow-none"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all shadow-lg shadow-purple-500/20">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold border border-purple-500/30">
                STEP 03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">shows Prediction</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Instant PyTorch model inference output showing tumor type and confidence score.
              </p>
            </motion.div>

            {/* Step 4: User downloads Report */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/40 glow-emerald glow-emerald-hover transition-all duration-300 space-y-3 group text-center relative z-10 overflow-hidden shadow-md dark:shadow-none"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-lg shadow-emerald-500/20">
                <FileDown className="w-7 h-7" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                STEP 04
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">User downloads Report</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate and export printable HIPAA-compliant PDF medical diagnostic report.
              </p>
            </motion.div>

          </motion.div>

          {/* VERTICAL DIAGRAM FLOW CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto p-6 rounded-3xl bg-sky-100/80 dark:bg-slate-950 border border-sky-300 dark:border-cyan-500/40 glow-cyan font-mono text-xs shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-center pb-3 border-b border-sky-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 font-bold tracking-wider uppercase flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span>Clinical Pipeline Diagram</span>
            </div>

            <div className="flex flex-col items-center space-y-2 relative z-10">

              {/* Node 1 */}
              <motion.div
                whileHover={{ scale: 1.04, x: 3 }}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-500/50 text-slate-900 dark:text-white font-bold flex items-center justify-between shadow-md transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-125 transition-transform" />
                  <span>Upload MRI</span>
                </span>
                <span className="text-[10px] text-cyan-700 dark:text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded font-bold border border-cyan-500/30">01</span>
              </motion.div>

              {/* Arrow */}
              <div className="text-cyan-600 dark:text-cyan-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 2 */}
              <motion.div
                whileHover={{ scale: 1.04, x: 3 }}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/50 text-slate-900 dark:text-white font-bold flex items-center justify-between shadow-md transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-125 transition-transform" />
                  <span>Fill Patient Details</span>
                </span>
                <span className="text-[10px] text-indigo-700 dark:text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded font-bold border border-indigo-500/30">02</span>
              </motion.div>

              {/* Arrow */}
              <div className="text-indigo-600 dark:text-indigo-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 3 */}
              <motion.div
                whileHover={{ scale: 1.04, x: 3 }}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-500/50 text-slate-900 dark:text-white font-bold flex items-center justify-between shadow-md transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-125 transition-transform" />
                  <span>shows Prediction</span>
                </span>
                <span className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded font-bold border border-purple-500/30">03</span>
              </motion.div>

              {/* Arrow */}
              <div className="text-purple-600 dark:text-purple-400 flex flex-col items-center py-1 animate-bounce">
                <span className="text-xs font-bold">│</span>
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Node 4 */}
              <motion.div
                whileHover={{ scale: 1.04, x: 3 }}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/50 text-slate-900 dark:text-white font-bold flex items-center justify-between shadow-md transition-all cursor-pointer group"
              >
                <span className="flex items-center space-x-2">
                  <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-125 transition-transform" />
                  <span>User downloads Report</span>
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded font-bold border border-emerald-500/30">04</span>
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

      {/* STATISTICS SECTION - REDESIGNED MODERN CLINICAL IMPACT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-blue-50/90 dark:bg-slate-950/90 border border-blue-200 dark:border-slate-800 shadow-[0_20px_60px_rgba(6,182,212,0.12)] backdrop-blur-2xl relative overflow-hidden space-y-8"
        >

          {/* Subtle Ambient Background Glowing Lights */}
          <div className="absolute -top-24 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-purple-500" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-blue-200/80 dark:border-slate-800/80 relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-ping" />
                <span>REAL-TIME PLATFORM TELEMETRY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-white tracking-tight">
                Clinical Impact &amp; Performance
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md font-sans leading-relaxed">
              Real-time analytics aggregated across clinical partner institutions and edge deployment inference nodes.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >

            {/* 1. Patients Analysed */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -6 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950/90 border border-sky-300 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400 shadow-xl hover:shadow-[0_15px_35px_rgba(6,182,212,0.25)] transition-all duration-300 group relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/10">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                  ↑ +24% YoY
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  12,450+
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1 group-hover:text-cyan-800 dark:group-hover:text-cyan-200 transition-colors">
                  Patients Analysed
                </div>
              </div>

              {/* Progress bar indicator */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Capacity Utilized</span>
                  <span className="text-cyan-400 font-bold">88%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "88%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-linear-to-r from-cyan-500 to-indigo-500 rounded-full group-hover:brightness-125 transition-all"
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                <span>Multi-center cohort verified</span>
              </div>
            </motion.div>

            {/* 2. Predictions Run */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -6 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950/90 border border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400 shadow-xl hover:shadow-[0_15px_35px_rgba(99,102,241,0.25)] transition-all duration-300 group relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-indigo-500/10">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                  Sub-Second
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  18,920+
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1 group-hover:text-indigo-800 dark:group-hover:text-indigo-200 transition-colors">
                  Predictions Run
                </div>
              </div>

              {/* Progress bar indicator */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Inference Throughput</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">95.4%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full group-hover:brightness-125 transition-all"
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono pt-1 flex items-center space-x-1">
                <Zap className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>0.82s avg response latency</span>
              </div>
            </motion.div>

            {/* 3. Reports Generated */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -6 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950/90 border border-purple-200 dark:border-purple-500/30 hover:border-purple-400 shadow-xl hover:shadow-[0_15px_35px_rgba(168,85,247,0.25)] transition-all duration-300 group relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-purple-500/10">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  PDF &amp; Print
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  14,300+
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors">
                  Reports Generated
                </div>
              </div>

              {/* Progress bar indicator */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Export Compliance</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full group-hover:brightness-125 transition-all"
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono pt-1 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                <span>HIPAA anonymization ready</span>
              </div>
            </motion.div>

            {/* 4. Model Accuracy */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -6 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950/90 border border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 shadow-xl hover:shadow-[0_15px_35px_rgba(16,185,129,0.25)] transition-all duration-300 group relative overflow-hidden space-y-4"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  PyTorch ResNet
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  94.81%
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors">
                  Model Accuracy
                </div>
              </div>

              {/* Progress bar indicator */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Validation Benchmark</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">94.8%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "94.8%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full group-hover:brightness-125 transition-all"
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono pt-1 flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>15,000+ MRI slices trained</span>
              </div>
            </motion.div>

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

    </div>
  );
};
