import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const Brain3DVisualizer: React.FC = () => {
  const [scanStep, setScanStep] = useState(15);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Auto cycle images every 6 seconds if user is idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % brainImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const brainImages = [
    {
      title: 'Holographic Brain MRI',
      subtitle: 'T1-Weighted 3D Sagittal Plane',
      url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Deep Cortex Data Model',
      subtitle: 'ResNet Feature Map Density',
      url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Grad-CAM Tumor Localization',
      subtitle: 'AI Heatmap Density Vector',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center group">
      
      {/* Outer Glow & High-Tech Border Container with Floating Animation */}
      <motion.div 
        animate={{
          y: [-12, 12, -12],
          rotateX: [0, 2, 0],
          rotateY: [0, -2, 0],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full rounded-3xl p-3.5 sm:p-5 overflow-hidden border border-cyan-500/30 dark:border-cyan-400/40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] dark:shadow-[0_0_60px_rgba(6,182,212,0.3)] transition-all duration-500 hover:border-cyan-400"
      >
        
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/50 via-white/90 to-white dark:from-cyan-900/40 dark:via-slate-950/90 dark:to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Floating Laser Scanning Line */}
        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent shadow-[0_0_20px_#0284c7] dark:shadow-[0_0_20px_#38bdf8] opacity-80 z-30 pointer-events-none transition-all duration-75"
          style={{ top: `${scanStep}%` }}
        />

        {/* Hero Brain Scan Image Display Container */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-100 dark:bg-slate-950 shadow-xl">
          <img 
            src={brainImages[activeImage].url} 
            alt={brainImages[activeImage].title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-125 brightness-110 saturate-150 transform group-hover:scale-105 transition-all duration-700"
          />
          
          {/* Subtle Cyber Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20 dark:from-slate-950/90 dark:via-transparent dark:to-slate-950/20 pointer-events-none" />

          {/* Glowing Synaptic Network Overlay Wireframe */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-85 z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <line x1="15" y1="35" x2="45" y2="20" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="1 1" />
              <line x1="45" y1="20" x2="78" y2="30" stroke="#38bdf8" strokeWidth="0.7" />
              <line x1="38" y1="52" x2="72" y2="60" stroke="#38bdf8" strokeWidth="0.7" />
              <line x1="78" y1="30" x2="92" y2="68" stroke="#38bdf8" strokeWidth="0.7" />
              <line x1="72" y1="60" x2="92" y2="68" stroke="#38bdf8" strokeWidth="0.7" />
              <line x1="45" y1="20" x2="72" y2="60" stroke="#38bdf8" strokeWidth="0.4" />
              
              <circle cx="15" cy="35" r="2" fill="#38bdf8" className="animate-ping" />
              <circle cx="45" cy="20" r="2.5" fill="#60a5fa" />
              <circle cx="78" cy="30" r="3" fill="#38bdf8" className="animate-pulse" />
              <circle cx="72" cy="60" r="2" fill="#818cf8" />
              <circle cx="92" cy="68" r="2.5" fill="#38bdf8" />
            </svg>
          </div>

          {/* Image Overlay Label Badge */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between p-2.5 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-md">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold font-mono text-cyan-800 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                <span>{brainImages[activeImage].title}</span>
              </div>
              <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 mt-0.5">{brainImages[activeImage].subtitle}</p>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-mono text-cyan-700 dark:text-cyan-400/80 bg-cyan-100 dark:bg-cyan-950/60 px-2 py-1 rounded-md border border-cyan-500/30 dark:border-cyan-500/20">
              <Activity className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>3D ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Thumbnails Gallery Strip for Brain Scan Images */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {brainImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative h-16 rounded-xl overflow-hidden border transition-all cursor-pointer group/thumb ${
                activeImage === idx 
                  ? 'border-cyan-500 dark:border-cyan-400 ring-2 ring-cyan-500/40 dark:ring-cyan-400/40 shadow-md scale-102' 
                  : 'border-slate-300 dark:border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${activeImage === idx ? 'bg-cyan-500/10' : 'bg-slate-900/10 dark:bg-slate-950/30'}`} />
            </button>
          ))}
        </div>

      </motion.div>

      {/* Futuristic Glowing Pedestal Base */}
      <motion.div 
        animate={{
          scale: [0.9, 1.08, 0.9],
          opacity: [0.6, 0.95, 0.6],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full max-w-xs h-8 -mt-2 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <div className="w-full h-4 rounded-[100%] bg-gradient-to-r from-slate-200/10 via-cyan-300/50 to-slate-200/10 border border-cyan-300/70 shadow-[0_0_35px_rgba(56,189,248,0.9)] backdrop-blur-md" />
        <div className="w-4/5 h-2 -mt-1.5 rounded-[100%] bg-white/40 border border-cyan-200/80 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </motion.div>

    </div>
  );
};
