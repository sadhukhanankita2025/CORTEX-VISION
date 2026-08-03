import React, { useState, useEffect } from 'react';
import {
  Search, Filter, ArrowUpDown, Eye, Trash2, FileText, Download,
  ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, Clock, Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { PredictionResult, TumorType } from '../types';
import { historyService } from '../services/historyService';

interface HistoryProps {
  onViewReport: (prediction: PredictionResult) => void;
}

export const History: React.FC<HistoryProps> = ({ onViewReport }) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'date' | 'confidence' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await historyService.getHistory();
    setPredictions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this scan prediction record?')) {
      await historyService.deletePrediction(id);
      loadHistory();
    }
  };

  // Filter & Search Logic
  const filtered = predictions.filter((item) => {
    if (!item) return false;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (item.patientName || '').toLowerCase().includes(term) ||
      (item.patientId || '').toLowerCase().includes(term) ||
      (item.doctor || '').toLowerCase().includes(term) ||
      (item.hospital || '').toLowerCase().includes(term);

    const matchesFilter =
      filterClass === 'ALL' ||
      (filterClass === 'TUMOR' && item.tumorDetected) ||
      (filterClass === 'NORMAL' && !item.tumorDetected) ||
      item.predictionClass === filterClass;

    return matchesSearch && matchesFilter;
  });

  // Sort Logic
  const sorted = [...filtered].sort((a, b) => {
    let comp = 0;
    if (sortField === 'date') comp = new Date(b.examinationDate).getTime() - new Date(a.examinationDate).getTime();
    if (sortField === 'confidence') comp = b.confidence - a.confidence;
    if (sortField === 'name') comp = a.patientName.localeCompare(b.patientName);
    return sortOrder === 'desc' ? comp : -comp;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative"
    >
      {/* Background ambient glow blob */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-[550px] h-[350px] bg-linear-to-l from-cyan-500/20 via-purple-500/20 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            <span>Patient Prediction History</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Archived diagnostic evaluations and AI model inference records.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-white dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-blue-200 dark:border-slate-800 shadow-md">
          <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Total Records: {predictions.length}</span>
        </div>
      </div>

      {/* SEARCH, SORT, FILTER CONTROLS CARD */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-cyan-500/5 transition-all duration-300"
      >

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name, ID, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs font-mono">
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="TUMOR">Tumor Detected</option>
              <option value="NORMAL">No Tumor</option>
              <option value="Glioma">Glioma</option>
              <option value="Meningioma">Meningioma</option>
              <option value="Pituitary">Pituitary</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
            className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Sort: {sortOrder.toUpperCase()}</span>
          </button>
        </div>

      </motion.div>

      {/* MODERN DATA TABLE CARD */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-blue-200 dark:border-slate-800 hover:border-purple-500/40 shadow-xl overflow-hidden transition-all duration-500"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">

            {/* Table Header */}
            <thead className="bg-slate-100 dark:bg-slate-950/90 text-slate-600 dark:text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Patient Details</th>
                <th className="px-6 py-4">Prediction Class</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Attending Doctor</th>
                <th className="px-6 py-4">Exam Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-sans text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500 font-mono">
                    Loading historical records...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500 font-mono">
                    No matching patient records found.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">

                    {/* Patient Name & ID */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{item.patientName}</div>
                      <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400">{item.patientId}</div>
                    </td>

                    {/* Prediction Class Badge */}
                    <td className="px-6 py-4 font-mono">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border shadow-sm ${item.tumorDetected
                          ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/40 shadow-rose-500/10'
                          : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                        }`}>
                        {item.tumorDetected ? <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                        <span>{item.predictionClass}</span>
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="px-6 py-4 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                      {item.confidence}%
                    </td>

                    {/* Doctor */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{item.doctor}</div>
                      <div className="text-[10px] text-slate-500">{item.hospital}</div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">
                      {item.examinationDate}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30 text-[10px] font-semibold">
                        {item.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onViewReport(item)}
                          className="p-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 dark:text-cyan-300 transition-colors cursor-pointer"
                          title="View Full Printable Report"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
          <span>Showing Page {currentPage} of {totalPages}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </motion.div>

    </motion.div>
  );
};
