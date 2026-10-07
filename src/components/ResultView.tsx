import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, HelpCircle, Shield, AlertCircle, FileText, Link as LinkIcon, ExternalLink, RefreshCw, Info } from 'lucide-react';
import type { AnalyzeResponse } from '../lib/api';

interface ResultViewProps {
  article: string;
  result: AnalyzeResponse;
  onReset: () => void;
}

export default function ResultView({ article, result, onReset }: ResultViewProps) {
  
  const getClassificationConfig = () => {
    switch (result.classification) {
      case 'likely_credible': return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle, label: 'Likely Credible', ring: 'ring-emerald-500/30', bar: '#10B981', glow: 'shadow-emerald-500/20' };
      case 'potentially_misleading': return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertTriangle, label: 'Potentially Misleading', ring: 'ring-red-500/30', bar: '#EF4444', glow: 'shadow-red-500/20' };
      case 'needs_verification': return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: HelpCircle, label: 'Needs Verification', ring: 'ring-amber-500/30', bar: '#F59E0B', glow: 'shadow-amber-500/20' };
      default: return { color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: HelpCircle, label: 'Unknown', ring: 'ring-indigo-500/30', bar: '#6366f1', glow: 'shadow-indigo-500/20' };
    }
  };

  const config = getClassificationConfig();
  const Icon = config.icon;

  const getSignalColor = (level: string, invert: boolean) => {
    if (invert) {
      if (level === 'high') return 'bg-emerald-500';
      if (level === 'medium') return 'bg-amber-500';
      return 'bg-red-500';
    } else {
      if (level === 'high') return 'bg-red-500';
      if (level === 'medium') return 'bg-amber-500';
      return 'bg-emerald-500';
    }
  };

  const getSignalPercentage = (level: string) => {
    if (level === 'high') return '100%';
    if (level === 'medium') return '50%';
    return '15%';
  };

  const highlightText = (text: string, phrases: string[]) => {
    if (!phrases || phrases.length === 0) return text;
    
    let highlightedText = text;
    phrases.forEach(phrase => {
      if (!phrase) return;
      const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-amber-500/20 text-amber-900 dark:text-amber-200 px-1 rounded border-b border-amber-500/40 font-medium cursor-help" title="Flagged by AI">$1</mark>`);
    });
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto w-full pb-24 relative z-10"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pt-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Analysis Report</h1>
        <button 
          onClick={onReset} 
          className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-lg"
        >
          <RefreshCw className="w-4 h-4" /> Analyze Another
        </button>
      </div>

      <motion.div variants={itemVariants} className={`bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-2xl rounded-[2rem] border ${config.border} shadow-2xl ${config.glow} overflow-hidden mb-8 relative group`}>
        {/* Glow effect */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${config.bg} rounded-full blur-[100px] -mr-48 -mt-48 opacity-50`}></div>
        
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
          <div className="flex-1 w-full">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" /> AI Verdict
            </div>
            
            <div className={`inline-flex items-center gap-3 ${config.color} ${config.bg} px-6 py-3 rounded-2xl font-bold text-2xl mb-8 border ${config.border} ring-4 ${config.ring} shadow-lg`}>
              <Icon className="w-7 h-7" />
              {config.label}
            </div>
            
            <div className="bg-slate-50/80 dark:bg-[#030712]/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative">
              <div className="absolute top-0 left-6 -mt-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/30 flex items-center gap-1.5">
                <Info className="w-3 h-3" /> Explanation
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-serif mt-2">
                {result.explanation}
              </p>
            </div>
          </div>

          <div className="w-64 shrink-0 flex flex-col items-center">
             <div className="w-48 h-48 mb-6 relative">
                {/* Outer glowing ring */}
                <div className={`absolute inset-0 rounded-full border-4 ${config.border} opacity-50 animate-[spin_10s_linear_infinite]`}></div>
                <div className={`absolute inset-2 rounded-full border border-dashed ${config.border} opacity-30 animate-[spin_15s_linear_infinite_reverse]`}></div>
                
                <div className="absolute inset-4">
                  <CircularProgressbar
                    value={result.credibility_score}
                    text={`${result.credibility_score}`}
                    strokeWidth={6}
                    styles={buildStyles({
                      pathColor: config.bar,
                      textColor: 'transparent', // We'll render text manually for better styling
                      trailColor: 'rgba(100, 116, 139, 0.1)',
                      strokeLinecap: 'round',
                    })}
                  />
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-6xl font-light tracking-tighter ${config.color}`}>{result.credibility_score}</span>
                  <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">Score</span>
                </div>
             </div>
             
             <div className="text-center bg-slate-50/50 dark:bg-slate-800/30 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
               <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
               <div className="text-xl font-bold text-slate-900 dark:text-white">{(result.confidence * 100).toFixed(0)}%</div>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Credibility Signals */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-500"><AlertCircle className="w-5 h-5" /></div> 
            Credibility Signals
          </h3>
          
          <div className="space-y-6">
            {[
              { label: 'Sensational Language', val: result.signals?.sensational_language, invert: false },
              { label: 'Emotional Language', val: result.signals?.emotional_language, invert: false },
              { label: 'Unsupported Claims', val: result.signals?.unsupported_claims, invert: false },
              { label: 'Evidence Provided', val: result.signals?.evidence, invert: true },
              { label: 'Neutrality', val: result.signals?.neutrality, invert: true },
            ].map((sig, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{sig.label}</span>
                  <span className="text-slate-500 uppercase tracking-wider text-xs font-bold">{sig.val || 'unknown'}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden shadow-inner relative">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: getSignalPercentage(sig.val || 'low') }}
                     transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                     className={`absolute top-0 bottom-0 left-0 rounded-full ${getSignalColor(sig.val || 'low', sig.invert)} relative overflow-hidden`}
                   >
                     <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                   </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Phrases & Info */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl text-amber-500"><FileText className="w-5 h-5" /></div> 
              Flagged Phrases
            </h3>
            
            {result.key_phrases && result.key_phrases.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {result.key_phrases.map((phrase, i) => (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    key={i} 
                    className="inline-flex items-center px-4 py-2 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 rounded-xl text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors cursor-default"
                  >
                    "{phrase}"
                  </motion.span>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-slate-500 dark:text-slate-400 font-medium">No specific suspicious phrases detected.</p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/50">
               <div className="bg-slate-50/80 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">System Info</h4>
                   <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded">Gemini 2.5 Flash</span>
                 </div>
                 <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                   <strong className="text-amber-600 dark:text-amber-500 font-semibold">Disclaimer:</strong> AI analysis can make mistakes. This result should not be treated as definitive proof. Verify important claims using reliable sources.
                 </p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Links */}
      {result.related_links && result.related_links.length > 0 && (
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40 mb-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-500"><LinkIcon className="w-5 h-5" /></div> 
            Related Grounded Sources
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.related_links.map((link, i) => {
              if (!link || link.includes("Provide 1-3")) return null;
              
              let hostname = "link";
              let url = link.startsWith('http') ? link : `https://${link}`;
              try { hostname = new URL(url).hostname; } catch {}

              return (
                <motion.a 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  key={i} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white dark:bg-slate-900/50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/50 group"
                >
                  <img 
                    src={`https://icon.horse/icon/${hostname}`} 
                    alt={hostname}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 object-contain shrink-0 group-hover:scale-110 transition-transform shadow-sm" 
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{hostname}</div>
                    <div className="truncate text-xs text-slate-500 dark:text-slate-400 mt-0.5">{link}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Article Text */}
      <motion.div variants={itemVariants} className="bg-white/60 dark:bg-[#0a0f1c]/80 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40">
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Analyzed Article Text</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-loose font-serif text-lg bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/50">
          {highlightText(article, result.key_phrases)}
        </div>
      </motion.div>
    </motion.div>
  );
}
