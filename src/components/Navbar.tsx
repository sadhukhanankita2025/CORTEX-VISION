import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../authContext';
import cortexLogo from '../assets/cortex-logo-clean.png';

interface NavbarProps {
  activePage?: string;
  currentPage?: string;
  setActivePage?: (page: string) => void;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  currentPage,
  setActivePage,
  onNavigate
}) => {
  const current = currentPage || activePage || 'home';
  const handleNav = (page: string) => {
    if (onNavigate) onNavigate(page);
    if (setActivePage) setActivePage(page);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'prediction', label: 'Prediction' },
    { id: 'reports', label: 'Reports' },
    { id: 'history', label: 'History' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl transition-all shadow-sm dark:shadow-none">
      {/* Outer wrapper optimized with fluid max-width and responsive padding layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">

          {/* Official Branding Logo & Name - Scaled dynamically across break points */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center cursor-pointer group shrink-0 transition-transform hover:scale-[1.02] py-1"
          >
            <img
              src={cortexLogo}
              alt="Cortex Vision Logo"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col justify-center ml-2 sm:ml-2.5">
              <span className="text-base sm:text-lg md:text-xl font-black tracking-tight font-sans leading-none transition-colors">
                <span className="text-slate-900 dark:text-white">CORTEX</span>{" "}
                <span className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
                  VISION
                </span>
              </span>
              <span className="text-[7px] sm:text-[8px] md:text-[9px] text-cyan-600 dark:text-cyan-400 font-mono tracking-widest font-bold uppercase mt-0.5">
                Neuro-Imaging AI
              </span>
            </div>
          </div>

          {/* Desktop/Tablet Navigation Links (Pill Capsule - Visible from LG onwards) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md px-2 xl:px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800/90 shrink-0 shadow-sm dark:shadow-none">
            {navItems.map((item) => {
              const isActive = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 xl:px-4 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls (Theme Switcher, Profile/Auth, Mobile Menu Toggle) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

            {/* Custom Sliding Gradient Theme Toggle */}
            <ThemeToggle />

            {/* User Profile Avatar / Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop'}
                    alt="User"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium hidden md:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono truncate">{user.role} • {user.hospitalName}</p>
                    </div>
                    <div className="mt-1 space-y-1">
                      <button
                        onClick={() => {
                          handleNav('prediction');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        New Prediction
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav('auth')}
                className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer leading-tight flex items-center justify-center shrink-0"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Toggle (Visible on screens smaller than LG) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Full-width responsive Mobile Drawer Menu with smooth layout wrapping */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 py-5 shadow-2xl backdrop-blur-2xl space-y-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950 font-bold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          {/* Mobile User Profile / Auth Section Footer */}
          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono truncate">{user.role} • {user.hospitalName}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleNav('auth');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-slate-950 text-sm font-bold text-center shadow-md cursor-pointer transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;