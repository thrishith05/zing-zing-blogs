import React from 'react';
import { Github, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-semibold text-slate-800 dark:text-white">
              NetworkEdu
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:space-x-8 text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-2 md:mb-0">© {new Date().getFullYear()} NetworkEdu. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;