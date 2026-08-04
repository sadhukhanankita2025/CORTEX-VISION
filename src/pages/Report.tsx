import React, { useState } from 'react';
import {
  Printer, Download, Share2, PlusCircle, Brain, Shield, FileCheck,
  CheckCircle2, AlertTriangle, Building2, User, Calendar, Cpu, ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { PredictionResult } from '../types';
import { reportService } from '../services/reportService';
import { MOCK_PREDICTIONS } from '../data/mockData';
import cortexLogo from '../assets/cortex-logo-clean.png';

interface ReportProps {
  prediction?: PredictionResult | null;
  onNewPrediction?: () => void;
  onBackToHistory?: () => void;
}

export const Report: React.FC<ReportProps> = ({ prediction, onNewPrediction, onBackToHistory }) => {
  const activePrediction = prediction || MOCK_PREDICTIONS[0];
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const reportDate = activePrediction?.examinationDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const reportModel = 'EfficientNetB0';
  const predictedClass = activePrediction?.predictionClass || 'No Tumor';
  const severity = activePrediction?.severity || 'None';
  const confidencePercent = `${Math.round(activePrediction?.confidence ?? 0)}%`;
  const inferenceTime = activePrediction?.inferenceTime || '0.25 sec';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      if (activePrediction) {
        await reportService.generatePdfReport(activePrediction);
      }
      window.print(); // Fallback print to PDF dialog
    } catch (err) {
      console.error('Report error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative"
    >
      <style>{`
        @page {
          size: A4;
          margin: 10mm;
        }

        @media print {
          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .print-report-card {
            display: block !important;
          }

          .report-screen-shell {
            display: none !important;
          }
        }
      `}</style>
      {/* Background ambient glow blob */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-linear-to-r from-purple-500/20 via-cyan-500/20 to-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Top Controls Bar (hidden during printing) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-cyan-500/30 shadow-lg shadow-cyan-500/5 transition-all duration-300 print:hidden">
        <button
          onClick={onBackToHistory}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Records</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Preparing PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onNewPrediction}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE REPORT CONTAINER (White / High Contrast Medical Page) */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="report-screen-shell p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-purple-500/40 text-slate-900 dark:text-slate-100 shadow-xl space-y-8 transition-all duration-500 print:bg-white print:text-slate-900 print:shadow-none print:border-none print:p-0"
      >

        {/* REPORT HEADER */}
        <div className="pb-6 border-b-2 border-slate-200 dark:border-slate-700/80 print:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <img
              src={cortexLogo}
              alt="CORTEX VISION - Neuro-Imaging AI"
              className="h-12 sm:h-14 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight font-sans leading-none">
                  <span className="text-slate-900 dark:text-white print:text-slate-900">CORTEX</span>{" "}
                  <span className="text-cyan-600 dark:text-cyan-400 print:text-cyan-700">VISION</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-500 font-mono font-medium">| {activePrediction?.hospital}</span>
              </div>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 print:text-cyan-700 font-mono font-bold tracking-wide mt-1">
                Brain Tumor AI Diagnostic Report
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-600 space-y-1">
            <p><strong className="text-slate-900 dark:text-white print:text-slate-900">Report ID:</strong> {activePrediction?.id}</p>
            <p><strong>Date:</strong> {activePrediction?.examinationDate}</p>
            <p><strong>Model:</strong> {activePrediction?.modelUsed}</p>
          </div>
        </div>

        {/* PATIENT INFORMATION GRID CARD */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 print:bg-slate-100 border border-blue-100 dark:border-slate-800 hover:border-cyan-500/30 print:border-slate-300 space-y-3 shadow-inner transition-colors duration-300"
        >
          <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-700 dark:text-cyan-400 print:text-cyan-800 border-b border-slate-200 dark:border-slate-800 print:border-slate-300 pb-2 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span>Patient &amp; Clinical Metadata</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 print:text-slate-500 text-[10px] block font-mono">PATIENT NAME</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-slate-900">{activePrediction?.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-500 text-[10px] block font-mono">PATIENT ID</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 print:text-slate-800">{activePrediction?.patientId}</span>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-500 text-[10px] block font-mono">AGE / GENDER</span>
              <span className="text-slate-700 dark:text-slate-300 print:text-slate-800">{activePrediction?.age} Yrs / {activePrediction?.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-500 text-[10px] block font-mono">ATTENDING DOCTOR</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-slate-900">{activePrediction?.doctor}</span>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">
            <strong className="text-slate-900 dark:text-slate-300 print:text-slate-900 font-mono">Reported Symptoms:</strong> {activePrediction?.symptoms}
          </div>
        </motion.div>

        {/* PREDICTION RESULT & SCAN PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* MRI Image Scan Box */}
          <div className="md:col-span-5 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-56 h-56 rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-black shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              <img src={activePrediction?.mriImageUrl} alt="MRI Brain Scan" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 text-center border border-cyan-500/30">
                T1-Weighted MRI Scan • Grad-CAM Active
              </div>
            </motion.div>
          </div>

          {/* AI Result Box */}
          <div className="md:col-span-7 space-y-4">

            <motion.div
              animate={{
                boxShadow: activePrediction?.tumorDetected
                  ? ['0 0 20px rgba(244,63,94,0.15)', '0 0 35px rgba(244,63,94,0.35)', '0 0 20px rgba(244,63,94,0.15)']
                  : ['0 0 20px rgba(16,185,129,0.15)', '0 0 35px rgba(16,185,129,0.35)', '0 0 20px rgba(16,185,129,0.15)']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${activePrediction?.tumorDetected
                ? 'bg-rose-500/10 border-rose-500/50 text-rose-800 dark:text-rose-300 print:bg-rose-50 print:border-rose-300 print:text-rose-900'
                : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-300 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-900'
                }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                {activePrediction?.tumorDetected ? (
                  <AlertTriangle className="w-6 h-6 text-rose-500 dark:text-rose-400 animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                )}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">DIAGNOSTIC PREDICTION</span>
                  <h3 className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white print:text-slate-900">
                    {activePrediction?.predictionClass} {activePrediction?.tumorDetected ? 'DETECTED' : 'NO TUMOR DETECTED'}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed">
                {activePrediction?.aiSummary}
              </p>
            </motion.div>

            {/* Metrics Grid Cards */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 print:bg-slate-100 border border-blue-100 dark:border-slate-800 hover:border-cyan-400/50 print:border-slate-300 shadow-md transition-all">
                <span className="text-slate-500 text-[10px] block">CONFIDENCE</span>
                <span className="text-cyan-700 dark:text-cyan-400 print:text-cyan-800 font-extrabold text-base">{activePrediction?.confidence}%</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 print:bg-slate-100 border border-blue-100 dark:border-slate-800 hover:border-indigo-400/50 print:border-slate-300 shadow-md transition-all">
                <span className="text-slate-500 text-[10px] block">INFERENCE TIME</span>
                <span className="text-slate-900 dark:text-white print:text-slate-900 font-bold text-sm">{activePrediction?.inferenceTime}</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 print:bg-slate-100 border border-blue-100 dark:border-slate-800 hover:border-amber-400/50 print:border-slate-300 shadow-md transition-all">
                <span className="text-slate-500 text-[10px] block">SEVERITY</span>
                <span className="text-amber-700 dark:text-amber-400 print:text-amber-800 font-bold text-sm">{activePrediction?.severity}</span>
              </motion.div>
            </div>

          </div>

        </div>

        {/* AI RECOMMENDATIONS CARD */}
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 print:bg-slate-100 border border-blue-100 dark:border-slate-800 hover:border-indigo-500/30 print:border-slate-300 space-y-3 transition-colors duration-300"
        >
          <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-700 dark:text-cyan-400 print:text-cyan-800 border-b border-slate-200 dark:border-slate-800 print:border-slate-300 pb-2 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
            <span>Suggested Clinical Recommendations</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 print:text-slate-800">
            {activePrediction?.recommendations?.map((rec, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* SIGNATURE & DISCLAIMER FOOTER */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-600 gap-4">
          <div className="space-y-1">
            <p><strong className="text-slate-900 dark:text-slate-200">Evaluating Physician:</strong> {activePrediction?.doctor}</p>
            <p><strong className="text-slate-900 dark:text-slate-200">Hospital Location:</strong> {activePrediction?.hospital}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 print:bg-slate-100 border border-slate-200 dark:border-slate-800 print:border-slate-300 max-w-md text-[10px] text-slate-600 dark:text-slate-500 print:text-slate-600">
            <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 inline mr-1" />
            This report is AI-assisted and should always be reviewed by a qualified medical professional.
          </div>
        </div>

      </motion.div>

      <div className="hidden print:block print-report-card">
        <div className="bg-white text-slate-900" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="rounded-[18px] border border-slate-200 p-6 shadow-sm" style={{ borderColor: '#dbe7f2' }}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <img src={cortexLogo} alt="CORTEX VISION" className="h-10 w-auto" />
                <div>
                  <div className="text-[20px] font-black tracking-tight text-[#0F4C81]">CORTEX VISION</div>
                  <div className="text-[12px] font-semibold text-slate-700">ABC Medical Center</div>
                  <div className="text-[12px] font-semibold text-slate-600">Brain Tumor AI Diagnostic Report</div>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <div><strong>Report ID:</strong> {activePrediction?.id}</div>
                <div><strong>Report Date:</strong> {reportDate}</div>
                <div><strong>Model Used:</strong> {reportModel}</div>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 border-b border-slate-200 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
                Patient & Clinical Metadata
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Patient Name</span><span className="font-semibold text-slate-900">{activePrediction?.patientName}</span></div>
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Patient ID</span><span className="font-semibold text-slate-900">{activePrediction?.patientId}</span></div>
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Age</span><span className="font-semibold text-slate-900">{activePrediction?.age}</span></div>
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Gender</span><span className="font-semibold text-slate-900">{activePrediction?.gender}</span></div>
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Attending Doctor</span><span className="font-semibold text-slate-900">{activePrediction?.doctor}</span></div>
                <div><span className="block text-[10px] font-semibold uppercase text-slate-500">Reported Symptoms</span><span className="font-semibold text-slate-900">{activePrediction?.symptoms}</span></div>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] border border-slate-200 bg-white p-4">
              <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
                MRI Scan Image
              </div>
              <div className="flex justify-center">
                <img
                  src={activePrediction?.mriImageUrl}
                  alt="MRI scan"
                  className="max-h-70 w-auto rounded-lg border border-slate-300 object-contain p-2"
                />
              </div>
              <div className="mt-2 text-center text-[11px] font-semibold text-slate-600">T1-Weighted MRI Scan</div>
            </div>

            <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 border-b border-slate-200 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
                Diagnostic Prediction
              </div>
              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase text-slate-500">Predicted Class</div>
                  <div className="mt-1 text-[13px] font-bold text-slate-900">{predictedClass}</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase text-slate-500">Severity</div>
                  <div className="mt-1 text-[13px] font-bold text-slate-900">{severity}</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase text-slate-500">Confidence (%)</div>
                  <div className="mt-1 text-[13px] font-bold text-slate-900">{confidencePercent}</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="text-[10px] font-semibold uppercase text-slate-500">Inference Time</div>
                  <div className="mt-1 text-[13px] font-bold text-slate-900">{inferenceTime}</div>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-5 text-slate-700">
                <div className="text-[10px] font-semibold uppercase text-slate-500">AI Summary</div>
                <div className="mt-1 text-slate-900">{activePrediction?.aiSummary}</div>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] border border-slate-200 bg-white p-4">
              <div className="mb-3 border-b border-slate-200 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
                Suggested Clinical Recommendations
              </div>
              <ul className="space-y-2 text-[11px] leading-5 text-slate-700">
                {activePrediction?.recommendations?.map((rec, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#0F4C81]">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-slate-200 pt-3 text-center text-[10px] leading-5 text-slate-600">
              <div>-------------------------------------------------------</div>
              <div>AI-generated diagnostic assistance.</div>
              <div>This report is for research and educational purposes only.</div>
              <div>Always consult a qualified medical professional.</div>
              <div>Generated by CORTEX VISION AI.</div>
              <div>-------------------------------------------------------</div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};
