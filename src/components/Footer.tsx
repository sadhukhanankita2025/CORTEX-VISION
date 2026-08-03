import React from 'react';
import { Brain, Github, Shield, Activity } from 'lucide-react';
import cortexLogo from '../assets/cortex-logo-clean.png';

interface FooterProps {
  setActivePage?: (page: string) => void;
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onNavigate }) => {
  const handleNav = (page: string) => {
    if (onNavigate) onNavigate(page);
    else if (setActivePage) setActivePage(page);
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
      {/* Subtle footer ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">

        {/* Col 1: Brand & Description */}
        <div className="space-y-4">
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => handleNav('home')}>
            <img
              src={cortexLogo}
              alt="Cortex Vision Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col justify-center ml-1.5 sm:ml-2">
              <span className="text-lg sm:text-xl font-black tracking-tight font-sans leading-none transition-colors">
                <span className="text-slate-900 dark:text-white">CORTEX</span>{" "}
                <span className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
                  VISION
                </span>
              </span>
              <span className="text-[8px] sm:text-[9px] text-cyan-600 dark:text-cyan-400 font-mono tracking-widest font-bold uppercase mt-0.5">
                Neuro-Imaging AI
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            AI-powered edge diagnostic intelligence platform for brain tumor classification from T1/T2-weighted MRI scans.
          </p>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-cyan-500/30 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 shadow-sm">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-600 dark:text-cyan-400" />
            <span>PyTorch Model: best_brain_tumor_model.pth</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono mb-4 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block mr-1"></span>
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            {['home', 'prediction', 'features', 'about', 'history', 'contact'].map((p) => (
              <li key={p}>
                <button
                  onClick={() => handleNav(p)}
                  className="hover:text-cyan-600 dark:hover:text-cyan-300 capitalize transition-all duration-200 cursor-pointer flex items-center space-x-1 hover:translate-x-1 text-slate-700 dark:text-slate-400"
                >
                  <span className="text-cyan-600/70 dark:text-cyan-500/50 opacity-0 hover:opacity-100 transition-opacity">›</span>
                  <span>{p}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Research & Architecture */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono mb-4 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block mr-1"></span>
            Architecture
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="text-slate-600 dark:text-slate-400 font-mono flex items-center space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
              <span>PyTorch EfficientNetB0 Backbone</span>
            </li>
            <li className="text-slate-600 dark:text-slate-400 font-mono flex items-center space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
              <span>best_brain_tumor_model.pth</span>
            </li>
            <li className="text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
              <span>Flask REST API Inference Proxy</span>
            </li>
            <li className="text-slate-600 dark:text-slate-400 flex items-center space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
              <span>Grad-CAM Heatmap Visualizer</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Medical Disclaimer & Copyright Banner */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between text-[11px] space-y-3 md:space-y-0 relative z-10">
        <p className="text-slate-600 dark:text-slate-400 text-center md:text-left">
          <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 inline mr-1" />
          <strong className="text-slate-800 dark:text-slate-300">Medical Disclaimer:</strong> This application is an AI-assisted decision support tool and should always be reviewed by a certified radiologist or medical professional.
        </p>
        <p className="font-mono text-slate-600 dark:text-slate-400">
          © 2026 Cortex Vision. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
