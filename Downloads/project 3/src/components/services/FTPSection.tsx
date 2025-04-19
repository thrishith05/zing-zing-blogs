import React, { useState, useEffect, useRef } from 'react';
import { Server, Laptop, Upload, Download, Lock } from 'lucide-react';

const FTPSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'secure'>('standard');
  const maxSteps = 6;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    setIsPlaying(true);
    setStep(0);
  };

  const stopSimulation = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (step < maxSteps) {
        timerRef.current = setTimeout(() => {
          setStep(prevStep => prevStep + 1);
        }, 1500);
      } else {
        setIsPlaying(false);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, step]);

  const renderAnimation = () => {
    return (
      <div className="relative h-80 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-hidden">
        {/* FTP Client */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Laptop className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">FTP Client</p>
        </div>

        {/* FTP Server */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">FTP Server</p>
        </div>

        {/* Control Channel */}
        {(step >= 1 && activeTab === 'standard') && (
          <div className="absolute left-[76px] top-[calc(50%-12px)] w-[calc(100%-152px)] h-1 bg-green-500">
            <div className={`absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded`}>
              Control Channel (Port 21) - Commands
            </div>
            {/* Command Packet */}
            {step === 1 && (
              <div className="absolute top-0 left-1/4 w-4 h-4 -mt-2 -ml-2 rounded-full bg-green-500 animate-ping"></div>
            )}
            {/* Response Packet */}
            {step === 2 && (
              <div className="absolute top-0 right-1/4 w-4 h-4 -mt-2 -mr-2 rounded-full bg-green-500 animate-ping"></div>
            )}
          </div>
        )}

        {/* SSL/TLS Encryption for FTPS */}
        {(activeTab === 'secure') && (
          <div className="absolute left-[76px] top-[calc(50%-12px)] w-[calc(100%-152px)] h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full">
            <div className="absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              SSL/TLS Encrypted Channel
            </div>
            {/* Encrypted Command Packet */}
            {(step === 1 && activeTab === 'secure') && (
              <div className="absolute top-0 left-1/4 w-4 h-4 -mt-0 -ml-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-ping"></div>
            )}
            {/* Encrypted Response Packet */}
            {(step === 2 && activeTab === 'secure') && (
              <div className="absolute top-0 right-1/4 w-4 h-4 -mt-0 -mr-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-ping"></div>
            )}
          </div>
        )}

        {/* Data Channel */}
        {(step >= 3 && activeTab === 'standard') && (
          <div className="absolute left-[76px] top-[calc(50%+12px)] w-[calc(100%-152px)] h-1 bg-blue-500">
            <div className={`absolute bottom-0 -mb-8 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded`}>
              Data Channel (Port 20) - File Transfer
            </div>
            {/* Upload Data Packet */}
            {(step === 3 || step === 5) && (
              <div className="absolute top-0 left-1/3 w-6 h-6 -mt-3 -ml-3 flex items-center justify-center">
                <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
            )}
            {/* Download Data Packet */}
            {(step === 4 || step === 6) && (
              <div className="absolute top-0 right-1/3 w-6 h-6 -mt-3 -mr-3 flex items-center justify-center">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
            )}
          </div>
        )}

        {/* FTPS Data Encryption */}
        {(step >= 3 && activeTab === 'secure') && (
          <div className="absolute left-[76px] top-[calc(50%+12px)] w-[calc(100%-152px)] h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full">
            <div className={`absolute bottom-0 -mb-8 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded flex items-center`}>
              <Lock className="h-3 w-3 mr-1" />
              Encrypted File Transfer
            </div>
            {/* Encrypted Upload Data */}
            {(step === 3 || step === 5) && (
              <div className="absolute top-0 left-1/3 w-6 h-6 -mt-1 -ml-3 flex items-center justify-center">
                <Upload className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-pulse" />
              </div>
            )}
            {/* Encrypted Download Data */}
            {(step === 4 || step === 6) && (
              <div className="absolute top-0 right-1/3 w-6 h-6 -mt-1 -mr-3 flex items-center justify-center">
                <Download className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-pulse" />
              </div>
            )}
          </div>
        )}

        {/* Status Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {step === 0 && `Click 'Start' to see ${activeTab === 'secure' ? 'FTPS' : 'FTP'} in action`}
            {step === 1 && "Step 1: Client sends command (login, list, get, put)"}
            {step === 2 && "Step 2: Server acknowledges command"}
            {step === 3 && "Step 3: Initial data transfer (upload)"}
            {step === 4 && "Step 4: Server response with data (download)"}
            {step === 5 && "Step 5: Continued file upload"}
            {step === 6 && "Step 6: Completed file transfer"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="ftp" className="scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 text-sm font-medium mb-4">
            FTP (File Transfer Protocol)
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">File Transfer & Management</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            FTP enables the transfer of files between clients and servers on a network. It provides mechanisms for authentication, file navigation, and bidirectional file transfers, supporting both interactive user sessions and automated processes.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>User authentication</li>
                <li>Directory navigation and file operations</li>
                <li>Binary and ASCII transfer modes</li>
                <li>Active and passive connection modes</li>
                <li>Resumable file transfers</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Secure Variants</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>FTPS (FTP Secure) - FTP with SSL/TLS</li>
                <li>SFTP (SSH File Transfer Protocol)</li>
                <li>SCP (Secure Copy Protocol)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
              <button
                onClick={() => setActiveTab('standard')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'standard'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Standard FTP
              </button>
              <button
                onClick={() => setActiveTab('secure')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'secure'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Secure FTPS
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {activeTab === 'standard' ? 'FTP Protocol Flow' : 'FTPS (Secure FTP) Protocol Flow'}
            </h3>
            
            {renderAnimation()}
            
            <div className="flex justify-center mt-4">
              <button
                onClick={isPlaying ? stopSimulation : startSimulation}
                className={`px-4 py-2 rounded-md font-medium ${
                  isPlaying
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors`}
              >
                {isPlaying ? 'Stop' : 'Start Simulation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FTPSection;