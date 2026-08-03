import React from 'react';
import { Cpu, Layers, Zap, FileCheck2, Stethoscope, Microchip, CheckCircle2, Upload, ArrowRight, UserCheck, Sparkles, FileDown, ArrowDown, ArrowRightCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CtaSection } from '../components/CtaSection';

interface AboutProps {
  onStartPrediction?: () => void;
}

export const About: React.FC<AboutProps> = ({ onStartPrediction }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold">
          <Stethoscope className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <span>About Cortex Vision</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="text-blue-600 dark:text-blue-400">Explainable</span>{" "}
          <span className="text-sky-500 dark:text-sky-400">AI</span>{" "}
          <span className="text-blue-600 dark:text-blue-400">Platform</span>{" "}
          <span className="text-sky-500 dark:text-sky-400">for</span>{" "}
          <span className="text-blue-600 dark:text-cyan-400">Neuro-Oncology</span>
        </motion.h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Cortex Vision is designed to bridge cutting-edge deep learning vision models with everyday medical diagnostic workflows, providing radiologists with high-accuracy, explainable predictions.
        </p>
      </div>

      {/* 4 Core Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-cyan-500/50 glow-cyan-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] space-y-4 group shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 w-fit group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
            <Cpu className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">1. Deep Learning Architecture</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Our underlying PyTorch model <code className="text-cyan-700 dark:text-cyan-300 font-mono font-bold">best_brain_tumor_model.pth</code> utilizes deep convolutional feature extractors combined with attention gates. It classifies MRI scans into four distinct diagnostic buckets: Glioma, Meningioma, Pituitary Tumor, and No Tumor (Normal).
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Multi-Class Softmax Probability Distribution</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>94.81% Cross-Validated Test Accuracy</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-indigo-500/50 glow-indigo-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] space-y-4 group shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 w-fit group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all duration-300">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">2. Multi-Modal MRI Preprocessing</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Raw MRI scans undergo automatic skull stripping, spatial normalization (224x224 input resolution), z-score intensity scaling, and noise filtering before feeding into the tensor pipeline.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Supports PNG, JPG, JPEG, &amp; DICOM Files</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>T1-Weighted Contrast Enhanced Processing</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-amber-500/50 glow-amber-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] space-y-4 group shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 w-fit group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">3. Rapid Edge Inference</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered for edge deployment inside hospital networks or local workstations using ONNX/PyTorch GPU acceleration.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Average 0.82 seconds execution time per scan</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Zero cloud latency when executed locally</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 hover:border-emerald-500/50 glow-emerald-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] space-y-4 group shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
            <FileCheck2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">4. Comprehensive Diagnostic Reports</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Generates standardized clinical reports complete with patient history, confidence metrics, Grad-CAM heatmap visualizations, and actionable treatment recommendations.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Exportable to Printable PDF</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>HIPAA Compliant Data Architecture</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Clinical Pipeline Horizontal Workflow Card */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
        className="pipeline-card-text max-w-6xl mx-auto p-6 sm:p-8 rounded-3xl bg-sky-50/90 dark:bg-slate-950 border-2 border-blue-300 dark:border-blue-500/40 glow-blue text-xs shadow-2xl space-y-8 relative overflow-hidden my-10"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 border-b border-blue-200 dark:border-slate-800/80 pb-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-cyan-800 dark:text-cyan-300 font-mono font-bold text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300 animate-spin-slow" />
            <span>Clinical Workflow</span>
          </div>
          <motion.h3
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600 dark:text-cyan-300"
          >
            End-to-End AI Diagnostic Workflow
          </motion.h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            From raw MRI scan intake to authenticated clinical PDF report export in 4 automated stages.
          </p>
        </div>

        {/* 4-Step Horizontal Pipeline Grid with Connected Line */}
        <div className="relative">
          {/* Desktop Connecting Wire */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-50 z-0 rounded-full blur-[0.5px]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">

            {/* Step 01 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              whileTap={{ scale: 0.96 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-sky-300 dark:border-cyan-500/40 shadow-xl hover:border-cyan-400 hover:shadow-[0_15px_30px_rgba(6,182,212,0.25)] transition-all space-y-3 group cursor-pointer relative overflow-hidden backdrop-blur-xl"
              onClick={onStartPrediction}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-600 dark:text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500 transition-all group-hover:text-slate-950 shadow-md shadow-cyan-500/10">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="step-number text-xs font-mono font-black text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-500/40 shadow-sm">
                  01
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  Upload MRI
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Select DICOM / PNG brain MRI scan or test with sample dataset.
                </p>
              </div>
            </motion.div>

            {/* Step 02 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              whileTap={{ scale: 0.96 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-indigo-200 dark:border-indigo-500/40 shadow-xl hover:border-indigo-400 hover:shadow-[0_15px_30px_rgba(99,102,241,0.25)] transition-all space-y-3 group cursor-pointer relative overflow-hidden backdrop-blur-xl"
              onClick={onStartPrediction}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 group-hover:scale-110 group-hover:bg-indigo-500 transition-all group-hover:text-slate-950 shadow-md shadow-indigo-500/10">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="step-number text-xs font-mono font-black text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-300 dark:border-indigo-500/40 shadow-sm">
                  02
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  Fill Patient Details
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Input patient code, age, gender, and clinical medical history.
                </p>
              </div>
            </motion.div>

            {/* Step 03 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.0,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              whileTap={{ scale: 0.96 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-200 dark:border-purple-500/40 shadow-xl hover:border-purple-400 hover:shadow-[0_15px_30px_rgba(168,85,247,0.25)] transition-all space-y-3 group cursor-pointer relative overflow-hidden backdrop-blur-xl"
              onClick={onStartPrediction}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 transition-all group-hover:text-slate-950 shadow-md shadow-purple-500/10">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="step-number text-xs font-mono font-black text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-1 rounded-full border border-purple-300 dark:border-purple-500/40 shadow-sm">
                  03
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  shows Prediction
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  PyTorch model computes probability score &amp; Grad-CAM heatmap overlay.
                </p>
              </div>
            </motion.div>

            {/* Step 04 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.5,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 350, damping: 16 }
              }}
              whileTap={{ scale: 0.96 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-500/40 shadow-xl hover:border-emerald-400 hover:shadow-[0_15px_30px_rgba(16,185,129,0.25)] transition-all space-y-3 group cursor-pointer relative overflow-hidden backdrop-blur-xl"
              onClick={onStartPrediction}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-600 dark:text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-500 transition-all group-hover:text-slate-950 shadow-md shadow-emerald-500/10">
                  <FileDown className="w-5 h-5" />
                </div>
                <span className="step-number text-xs font-mono font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/40 shadow-sm">
                  04
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  User downloads Report
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Generates downloadable radiologist assessment report in PDF format.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Action Callout */}
        <div className="pt-2 text-center max-w-sm mx-auto">
          <button
            onClick={onStartPrediction}
            className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center space-x-2.5 shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 border border-blue-300/30"
          >
            <span className="text-white">Launch Interactive Pipeline</span>
            <ArrowRightCircle className="w-4 h-4 text-white" />
          </button>
        </div>

      </motion.div>



    </div>
  );
};

