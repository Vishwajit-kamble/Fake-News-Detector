import { BrainCircuit, ShieldAlert, Zap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">About TruthLens AI</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          TruthLens AI is an experimental AI-powered news analysis tool designed to help readers identify potentially misleading language and understand the signals behind an article's assessment.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">AI-Powered</h3>
          <p className="text-slate-600 dark:text-slate-400">Utilizes advanced large language models to process complex natural language and identify subtle semantic patterns.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Explainable</h3>
          <p className="text-slate-600 dark:text-slate-400">Doesn't just give a black-box score. Provides detailed signal breakdowns and highlights specific suspicious phrases.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Fast</h3>
          <p className="text-slate-600 dark:text-slate-400">Delivers comprehensive credibility analysis and breakdown in seconds, helping you verify information on the fly.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Educational</h3>
          <p className="text-slate-600 dark:text-slate-400">Designed to train readers to become better critical thinkers by highlighting common misleading journalistic techniques.</p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Important Disclaimer</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          TruthLens AI is an experimental tool meant to assist human judgment, not replace it. The AI models used to analyze text can hallucinate, exhibit bias, or misinterpret nuances in complex journalism.
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          A "Likely Credible" score does not guarantee absolute truth, and a "Potentially Misleading" score does not mean an article is entirely false. Always consult multiple reliable sources for important news.
        </p>
      </div>
    </div>
  );
}
