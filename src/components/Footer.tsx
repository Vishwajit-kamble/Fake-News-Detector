import { Link } from 'react-router-dom';
import { ScanSearch } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <ScanSearch className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">TruthLens AI</span>
            </Link>
            <p className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-4">
              Think before you believe.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
              Built for responsible AI-assisted information analysis. TruthLens AI uses advanced language models to identify potentially misleading content and credibility signals in news articles.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/analyze" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Analyze</Link></li>
              <li><Link to="/#how-it-works" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</Link></li>
              <li><Link to="/history" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">History</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} TruthLens AI. All rights reserved.
          </p>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Experimental AI Platform
          </div>
        </div>
      </div>
    </footer>
  );
}
