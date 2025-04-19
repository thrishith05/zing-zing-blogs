import React, { useState, useEffect, useRef } from 'react';
import { AtSign, Server, User, Mail, ArrowRight, Lock } from 'lucide-react';

const EmailSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'smtp' | 'imap'>('smtp');
  const maxSteps = activeTab === 'smtp' ? 4 : 3;
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
  }, [isPlaying, step, maxSteps]);

  const renderSMTPAnimation = () => {
    return (
      <div className="relative h-80 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-hidden">
        {/* Sender */}
        <div className="absolute left-8 top-1/3 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <User className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Sender</p>
        </div>

        {/* SMTP Server */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">SMTP Server</p>
        </div>

        {/* Recipient's Mail Server */}
        <div className="absolute right-8 top-1/3 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-green-500 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Recipient's Server</p>
        </div>

        {/* Recipient */}
        <div className="absolute right-8 bottom-1/4 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <User className="h-10 w-10 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Recipient</p>
        </div>

        {/* Email Composition */}
        {step >= 1 && (
          <div className="absolute left-8 top-2/3 w-24 bg-white dark:bg-slate-700 p-2 rounded-lg shadow-md flex flex-col items-center">
            <Mail className={`h-6 w-6 text-blue-500 dark:text-blue-400 ${step === 1 ? 'animate-pulse' : ''}`} />
            <div className="mt-1 w-full">
              <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full w-full mb-1"></div>
              <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full w-3/4 mb-1"></div>
              <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full w-1/2"></div>
            </div>
          </div>
        )}

        {/* SMTP Transfer */}
        {step >= 2 && (
          <div className="absolute left-[110px] top-1/2 w-[calc(50%-110px)] h-0.5 bg-blue-500">
            <div className={`absolute top-0 right-0 w-4 h-4 -mt-2 rounded-full bg-blue-500 ${step === 2 ? 'animate-ping' : 'opacity-100'}`}></div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded flex items-center">
              <ArrowRight className="h-3 w-3 mr-1" />
              SMTP
            </div>
          </div>
        )}

        {/* Server to Server Transfer */}
        {step >= 3 && (
          <div className="absolute left-[calc(50%+4px)] top-1/3 w-[calc(50%-110px)] h-0.5 bg-green-500">
            <div className={`absolute top-0 right-0 w-4 h-4 -mt-2 rounded-full bg-green-500 ${step === 3 ? 'animate-ping' : 'opacity-100'}`}></div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              TLS Encryption
            </div>
          </div>
        )}

        {/* Email Delivery */}
        {step >= 4 && (
          <div className="absolute right-8 top-[calc(1/3*100%+40px)] h-[calc(5/12*100%-40px)] w-0.5 bg-amber-500">
            <div className={`absolute bottom-0 left-0 w-4 h-4 -ml-2 rounded-full bg-amber-500 ${step === 4 ? 'animate-ping' : 'opacity-100'}`}></div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-medium px-2 py-1 rounded flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              Delivery
            </div>
          </div>
        )}

        {/* Status Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {step === 0 && "Click 'Start' to see SMTP protocol in action"}
            {step === 1 && "Step 1: User composes an email"}
            {step === 2 && "Step 2: Email client sends message to SMTP server"}
            {step === 3 && "Step 3: SMTP server transfers message to recipient's mail server"}
            {step === 4 && "Step 4: Recipient retrieves the email"}
          </p>
        </div>
      </div>
    );
  };

  const renderIMAPAnimation = () => {
    return (
      <div className="relative h-80 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-hidden">
        {/* Mail Client */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <User className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Mail Client</p>
        </div>

        {/* IMAP Server */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">IMAP Server</p>
        </div>

        {/* Connection Establishment */}
        {step >= 1 && (
          <div className="absolute left-[76px] top-[calc(50%-10px)] w-[calc(100%-152px)] h-0.5 bg-green-500">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              IMAP Connection (SSL/TLS)
            </div>
            <div className={`absolute top-0 left-1/4 w-4 h-4 -mt-2 rounded-full bg-green-500 ${step === 1 ? 'animate-ping' : 'opacity-100'}`}></div>
          </div>
        )}

        {/* Data Synchronization */}
        {step >= 2 && (
          <div className="absolute left-[76px] top-[calc(50%+10px)] w-[calc(100%-152px)] h-0.5 bg-blue-500">
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
              Mailbox Synchronization
            </div>
            <div className={`absolute top-0 right-1/4 w-4 h-4 -mt-2 rounded-full bg-blue-500 ${step === 2 ? 'animate-ping' : 'opacity-100'}`}></div>
          </div>
        )}

        {/* Mail Display */}
        {step >= 3 && (
          <div className="absolute left-20 top-[calc(50%-50px)] w-48 h-32 bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 animate-fade-in">
            <div className="flex items-center mb-2">
              <AtSign className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" />
              <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full flex-grow"></div>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full w-3/4 mb-1.5"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full w-full mb-1.5"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full w-1/2 mb-1.5"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full w-3/4 mb-1.5"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full w-2/3"></div>
          </div>
        )}

        {/* Status Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {step === 0 && "Click 'Start' to see IMAP protocol in action"}
            {step === 1 && "Step 1: Client establishes secure connection to IMAP server"}
            {step === 2 && "Step 2: Server synchronizes mailbox contents with client"}
            {step === 3 && "Step 3: Client displays emails while maintaining connection"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="email" className="scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4">
            Email Protocols
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Email Communication Systems</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Email protocols enable the sending, receiving, and storage of electronic mail across networks. These protocols handle different aspects of email handling, from transmission to retrieval and organization.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Key Email Protocols</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li><span className="font-medium text-blue-600 dark:text-blue-400">SMTP</span> - Simple Mail Transfer Protocol (for sending emails)</li>
                <li><span className="font-medium text-green-600 dark:text-green-400">IMAP</span> - Internet Message Access Protocol (for retrieving emails)</li>
                <li><span className="font-medium text-amber-600 dark:text-amber-400">POP3</span> - Post Office Protocol (for downloading emails)</li>
                <li><span className="font-medium text-purple-600 dark:text-purple-400">MIME</span> - Multipurpose Internet Mail Extensions (for attachments)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Email Security</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li><span className="font-medium text-red-600 dark:text-red-400">SPF</span> - Sender Policy Framework (for authentication)</li>
                <li><span className="font-medium text-orange-600 dark:text-orange-400">DKIM</span> - DomainKeys Identified Mail (for email signing)</li>
                <li><span className="font-medium text-yellow-600 dark:text-yellow-400">DMARC</span> - Domain-based Message Authentication (for policy enforcement)</li>
                <li><span className="font-medium text-emerald-600 dark:text-emerald-400">S/MIME</span> - Secure/Multipurpose Internet Mail Extensions (for encryption)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
              <button
                onClick={() => {
                  setActiveTab('smtp');
                  setIsPlaying(false);
                  setStep(0);
                }}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'smtp'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                SMTP (Sending)
              </button>
              <button
                onClick={() => {
                  setActiveTab('imap');
                  setIsPlaying(false);
                  setStep(0);
                }}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'imap'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                IMAP (Receiving)
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {activeTab === 'smtp' ? 'SMTP Protocol Flow' : 'IMAP Protocol Flow'}
            </h3>
            
            {activeTab === 'smtp' ? renderSMTPAnimation() : renderIMAPAnimation()}
            
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

export default EmailSection;