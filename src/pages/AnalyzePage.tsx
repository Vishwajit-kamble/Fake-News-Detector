import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, CheckCircle2, Loader2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
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
      
      const history = JSON.parse(localStorage.getItem('truthlens_history') || '[]');
      history.unshift({
        id: Date.now().toString(),
        headline: article.substring(0, 50) + "...",
        classification: data.classification,
        confidence: data.confidence,
        date: new Date().toISOString()
      });
      localStorage.setItem('truthlens_history', JSON.stringify(history.slice(0, 50)));

      setResult(data);
      setIsAnalyzing(false);

    } catch (err: any) {
      setError(err?.message || 'Failed to analyze the article.');
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  const steps = [
    "Establishing secure connection",
    "Parsing article text & structure",
    "Running neural credibility models",
    "Grounding claims via live web search",
    "Compiling final analysis report"
  ];

  if (result && !isAnalyzing) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030712] min-h-[calc(100vh-4rem)] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>
        <ResultView article={article} result={result} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#030712] min-h-[calc(100vh-4rem)] flex flex-col items-center relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <AnimatePresence mode="wait">
        {!isAnalyzing ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl relative z-10"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-6">
                <ScanSearch className="w-3.5 h-3.5" /> Intelligence Engine
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Analyze an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Article</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                Paste the full text below. Our AI will break down its credibility in seconds.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-[#0a0f1c]/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-indigo-500/5 border border-slate-200/50 dark:border-white/10 overflow-hidden relative group transition-all duration-500 hover:shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <form onSubmit={handleSubmit} className="p-6 md:p-10 relative z-10">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-50/80 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-sm flex items-center gap-3 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}

                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <label htmlFor="article" className="block text-sm font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">
                      Article Content
                    </label>
                    <button 
                      type="button" 
                      onClick={handleSample}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors border border-indigo-100 dark:border-indigo-500/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Try Sample Text
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-500"></div>
                    <textarea
                      id="article"
                      value={article}
                      onChange={(e) => setArticle(e.target.value)}
                      placeholder="Paste the complete news article text here..."
                      rows={12}
                      className="relative w-full px-6 py-5 bg-slate-50/50 dark:bg-[#030712]/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400 resize-y text-lg leading-relaxed shadow-inner"
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center mt-3 px-1">
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ScanSearch className="w-4 h-4" /> Tip: Include the full text for highest accuracy.
                    </div>
                    <div className="text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                      {article.length} chars
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                  <button
                    type="submit"
                    disabled={!article}
                    className="w-full sm:flex-1 relative group/btn overflow-hidden bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient-x"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                      Start Analysis <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={!article}
                    className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear Text
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-lg my-auto flex flex-col items-center p-12 bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-2xl rounded-[3rem] border border-white/50 dark:border-white/10 shadow-2xl shadow-indigo-500/10 relative overflow-hidden"
          >
            {/* Spinning background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(99,102,241,0.2)_360deg)] animate-spin" style={{ animationDuration: '4s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="w-28 h-28 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mb-10 relative shadow-inner rotate-3">
                <ScanSearch className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-3xl animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 border border-indigo-500/50 rounded-3xl animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Analyzing</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium tracking-wide">Please wait while the AI processes.</p>
              
              <div className="w-full space-y-5 text-left bg-slate-50/50 dark:bg-[#030712]/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                {steps.map((step, index) => {
                  const isActive = analysisStep === index;
                  const isDone = analysisStep > index;
                  
                  return (
                    <div key={index} className="flex items-center gap-4 relative">
                      {isDone ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : isActive ? (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-inner relative">
                          <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                          <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-20 animate-ping"></div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0"></div>
                      )}
                      
                      <span className={`text-[15px] font-semibold transition-all duration-300 ${
                        isDone ? 'text-slate-700 dark:text-slate-300' :
                        isActive ? 'text-indigo-700 dark:text-indigo-400 translate-x-1' :
                        'text-slate-400 dark:text-slate-600'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
