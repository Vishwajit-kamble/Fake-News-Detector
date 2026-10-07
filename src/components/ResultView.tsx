import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, HelpCircle, Shield, AlertCircle, FileText } from 'lucide-react';
import type { AnalyzeResponse } from '../lib/api';

interface ResultViewProps {
  article: string;
  result: AnalyzeResponse;
  onReset: () => void;
}

export default function ResultView({ article, result, onReset }: ResultViewProps) {
  
  const getClassificationConfig = () => {
    switch (result.classification) {
      case 'likely_credible': return { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCircle, label: 'Likely Credible', ring: 'ring-emerald-500', bar: '#10B981' };
      case 'potentially_misleading': return { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', icon: AlertTriangle, label: 'Potentially Misleading', ring: 'ring-red-500', bar: '#EF4444' };
      case 'needs_verification': return { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', icon: HelpCircle, label: 'Needs Verification', ring: 'ring-amber-500', bar: '#F59E0B' };
      default: return { color: 'text-slate-500', bg: 'bg-slate-50', icon: HelpCircle, label: 'Unknown', ring: 'ring-slate-500', bar: '#64748B' };
    }
  };

  const config = getClassificationConfig();
  const Icon = config.icon;

  const getSignalColor = (level: string) => {
    if (level === 'high') return 'bg-red-500';
    if (level === 'medium') return 'bg-amber-500';
    return 'bg-emerald-500';
  };
  
  const getGoodSignalColor = (level: string) => {
    if (level === 'high') return 'bg-emerald-500';
    if (level === 'medium') return 'bg-amber-500';
    return 'bg-red-500';
  };

  const highlightText = (text: string, phrases: string[]) => {
    if (!phrases || phrases.length === 0) return text;
    
    let highlightedText = text;
    phrases.forEach(phrase => {
      if (!phrase) return;
      const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-1 rounded-sm">$1</mark>`);
    });
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full pb-20"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analysis Result</h1>
        <button onClick={onReset} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          Analyze Another
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1 w-full">
            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-4">AI Assessment</div>
            <div className={`inline-flex items-center gap-2 ${config.color} ${config.bg} px-4 py-2 rounded-full font-medium text-lg mb-6 ring-1 ring-inset ${config.ring}/20`}>
              <Icon className="w-5 h-5" />
              {config.label}
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-5 border border-slate-100 dark:border-slate-800 relative">
              <Shield className="absolute top-5 right-5 w-5 h-5 text-indigo-200 dark:text-indigo-900/50" />
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">AI Explanation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>

          <div className="w-48 shrink-0 flex flex-col items-center">
             <div className="w-32 h-32 mb-4 relative">
                <CircularProgressbar
                  value={result.credibility_score}
                  text={`${result.credibility_score}%`}
                  styles={buildStyles({
                    pathColor: config.bar,
                    textColor: 'var(--foreground)',
                    trailColor: 'rgba(100, 116, 139, 0.1)',
                    textSize: '24px',
                  })}
                />
             </div>
             <div className="text-center">
               <div className="font-semibold text-slate-900 dark:text-white">Confidence</div>
               <div className="text-sm text-slate-500 dark:text-slate-400">{(result.confidence * 100).toFixed(0)}% Certainty</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Credibility Signals */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-slate-400" /> Credibility Signals</h3>
          
          <div className="space-y-5">
            {[
              { label: 'Sensational Language', val: result.signals?.sensational_language, invert: false },
              { label: 'Emotional Language', val: result.signals?.emotional_language, invert: false },
              { label: 'Unsupported Claims', val: result.signals?.unsupported_claims, invert: false },
              { label: 'Evidence Provided', val: result.signals?.evidence, invert: true },
              { label: 'Neutrality', val: result.signals?.neutrality, invert: true },
            ].map((sig, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{sig.label}</span>
                  <span className="text-slate-500 capitalize">{sig.val || 'unknown'}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div 
                     className={`h-full ${sig.invert ? getGoodSignalColor(sig.val || 'low') : getSignalColor(sig.val || 'low')}`} 
                     style={{ width: sig.val === 'high' ? '100%' : sig.val === 'medium' ? '50%' : '15%' }}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Phrases */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-slate-400" /> Detected Phrases</h3>
          
          {result.key_phrases && result.key_phrases.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.key_phrases.map((phrase, i) => (
                <span key={i} className="inline-block px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 rounded-md text-sm">
                  "{phrase}"
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">No specific suspicious phrases detected.</p>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
             <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
               <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">AI Model Information</h4>
               <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                 <li><span className="font-medium text-slate-900 dark:text-slate-300">Model:</span> Gemini</li>
                 <li><span className="font-medium text-slate-900 dark:text-slate-300">Analysis:</span> AI-generated</li>
               </ul>
               <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                 <span className="font-medium text-amber-600 dark:text-amber-500">Disclaimer:</span> AI analysis can make mistakes. This result should not be treated as definitive proof that a news article is true or false. Verify important claims using reliable sources.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Article Text */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Original Article</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-lg">
          {highlightText(article, result.key_phrases)}
        </div>
      </div>
    </motion.div>
  );
}
