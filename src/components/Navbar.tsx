import React, { useState } from 'react';
import { Brain, Bell, Menu, X, User as UserIcon, Code2, LogOut, CheckCircle, ChevronDown, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../authContext';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import cortexLogo from '../assets/cortex-logo-clean.jpeg';

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
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState<any[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotifClick = (notif: any) => {
    markAsRead(notif.id);
    setNotifOpen(false);

    // Route dynamically based on notification topic
    const titleLower = notif.title.toLowerCase();
    const msgLower = notif.message.toLowerCase();

    if (titleLower.includes('prediction') || msgLower.includes('mri') || msgLower.includes('scan')) {
      handleNav('prediction');
    } else if (titleLower.includes('report') || msgLower.includes('report')) {
      handleNav('reports');
    } else if (titleLower.includes('model') || titleLower.includes('system') || titleLower.includes('calibration')) {
      handleNav('about');
    } else {
      handleNav('history');
    }
  };

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
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl transition-all shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[66px] sm:min-h-[72px] py-2 gap-2 sm:gap-4">
          
          {/* Official Branding Logo & Name */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center cursor-pointer group shrink-0 transition-transform hover:scale-[1.02]"
          >
            <img 
              src={cortexLogo}
              alt="Cortex Vision Logo"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col justify-center ml-2">
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight font-sans leading-none transition-colors">
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

          {/* Desktop Navigation Links (Pill Capsule) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md px-2 xl:px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800/90 shrink-0 ml-6 lg:ml-10 xl:ml-12 shadow-sm dark:shadow-none">
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

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold font-mono bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950 rounded-full border border-white dark:border-slate-950 flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">Notifications</span>
                      {unreadCount > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                          {unreadCount} unread
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          All read
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline font-mono cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="mt-2 space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500 font-mono">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          onClick={() => handleNotifClick(n)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all hover:border-cyan-500/50 group relative ${
                            n.read 
                              ? 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400' 
                              : 'bg-sky-50 dark:bg-slate-800/80 border-cyan-300 dark:border-cyan-500/30 text-slate-900 dark:text-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center space-x-1.5">
                              {!n.read && <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0" />}
                              <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                {n.title}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0">
                              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">{n.timestamp}</span>
                              <button
                                onClick={(e) => dismissNotif(n.id, e)}
                                className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                title="Dismiss"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                          <div className="mt-1.5 flex items-center justify-between text-[9px] text-cyan-600 dark:text-cyan-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Click to view details</span>
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Auth Toggle */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop'}
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium hidden md:inline">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">{user.role} • {user.hospitalName}</p>
                    </div>
                    <div className="mt-1 space-y-1">
                      <button
                        onClick={() => {
                          handleNav('prediction');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors"
                      >
                        New Prediction
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2 transition-colors"
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
                className="px-5 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer leading-tight flex items-center justify-center"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNav(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                current === item.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
