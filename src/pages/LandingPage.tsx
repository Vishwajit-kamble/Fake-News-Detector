import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldAlert, FileSearch, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950"></div>
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay dark:opacity-[0.03]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                Think Before <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  You Believe.
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Paste a news article and let TruthLens AI analyze its language, claims, and credibility signals in seconds.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/analyze"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 w-full sm:w-auto"
              >
                Analyze an Article &rarr;
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-full sm:w-auto"
              >
                How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-indigo-500" /> Powered by AI</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5"><FileSearch className="w-4 h-4 text-indigo-500" /> Explainable</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-500" /> Fast</span>
            </motion.div>
          </div>

          {/* Interactive Visual / Mock Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-1 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="bg-white dark:bg-slate-950 rounded-xl p-6 md:p-8 relative">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">📰</div>
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">News Analysis</div>
                    <div className="text-lg font-medium text-slate-900 dark:text-white truncate">"Government announces radical new tax policy..."</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">AI Assessment</div>
                    <div className="flex items-center gap-3 text-red-500 font-medium text-lg mb-6 bg-red-50 dark:bg-red-500/10 w-fit px-4 py-2 rounded-full">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      Potentially Misleading
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                        Sensational language detected
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <FileSearch className="w-4 h-4 text-amber-500" />
                        Lack of specific evidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center items-center md:items-end md:border-l md:border-slate-100 dark:md:border-slate-800 pl-8">
                    <div className="text-center">
                      <div className="text-5xl font-light text-slate-900 dark:text-white mb-2">92<span className="text-3xl text-slate-400">%</span></div>
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Confidence Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">More than a Fake/Real label.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Understand the signals behind the prediction.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BrainCircuit, title: 'AI Analysis', desc: 'Analyze article content using modern AI models.' },
              { icon: ShieldAlert, title: 'Credibility Signals', desc: 'Identify suspicious linguistic and structural patterns.' },
              { icon: FileSearch, title: 'Explainable Results', desc: 'Understand why the article received its assessment.' },
              { icon: Zap, title: 'Instant Analysis', desc: 'Get results within seconds.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl transition-shadow hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-200 dark:via-indigo-900/50 to-transparent -z-10"></div>
            
            {[
              { num: '01', title: 'Paste', desc: 'Paste your news headline and article.' },
              { num: '02', title: 'Analyze', desc: 'TruthLens AI processes the content.' },
              { num: '03', title: 'Evaluate', desc: 'AI examines language, claims, and signals.' },
              { num: '04', title: 'Understand', desc: 'Receive a detailed analysis and score.' }
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-950 border-4 border-slate-50 dark:border-slate-900 shadow-sm rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 px-4">{step.desc}</p>
                
                {i < 3 && <div className="md:hidden flex justify-center py-6 text-slate-300 dark:text-slate-700">&darr;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
