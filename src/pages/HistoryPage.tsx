import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HistoryItem {
  id: string;
  headline: string;
  classification: string;
  confidence: number;
  date: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('truthlens_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const getBadgeClass = (classification: string) => {
    if (classification === 'likely_credible') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
    if (classification === 'potentially_misleading') return 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
    return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
  };

  const formatClassification = (cls: string) => {
    return cls.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Analysis History</h1>
        <p className="text-slate-600 dark:text-slate-400">Review your previously analyzed articles.</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No history yet</h3>
          <p className="text-slate-500 mb-6">Analyze an article to see it appear here.</p>
          <Link to="/analyze" className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors">
            Analyze Article
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {history.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeClass(item.classification)}`}>
                      {formatClassification(item.classification)}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                    {item.headline}
                  </h4>
                </div>
                
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-center">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{(item.confidence * 100).toFixed(0)}%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Confidence</div>
                  </div>
                  
                  <Link to="/analyze" className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                    <span className="sr-only">View Analysis</span>
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
