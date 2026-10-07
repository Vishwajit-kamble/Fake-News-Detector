import { BrainCircuit, ShieldAlert, Zap, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-8">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
            Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">TruthLens AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            An experimental AI-powered news analysis engine designed to help readers identify misleading language, surface underlying biases, and verify claims at the speed of thought.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[
            { 
              icon: BrainCircuit, 
              color: "text-indigo-500", 
              bg: "bg-indigo-50 dark:bg-indigo-500/10",
              border: "group-hover:border-indigo-500/30",
              title: "Neural Language Processing", 
              desc: "Powered by Gemini 2.5 Flash, our engine processes complex semantics to detect subtle emotional manipulation and sensationalism that traditional filters miss." 
            },
            { 
              icon: ShieldAlert, 
              color: "text-emerald-500", 
              bg: "bg-emerald-50 dark:bg-emerald-500/10",
              border: "group-hover:border-emerald-500/30",
              title: "Transparent & Explainable", 
              desc: "We don't just output a black-box credibility score. We break down exactly which phrases and claims triggered our algorithms, so you understand the 'why'." 
            },
            { 
              icon: Zap, 
              color: "text-amber-500", 
              bg: "bg-amber-50 dark:bg-amber-500/10",
              border: "group-hover:border-amber-500/30",
              title: "Real-time Grounding", 
              desc: "When analyzing articles, TruthLens instantly queries live Google Search results to ground claims against current real-world news sources." 
            },
            { 
              icon: BookOpen, 
              color: "text-blue-500", 
              bg: "bg-blue-50 dark:bg-blue-500/10",
              border: "group-hover:border-blue-500/30",
              title: "Educational Focus", 
              desc: "By continually exposing misleading journalistic techniques, we aim to train readers to become better, more resilient critical thinkers in the digital age." 
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              className={`group bg-white/60 dark:bg-[#0a0f1c]/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.border}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-3 ${item.bg} ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-10 rounded-3xl border border-amber-200/50 dark:border-amber-900/50 max-w-4xl mx-auto overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <AlertTriangle className="w-48 h-48 text-amber-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Important Disclaimer</h2>
            </div>
            
            <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              <p>
                TruthLens AI is an <strong className="font-medium text-slate-900 dark:text-amber-100">experimental tool</strong> meant to assist human judgment, not replace it. The AI models used to analyze text can occasionally hallucinate, exhibit bias, or misinterpret nuances in complex journalism.
              </p>
              <p>
                A <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-sm font-semibold mx-1">Likely Credible</span> score does not guarantee absolute truth, and a <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm font-semibold mx-1">Potentially Misleading</span> score does not mean an article is entirely false. Always consult multiple reliable sources for important news.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
