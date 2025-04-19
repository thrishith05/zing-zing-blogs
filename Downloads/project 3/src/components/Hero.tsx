import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Network, Shield, Globe, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingIcons = [
    { Icon: Network, delay: 0, x: -20, y: -20 },
    { Icon: Shield, delay: 0.2, x: 20, y: 20 },
    { Icon: Globe, delay: 0.4, x: -30, y: 30 },
    { Icon: Cpu, delay: 0.6, x: 30, y: -30 },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </motion.div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: 0.2, x, y }}
          transition={{
            delay,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            left: `${25 + (index * 15)}%`,
            top: `${20 + (index * 10)}%`
          }}
        >
          <Icon className="h-12 w-12 text-white" />
        </motion.div>
      ))}

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/20">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-blue-400"></span>
              <span className="text-blue-200 text-sm font-medium">Interactive Network Protocols</span>
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Essential Network Services
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Explore the architecture, functionality, and security aspects of critical network protocols through interactive simulations.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-10"
          >
            <motion.a 
              href="#dns" 
              className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring
              <ArrowDown className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-8 w-8 text-blue-100" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Wave SVG */}
      <motion.svg 
        className="absolute bottom-0 w-full h-12 text-slate-50 dark:text-slate-900" 
        preserveAspectRatio="none" 
        viewBox="0 0 1440 48"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <path 
          fill="currentColor" 
          d="M0,48 L1440,48 L1440,0 C1380,24 1320,36 1260,36 C1080,36 900,0 720,0 C540,0 360,36 180,36 C120,36 60,24 0,0 L0,48 Z" 
        />
      </motion.svg>
    </div>
  );
};

export default Hero;