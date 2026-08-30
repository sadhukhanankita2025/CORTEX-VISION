import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex items-center h-11 w-24 rounded-full bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/40 dark:border-slate-700/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out cursor-pointer p-1 focus:outline-none"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background text labels */}
      <span className={`absolute left-3.5 text-[11px] font-semibold tracking-wide transition-opacity duration-300 ${isDark ? 'text-slate-400 opacity-80' : 'opacity-0'}`}>
        Day
      </span>
      <span className={`absolute right-3.5 text-[11px] font-semibold tracking-wide transition-opacity duration-300 ${isDark ? 'opacity-0' : 'text-slate-500 opacity-80'}`}>
        Night
      </span>

      {/* Sliding Knob */}
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-full shadow-md backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isDark 
            ? 'translate-x-[52px] bg-blue-600/90 text-white shadow-blue-500/30' 
            : 'translate-x-0 bg-amber-500/90 text-white shadow-amber-500/30'
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 transform -rotate-12" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </div>
    </button>
  );
};