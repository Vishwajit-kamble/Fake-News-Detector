import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { analyzeArticle, type AnalyzeResponse } from '../lib/api';
import ResultView from '../components/ResultView';

export default function AnalyzePage() {
  const [article, setArticle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState('');
  
  const [analysisStep, setAnalysisStep] = useState(0);

  const sampleArticle = {
    content: "Scientists Discover Coffee Cures All Forms of Fatigue Instantly\n\nIn a shocking revelation today, researchers announced that drinking exactly three cups of coffee is guaranteed to cure all forms of fatigue forever. Experts reveal that this miracle bean has hidden properties that the government has been hiding from us for decades. You won't believe how simple the solution is!"
  };

  const handleSample = () => {
    setArticle(sampleArticle.content);
  };

  const handleClear = () => {
    setArticle('');
    setError('');
  };

  const handleReset = () => {
    setResult(null);
    setArticle('');
    setAnalysisStep(0);
  };

  const simulateProgress = () => {
    setAnalysisStep(1); // Received
    setTimeout(() => setAnalysisStep(2), 1000); // Processed
    setTimeout(() => setAnalysisStep(3), 2000); // Evaluating
    setTimeout(() => setAnalysisStep(4), 3000); // Generating
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article.trim()) {
      setError('Please provide the article content.');
      return;
    }
    
    setError('');
    setIsAnalyzing(true);
    simulateProgress();

    try {
      const data = await analyzeArticle({ content: article });
      
      // Save to history in local storage
      const history = JSON.parse(localStorage.getItem('truthlens_history') || '[]');
      history.unshift({
        id: Date.now().toString(),
        headline: article.substring(0, 50) + "...",
        classification: data.classification,
        confidence: data.confidence,
        date: new Date().toISOString()
      });
      localStorage.setItem('truthlens_history', JSON.stringify(history.slice(0, 50)));

      // Give the animation a moment to finish step 4
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 3500);

    } catch (err: any) {
      setError(err?.message || 'Failed to analyze the article.');
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  const steps = [
    "Receiving article data",
    "Processing content",
    "Evaluating credibility signals",
    "Generating explanation",
    "Preparing report"
  ];

  if (result && !isAnalyzing) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
        <ResultView article={article} result={result} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] flex flex-col items-center">
      
      <AnimatePresence mode="wait">
        {!isAnalyzing ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                What does this article really say?
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Paste the article content below for AI analysis.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="article" className="block text-sm font-medium text-slate-900 dark:text-slate-300">
                      Article Content
                    </label>
                    <button 
                      type="button" 
                      onClick={handleSample}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Try sample
                    </button>
                  </div>
                  <textarea
                    id="article"
                    value={article}
                    onChange={(e) => setArticle(e.target.value)}
                    placeholder="Paste the complete news article here..."
                    rows={10}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 resize-y"
                  ></textarea>
                  <div className="flex justify-between items-center mt-1.5">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Tip: Include the complete article for a more meaningful analysis.
                    </div>
                    <div className="text-xs text-slate-400">
                      {article.length} chars
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="submit"
                    disabled={!article}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analyze Article
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md my-auto flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-indigo-500/5"
          >
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-8 relative">
              <ScanSearch className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-ping"></div>
              <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="75 225" className="text-indigo-600 dark:text-indigo-500" strokeLinecap="round" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Analyzing your article...</h2>
            
            <div className="w-full space-y-4 text-left">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {analysisStep > index ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : analysisStep === index ? (
                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 shrink-0"></div>
                  )}
                  <span className={`text-sm font-medium transition-colors ${
                    analysisStep > index ? 'text-slate-700 dark:text-slate-300' :
                    analysisStep === index ? 'text-indigo-700 dark:text-indigo-400' :
                    'text-slate-400 dark:text-slate-600'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dummy component needed to prevent the missing import error for AlertCircle in the file above
import { AlertCircle } from 'lucide-react';
