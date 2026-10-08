import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldAlert, FileSearch, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#030712] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-40">
        {/* Abstract Premium Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Animated gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-600/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '9s' }}></div>
          
          {/* Grain overlay for texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              TruthLens AI 2.0 is Live
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                Think Before <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 animate-gradient-x">
                  You Believe.
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Paste any news article and let our AI instantly analyze its language, claims, and credibility signals with absolute precision.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/analyze"
                className="group relative inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                Analyze an Article 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full sm:w-auto"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              <span className="flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-emerald-500" /> Neutral & Unbiased</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-2"><FileSearch className="w-4 h-4 text-blue-500" /> Web-Grounded</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Real-time</span>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-32 bg-white dark:bg-[#050b14] relative z-10 border-t border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">More than a Fake/Real label.</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">
              We look past the headline to understand the precise linguistic signals, claims, and missing evidence behind every article.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BrainCircuit, title: 'Deep AI Analysis', desc: 'Powered by Gemini 2.5 to understand nuanced context, not just keywords.' },
              { icon: ShieldCheck, title: 'Signal Detection', desc: 'Identifies sensationalism, emotional bias, and structural fallacies.' },
              { icon: FileSearch, title: 'Source Grounding', desc: 'Searches the live web to find the original related news sources.' },
              { icon: Zap, title: 'Instant Processing', desc: 'Get a comprehensive breakdown and credibility score in seconds.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-slate-50 dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800/50 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">How TruthLens works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">From raw text to deep insight in four simple steps.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-500 to-indigo-200 dark:from-indigo-900/50 dark:via-indigo-500/50 dark:to-indigo-900/50 -z-10 rounded-full"></div>
            
            {[
              { num: '01', title: 'Paste', desc: 'Paste any news article text into the analyzer.' },
              { num: '02', title: 'Process', desc: 'Our AI engine parses and normalizes the content.' },
              { num: '03', title: 'Evaluate', desc: 'Real-time web grounding and linguistic analysis runs.' },
              { num: '04', title: 'Understand', desc: 'Review the detailed credibility report and sources.' }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-[#030712] shadow-xl rounded-full flex items-center justify-center text-2xl font-black text-indigo-600 dark:text-indigo-400 mb-8 relative z-10 group-hover:scale-110 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed px-2">{step.desc}</p>
                
                {i < 3 && <div className="md:hidden flex justify-center py-8 text-indigo-300 dark:text-indigo-800/50"><ArrowRight className="w-6 h-6 rotate-90" /></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Stop guessing. Start knowing.
          </h2>
          <Link
            to="/analyze"
            className="inline-flex justify-center items-center gap-2 px-10 py-5 rounded-full text-lg font-bold text-indigo-600 bg-white hover:bg-slate-50 hover:scale-105 transition-all shadow-2xl"
          >
            Analyze Your First Article <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
