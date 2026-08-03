import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Building2, Globe, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hospital: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', hospital: '', message: '' });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative"
    >
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
        className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-75 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold text-blue-600 dark:text-blue-400"
        >
          Contact &amp; Clinical Integration Support
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs text-slate-600 dark:text-slate-300"
        >
          Have questions about deploying Cortex Vision inside your hospital network or connecting custom PyTorch models?
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Contact Info (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 shadow-2xl space-y-6 hover:border-cyan-500/40 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span>Cortex Vision AI Medical Center</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3 group">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Hospital Headquarters Placeholder:</strong>
                  <span className="text-slate-600 dark:text-slate-400">Building 4, Medical AI Research Campus, Palo Alto, CA 94304</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Email Enquiries:</strong>
                  <span className="text-slate-600 dark:text-slate-400">support@cortexvision.ai</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Clinical Support Line:</strong>
                  <span className="text-slate-800 dark:text-slate-300 font-mono font-bold">+91 (800) 555-NEURO</span>
                </div>
              </div>
            </div>

            {/* Map visual placeholder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-blue-100 dark:border-slate-800 text-center text-xs text-slate-500 space-y-2 shadow-inner"
            >
              <Building2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto animate-bounce" />
              <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">Edge GPU Node Location: Active</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-7"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 shadow-2xl space-y-6 hover:border-purple-500/40 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
              <span>Send Us a Message</span>
            </h3>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-2 text-emerald-800 dark:text-emerald-300 shadow-lg"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Our medical AI engineering team will respond shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1.5">Full Name</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1.5">Email Address</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1.5">Hospital / Organization</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    placeholder="Enter your hospital / organization"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-mono text-[11px] mb-1.5">Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-linear-to-r from-cyan-500 via-purple-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Inquiry</span>
                </motion.button>
              </form>
            )}

          </motion.div>
        </motion.div>

      </div>

    </motion.div>
  );
};

