import React, { useState } from 'react';
import {
  Lock, Mail, User, Building2, Shield, ArrowRight, KeyRound,
  CheckCircle2, Sparkles, Stethoscope, Eye, EyeOff, AlertCircle, ShieldAlert,
  AlertTriangle, ShieldCheck, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../authContext';
import logo from '../assets/cortex-logo-clean.png';

interface AuthPageProps {
  onSuccess: () => void;
  authRequiredNotice?: string;
}

type AuthMode = 'login' | 'signup' | 'forgot';

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, authRequiredNotice }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@cortexvision.ai',
    password: 'password123',
    hospital: 'Johns Hopkins Medical Center',
    role: 'Radiologist'
  });

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (mode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required.';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
    }

    if (mode === 'signup') {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        newErrors.name = 'Full practitioner name is required.';
      }
      if (!formData.hospital.trim()) {
        newErrors.hospital = 'Hospital / Medical center name is required.';
      }
      if (!agreeTerms) {
        newErrors.terms = 'You must acknowledge HIPAA compliance terms to proceed.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);

    if (!validateForm()) {
      return;
    }

    if (mode === 'forgot') {
      setSuccessMsg(`Password reset instructions sent to ${formData.email}`);
      setTimeout(() => {
        setMode('login');
        setErrors({});
      }, 3000);
      return;
    }

    login({
      name: formData.name || 'Medical Practitioner',
      email: formData.email,
      role: formData.role,
      hospital: formData.hospital
    });

    onSuccess();
  };

  const handleQuickDemoLogin = () => {
    login({
      name: 'Dr. Sarah Jenkins, M.D.',
      email: 'sarah.jenkins@cortexvision.ai',
      role: 'Lead Neuro-Radiologist',
      hospital: 'Johns Hopkins Medical Center'
    });
    onSuccess();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setSuccessMsg(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center px-4 py-8 relative overflow-hidden"
    >

      {/* Moving Background Ambient Glow Particles */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.25, 0.85, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-5 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-5 right-5 w-125 h-125 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-20, 20, -20],
          scale: [0.9, 1.1, 0.9],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* CENTERED CONTAINER FOR AUTH FORM */}
      <div className="w-full max-w-xl mx-auto relative z-10">

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          whileHover={{ y: -3 }}
          className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border border-blue-200 dark:border-slate-800 shadow-2xl hover:border-cyan-500/50 space-y-6 transition-all duration-300 relative overflow-hidden pipeline-card-text"
        >

          {/* Top Accent Light Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-purple-500" />

          {/* OFFICIAL CORTEX VISION LOGO WITH BRAND NAME */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-2">
            <img
              src={logo}
              alt="CORTEX VISION - Neuro-Imaging AI"
              className="h-14 sm:h-18 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            />
            <div className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-sans leading-none">
                <span className="text-slate-900 dark:text-white">CORTEX</span>{" "}
                <span className="text-cyan-600 dark:text-cyan-400">VISION</span>
              </span>
              <span className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-mono tracking-widest font-bold uppercase mt-1">
                Neuro-Imaging AI
              </span>
            </div>
          </div>

          {/* AUTH REQUIRED PROMPT BANNER */}
          {authRequiredNotice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs flex items-center space-x-3 shadow-lg shadow-amber-500/10 font-mono"
            >
              <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>{authRequiredNotice}</span>
            </motion.div>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono shadow-md shadow-cyan-500/10"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>HIPAA Compliant Portal</span>
            </motion.div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {mode === 'login' && 'Practitioner Sign In'}
              {mode === 'signup' && 'Create Clinical Account'}
              {mode === 'forgot' && 'Reset Account Password'}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {mode === 'login' && 'Access PyTorch MRI inference engines & patient history'}
              {mode === 'signup' && 'Register your medical center for AI diagnostic workflows'}
              {mode === 'forgot' && 'Enter your hospital email address to receive a secure token'}
            </p>
          </div>

          {/* SUCCESS BANNER */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2 font-mono shadow-md shadow-emerald-500/10"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GENERAL FORM VALIDATION ERROR BANNER */}
          <AnimatePresence>
            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-start space-x-2 font-mono shadow-md shadow-rose-500/10"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <span className="font-bold">Validation Error:</span> Please resolve the highlighted fields below.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Demo Access Button */}
          {mode === 'login' && (
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(6,182,212,0.35)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleQuickDemoLogin}
              type="button"
              className="w-full py-2.5 px-4 rounded-2xl bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Instant Demo Access (Dr. Sarah Jenkins)</span>
            </motion.button>
          )}

          {/* FORM WITH FIELD VALIDATIONS */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs font-sans">

            {/* Name & Role (Signup only) */}
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1">Full Practitioner Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Dr. Sarah Jenkins, M.D."
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-slate-900 dark:text-white focus:outline-none transition-all ${errors.name ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-300 dark:border-slate-700/80 focus:border-cyan-500'
                        }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-[10px] font-mono text-rose-500 dark:text-rose-400 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 inline" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1">Clinical Specialty</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="Radiologist">Neuro-Radiologist</option>
                      <option value="Oncologist">Neuro-Oncologist</option>
                      <option value="Surgeon">Neurosurgeon</option>
                      <option value="Researcher">Medical Researcher</option>
                      <option value="Physician">General Practitioner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1">Hospital Center</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.hospital}
                        onChange={(e) => {
                          setFormData({ ...formData, hospital: e.target.value });
                          if (errors.hospital) setErrors({ ...errors, hospital: '' });
                        }}
                        placeholder="Johns Hopkins"
                        className={`w-full pl-9 pr-2 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-slate-900 dark:text-white focus:outline-none transition-all ${errors.hospital ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-300 dark:border-slate-700/80 focus:border-cyan-500'
                          }`}
                      />
                    </div>
                    {errors.hospital && (
                      <p className="mt-1 text-[10px] font-mono text-rose-500 dark:text-rose-400 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 inline" />
                        <span>{errors.hospital}</span>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1">
                Hospital Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="sarah.jenkins@cortexvision.ai"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-slate-900 dark:text-white focus:outline-none transition-all ${errors.email ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-300 dark:border-slate-700/80 focus:border-cyan-500'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[10px] font-mono text-rose-500 dark:text-rose-400 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 inline shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px]">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border text-slate-900 dark:text-white focus:outline-none transition-all ${errors.password ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-300 dark:border-slate-700/80 focus:border-cyan-500'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[10px] font-mono text-rose-500 dark:text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 inline shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>
            )}

            {/* Checkboxes */}
            {mode === 'login' && (
              <div className="flex items-center justify-between pt-1 text-slate-300">
                <label className="flex items-center space-x-2 cursor-pointer text-[11px]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Keep session active</span>
                </label>
              </div>
            )}

            {mode === 'signup' && (
              <div className="pt-1">
                <label className="flex items-start space-x-2 cursor-pointer text-[11px] text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}
                    className="mt-0.5 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>I certify I am a licensed healthcare professional bound by HIPAA patient data confidentiality rules.</span>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-[10px] font-mono text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 inline shrink-0" />
                    <span>{errors.terms}</span>
                  </p>
                )}
              </div>
            )}

            {/* SUBMIT BUTTON WITH POP MOTION */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.45)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-cyan-500 via-teal-400 to-cyan-500 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              <span>
                {mode === 'login' && 'Sign In to Workspace'}
                {mode === 'signup' && 'Register Practitioner Profile'}
                {mode === 'forgot' && 'Send Password Recovery Email'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </form>

          {/* Social Sign In Options */}
          {mode === 'login' && (
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-center text-[10px] font-mono text-slate-500">OR CLINICAL SINGLE SIGN-ON</div>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.14C3.25 21.31 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.14z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.59l4.01 3.14c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Google SSO</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Epic EHR SSO</span>
                </motion.button>
              </div>
            </div>
          )}

          {/* Mode Switch Footer */}
          <div className="text-center text-xs font-mono text-slate-400">
            {mode === 'login' && (
              <p>
                New practitioner?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  Create account
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remembered password?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>

        </motion.div>

      </div>

    </motion.div>
  );
};

