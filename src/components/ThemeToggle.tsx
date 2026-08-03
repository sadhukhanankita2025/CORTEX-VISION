import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../themeContext';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode; previewBg: string }[] = [
    {
      id: 'light',
      label: 'Day Mode (Light & Deep Blue)',
      icon: <Sun className="w-4 h-4 text-blue-600 dark:text-amber-400" />,
      previewBg: 'bg-sky-100 border-blue-600'
    },
    {
      id: 'dark',
      label: 'Dark Navy (Deep Tech)',
      icon: <Moon className="w-4 h-4 text-cyan-400" />,
      previewBg: 'bg-slate-900 border-cyan-500'
    }
  ];

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[1];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800/80 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all shadow-sm cursor-pointer active:scale-95"
        title="Switch Theme"
      >
        {currentThemeObj.icon}
        <span className="hidden sm:inline capitalize font-mono text-xs">{theme}</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 mb-1">
            Select Color Theme
          </div>
          <div className="space-y-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  theme === t.id
                    ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30 dark:border-cyan-500/40'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {t.icon}
                  <span>{t.label}</span>
                </div>
                <span className={`w-3 h-3 rounded-full border ${t.previewBg}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
