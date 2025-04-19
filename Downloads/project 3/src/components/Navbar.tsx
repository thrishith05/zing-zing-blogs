import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { NetworkIcon, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NetworkIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-slate-800 dark:text-white">
              NetworkEdu
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dns" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              DNS
            </a>
            <a href="#dhcp" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              DHCP
            </a>
            <a href="#ftp" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              FTP
            </a>
            <a href="#http" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              HTTP/HTTPS
            </a>
            <a href="#email" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              Email
            </a>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Sun size={20} className="text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Sun size={18} className="text-slate-600 dark:text-slate-300" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              aria-label="Open menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu size={24} className="text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-800 shadow-lg">
            <a 
              href="#dns" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
            >
              DNS
            </a>
            <a 
              href="#dhcp" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
            >
              DHCP
            </a>
            <a 
              href="#ftp" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
            >
              FTP
            </a>
            <a 
              href="#http" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
            >
              HTTP/HTTPS
            </a>
            <a 
              href="#email" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition-colors"
              onClick={toggleMenu}
            >
              Email
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;