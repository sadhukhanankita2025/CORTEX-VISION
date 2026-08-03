import React, { useState } from 'react';
import {
  Upload, FileUp, Sparkles, RefreshCw, CheckCircle2, AlertTriangle,
  Clock, Cpu, Eye, FileText, ArrowRight, User, Stethoscope, Building, Calendar, Info,
  Loader2, Activity, Scan, Zap, ShieldCheck, Layers, Binary
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PatientInfo, PredictionResult, TumorType } from '../types';
import { predictionService } from '../services/predictionService';
import { historyService } from '../services/historyService';
import { SAMPLE_MRI_IMAGES } from '../data/mockData';

interface PredictionProps {
  onPredictionComplete?: (result: PredictionResult) => void;
  onViewReport?: (result: PredictionResult) => void;
}

export const Prediction: React.FC<PredictionProps> = ({ onPredictionComplete, onViewReport }) => {
  const handleReportAction = (res: PredictionResult) => {
    if (onPredictionComplete) onPredictionComplete(res);
    if (onViewReport) onViewReport(res);
  };
  // Form State
  const [patient, setPatient] = useState<PatientInfo>({
    patientId: `PT-${Math.floor(100000 + Math.random() * 900000)}`,
    patientName: 'ABC',
    age: 30,
    gender: 'Male',
    phone: '+1 (555) 000-0000',
    email: 'abc@hospital.com',
    hospital: 'ABC Medical Center',
    doctor: 'Dr. ABC, MD',
    symptoms: 'Routine cranial MRI scan evaluation.',
    notes: 'T1-weighted contrast-enhanced MRI scan.',
    examinationDate: new Date().toISOString().split('T')[0]
  });

  // Image Upload & Sample Selection
  const [mriFile, setMriFile] = useState<File | null>(null);
  const [mriPreview, setMriPreview] = useState<string>(SAMPLE_MRI_IMAGES.brainGlioma);
  const [selectedSampleType, setSelectedSampleType] = useState<TumorType | undefined>('Glioma');
  const [isDragging, setIsDragging] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Analysis State
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('Preprocessing MRI scan & scaling tensor...');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setMriFile(file);
      setSelectedSampleType(undefined);
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMriPreview(reader.result as string);
        setTimeout(() => setIsImageLoading(false), 300);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMriFile(file);
      setSelectedSampleType(undefined);
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMriPreview(reader.result as string);
        setTimeout(() => setIsImageLoading(false), 300);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (type: TumorType, sampleUrl: string) => {
    setSelectedSampleType(type);
    setMriFile(null);
    setIsImageLoading(true);
    setMriPreview(sampleUrl);
    setTimeout(() => setIsImageLoading(false), 250);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setPredictionResult(null);
    setProcessingStage('1/3: Normalizing 224x224 MRI Tensor Matrix...');

    const stageTimer1 = setTimeout(() => {
      setProcessingStage('2/3: Executing PyTorch Model (best_brain_tumor_model.pth)...');
    }, 400);

    const stageTimer2 = setTimeout(() => {
      setProcessingStage('3/3: Generating Grad-CAM Activation Heatmap & Confidence...');
    }, 800);

    try {
      const result = await predictionService.predictTumor(
        patient,
        mriFile || mriPreview,
        selectedSampleType
      );

      setPredictionResult(result);
      await historyService.addPrediction(result);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMriFile(null);
    setMriPreview(SAMPLE_MRI_IMAGES.brainGlioma);
    setSelectedSampleType('Glioma');
    setPredictionResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative overflow-hidden"
    >
      {/* Moving & Glowing Background Ambient Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-10 -left-10 w-125 h-125 bg-linear-to-r from-cyan-500/25 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 -right-20 w-150 h-150 bg-linear-to-l from-purple-500/20 via-pink-500/15 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-600/30 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold shadow-lg shadow-cyan-500/10 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
          <span>PyTorch Edge AI Diagnostic Pipeline</span>
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex flex-wrap items-center justify-center gap-x-2">
          <span className="text-blue-600 dark:text-blue-400">Brain</span>{" "}
          <span className="text-red-600 dark:text-white">MRI</span>{" "}
          <span className="text-blue-600 dark:text-blue-400">AI</span>{" "}
          <span className="text-red-600 dark:text-white">Tumor</span>{" "}
          <span className="text-blue-600 dark:text-blue-400">Prediction</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Upload an MRI brain scan to evaluate tumor classification with model <code className="text-cyan-700 dark:text-cyan-300 font-mono font-bold bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/30">best_brain_tumor_model.pth</code>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column (7 cols): Upload Card & Patient Info Form */}
        <div className="lg:col-span-7 space-y-8">

          {/* UPLOAD CARD WITH POP-UP MOTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-xl shadow-cyan-500/5 space-y-4 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono flex items-center space-x-2">
                <Upload className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>1. MRI Image Upload &amp; Sample Selection</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Supported: PNG, JPG, JPEG, DICOM</span>
            </div>

            {/* Quick Sample Selector Buttons */}
            <div className="space-y-2">
              <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Quick Test Samples:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Glioma Scan', type: 'Glioma' as TumorType, url: SAMPLE_MRI_IMAGES.brainGlioma },
                  { label: 'Meningioma', type: 'Meningioma' as TumorType, url: SAMPLE_MRI_IMAGES.brainMeningioma },
                  { label: 'Pituitary Scan', type: 'Pituitary' as TumorType, url: SAMPLE_MRI_IMAGES.brainPituitary },
                  { label: 'Normal Brain', type: 'No Tumor' as TumorType, url: SAMPLE_MRI_IMAGES.brainNormal }
                ].map((s) => (
                  <motion.button
                    key={s.type}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => selectSample(s.type, s.url)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium font-mono border transition-all cursor-pointer ${selectedSampleType === s.type
                      ? 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-500/60 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                  >
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Drag and Drop Zone with Glow */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${isDragging
                ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                : 'border-slate-300 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-950/60 hover:border-cyan-500/40'
                }`}
            >
              <input
                type="file"
                accept="image/*,.dcm"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/10"
                >
                  <FileUp className="w-6 h-6" />
                </motion.div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Drag &amp; drop MRI scan image here, or <span className="text-cyan-600 dark:text-cyan-400 underline decoration-cyan-400/50">browse file</span>
                </p>
                <p className="text-[10px] text-slate-500 font-mono">PNG, JPG, DICOM file placeholder supported</p>
              </div>
            </motion.div>

            {/* Preview Box with Pop Motion and Skeleton Spinner */}
            <AnimatePresence mode="wait">
              {mriPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-blue-100 dark:border-slate-800 shadow-inner flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden"
                >
                  {isImageLoading ? (
                    /* Subtle Skeleton Loader for Image Preview */
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                      <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-slate-100 dark:bg-slate-900 shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full animate-shimmer" />
                        <Loader2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400 animate-spin" />
                      </div>
                      <div className="space-y-2.5 text-xs w-full">
                        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                        <div className="h-3 w-52 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse" />
                        <div className="h-3 w-44 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse" />
                        <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-cyan-500/40 bg-black shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      >
                        <img src={mriPreview} alt="MRI Scan Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-cyan-300 border border-cyan-500/30">
                          {mriFile ? mriFile.name : 'Sample MRI'}
                        </span>
                      </motion.div>

                      <div className="space-y-2 text-xs w-full">
                        <div className="flex items-center justify-between text-slate-800 dark:text-slate-300 font-mono">
                          <span>Scan Status:</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                            <span>Image Loaded &amp; Preprocessed</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono space-y-1">
                          <p>• Resolution: 224 x 224 Normalized Tensor</p>
                          <p>• Target Model: <span className="text-cyan-700 dark:text-cyan-300 font-bold">best_brain_tumor_model.pth</span></p>
                          <p>• Preprocessing: Z-score scaling + Skull Stripping</p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons with Pop Up and Glow */}
            <div className="flex items-center space-x-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading || !mriPreview}
                className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-linear-to-r from-cyan-500 via-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Scan with Edge AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze MRI Scan</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="px-4 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
              >
                Reset
              </motion.button>
            </div>

          </motion.div>

          {/* PATIENT INFORMATION FORM WITH POP MOTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-xl space-y-4 transition-all duration-300"
          >
            <div className="pb-3 border-b border-blue-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono flex items-center space-x-2">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>2. Patient Information &amp; Clinical Notes</span>
              </span>
              <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">{patient.patientId}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patient.patientName}
                  onChange={(e) => setPatient({ ...patient, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Patient ID</label>
                <input
                  type="text"
                  value={patient.patientId}
                  onChange={(e) => setPatient({ ...patient, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Age</label>
                <input
                  type="number"
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Gender</label>
                <select
                  value={patient.gender}
                  onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Hospital / Medical Center</label>
                <input
                  type="text"
                  value={patient.hospital}
                  onChange={(e) => setPatient({ ...patient, hospital: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Attending Physician / Doctor</label>
                <input
                  type="text"
                  value={patient.doctor}
                  onChange={(e) => setPatient({ ...patient, doctor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 dark:text-slate-400 font-mono text-[11px] mb-1">Symptoms &amp; Clinical Context</label>
                <textarea
                  rows={2}
                  value={patient.symptoms}
                  onChange={(e) => setPatient({ ...patient, symptoms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                />
              </div>
            </div>

          </motion.div>

        </div>

        {/* Right Column (5 cols): PREDICTION RESULT CARD WITH POP-UP ANIMATIONS */}
        <div className="lg:col-span-5 space-y-6">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-sky-300 dark:border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:shadow-[0_0_60px_rgba(6,182,212,0.25)] space-y-6 relative overflow-hidden transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-slate-800">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase font-mono flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                <span>Prediction Output</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20 font-bold">
                AI EVALUATED
              </span>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                /* SUBTLE INFERENCE SKELETON LOADER & SPINNER ANIMATION */
                <motion.div
                  key="inference-loading-skeleton"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Active AI Processing Header Banner */}
                  <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center justify-between shadow-md shadow-cyan-500/10">
                    <div className="flex items-center space-x-2.5">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin absolute" />
                        <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                      </div>
                      <span className="font-bold uppercase tracking-wide">Inference Pipeline Active</span>
                    </div>
                    <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40 text-cyan-400 font-bold animate-pulse">
                      GPU EDGE
                    </span>
                  </div>

                  {/* Stage Ticker Progress Line */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                        <span>Execution Status</span>
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">Processing Tensors...</span>
                    </div>
                    <p className="text-cyan-700 dark:text-cyan-300 font-medium flex items-center space-x-2 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 animate-spin-slow" />
                      <span className="truncate">{processingStage}</span>
                    </p>
                  </div>

                  {/* Classification Result Skeleton Box */}
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-blue-100 dark:border-slate-800 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full animate-shimmer" />

                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/60 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-spin" />
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="h-2.5 w-32 bg-slate-200 dark:bg-slate-800/80 rounded mx-auto animate-pulse" />
                      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto animate-pulse" />
                      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800/60 rounded animate-pulse mt-2" />
                    </div>
                  </div>

                  {/* Image & Heatmap Scanner Skeleton Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-50 dark:bg-slate-950 p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Scan className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                        <span>Grad-CAM Activation Scan</span>
                      </span>
                      <span className="text-cyan-700 dark:text-cyan-400 font-semibold">224 x 224</span>
                    </div>

                    <div className="relative h-28 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/15 to-transparent -translate-x-full animate-shimmer" />

                      {/* Animated Laser Scan Line passing vertically */}
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38bdf8] z-10 pointer-events-none"
                      />

                      <div className="relative z-10 flex items-center space-x-2 text-xs font-mono text-cyan-700 dark:text-cyan-300 font-semibold bg-white/90 dark:bg-slate-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/30 backdrop-blur-md">
                        <Loader2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-spin" />
                        <span>Calculating Feature Vectors...</span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Progress Skeleton Bar */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700/50 relative">
                      <motion.div
                        animate={{ width: ['15%', '60%', '95%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-linear-to-r from-cyan-500 via-purple-500 to-purple-500 h-full rounded-full shadow-md shadow-cyan-500/30"
                      />
                    </div>
                  </div>

                  {/* Grid Metrics Skeleton */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2">
                      <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2">
                      <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-800/80 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ) : predictionResult ? (
                <motion.div
                  key="result-output"
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="space-y-6"
                >

                  {/* Result Classification Badge Box with Glowing Pop-Up Animation */}
                  <motion.div
                    animate={{
                      boxShadow: predictionResult.tumorDetected
                        ? ['0 0 20px rgba(244,63,94,0.2)', '0 0 35px rgba(244,63,94,0.4)', '0 0 20px rgba(244,63,94,0.2)']
                        : ['0 0 20px rgba(16,185,129,0.2)', '0 0 35px rgba(16,185,129,0.4)', '0 0 20px rgba(16,185,129,0.2)']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`p-5 rounded-2xl border text-center space-y-2 relative overflow-hidden ${predictionResult.tumorDetected
                      ? 'bg-rose-500/10 border-rose-500/50 text-rose-700 dark:text-rose-300'
                      : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300'
                      }`}
                  >
                    <div className="flex justify-center">
                      {predictionResult.tumorDetected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 0.6 }}
                        >
                          <AlertTriangle className="w-10 h-10 text-rose-500 dark:text-rose-400 animate-bounce" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 0.6 }}
                        >
                          <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">CLASSIFICATION RESULT</p>
                      <h3 className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">
                        {predictionResult.predictionClass} {predictionResult.tumorDetected ? 'Detected' : ''}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                      {predictionResult.aiSummary}
                    </p>
                  </motion.div>

                  {/* Confidence Progress Bar */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-400">Prediction Confidence</span>
                      <span className="text-cyan-700 dark:text-cyan-400 font-extrabold text-base">{predictionResult.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700/50">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${predictionResult.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-linear-to-r from-cyan-500 via-purple-500 to-purple-500 h-full rounded-full shadow-md shadow-cyan-500/30"
                      />
                    </div>
                  </div>

                  {/* Metrics Breakdown Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 hover:border-cyan-500/40 transition-all">
                      <span className="text-slate-500 text-[10px] block">INFERENCE TIME</span>
                      <span className="text-slate-900 dark:text-white font-bold text-sm flex items-center space-x-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{predictionResult.inferenceTime}</span>
                      </span>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 hover:border-amber-500/40 transition-all">
                      <span className="text-slate-500 text-[10px] block">SEVERITY LEVEL</span>
                      <span className={`font-bold text-sm mt-0.5 block ${predictionResult.severity === 'High' ? 'text-rose-600 dark:text-rose-400' :
                        predictionResult.severity === 'Moderate' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}>
                        {predictionResult.severity}
                      </span>
                    </motion.div>
                  </div>

                  {/* Model File Reference Badge */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Model Used:</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{predictionResult.modelUsed}</span>
                  </div>

                  {/* View Full Report Button with Pop Motion */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReportAction(predictionResult)}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate Printable Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                </motion.div>
              ) : (
                <motion.div
                  key="result-awaiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-blue-100 dark:border-slate-800 w-fit mx-auto text-cyan-600 dark:text-cyan-400 shadow-lg shadow-cyan-500/10"
                  >
                    <Eye className="w-8 h-8 animate-pulse text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Awaiting Analysis</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                      Click "Analyze MRI Scan" above to run prediction on <code className="text-cyan-700 dark:text-cyan-300 font-mono">best_brain_tumor_model.pth</code>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Code Integration Note */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-blue-100 dark:border-slate-800 text-[10px] font-mono text-slate-500 space-y-0.5">
              <p className="text-indigo-600 dark:text-indigo-300">// PyTorch backend integration active</p>
              <p className="text-indigo-600 dark:text-indigo-300">// Model weight: best_brain_tumor_model.pth</p>
            </div>

          </motion.div>

        </div>

      </div>

    </motion.div>
  );
};
