import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldAlert, FileSearch, Zap, ArrowRight, ShieldCheck, Search, Activity } from 'lucide-react';

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

          {/* Premium Floating Interactive Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.2 }}
            className="mt-24 max-w-4xl mx-auto perspective-1000"
          >
            <div className="relative rounded-3xl bg-white/40 dark:bg-[#0a0f1c]/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-2 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 group transform-gpu hover:rotate-x-2 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="bg-white/90 dark:bg-slate-950/90 rounded-2xl p-6 md:p-10 relative overflow-hidden">
                {/* Decorative gradients inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="flex flex-col md:flex-row gap-10 relative z-10">
                  <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      <Activity className="w-3.5 h-3.5 text-indigo-500" /> Live Analysis Example
                    </div>
                    
                    <h3 className="text-2xl font-serif text-slate-900 dark:text-white leading-snug">
                      "Miracle Superfood Diet Instantly Reverses Aging, Scientists Baffled!"
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">Sensational Language</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Uses highly emotional and absolute terms ("Miracle", "Instantly Reverses").</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 transition-colors hover:bg-amber-50 dark:hover:bg-amber-500/10">
                        <Search className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">Unverified Claims</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Fails to cite specific scientists or peer-reviewed studies.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-72 shrink-0 flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    {/* Ring animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border border-red-500/20 rounded-full absolute animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="w-40 h-40 border border-red-500/40 rounded-full absolute animate-spin" style={{ animationDuration: '10s' }}></div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-4 bg-red-100/50 dark:bg-red-500/20 px-4 py-1.5 rounded-full border border-red-200 dark:border-red-500/30">
                        <ShieldAlert className="w-4 h-4" /> Potentially Misleading
                      </div>
                      <div className="text-6xl font-light text-slate-900 dark:text-white tracking-tighter mb-1">
                        14<span className="text-3xl text-slate-400">%</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Credibility Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
