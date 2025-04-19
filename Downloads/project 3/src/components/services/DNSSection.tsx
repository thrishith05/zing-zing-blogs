import React, { useState, useEffect, useRef } from 'react';
import { Globe, Database, Server, Laptop } from 'lucide-react';

const DNSSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const maxSteps = 5;
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
        {/* Client */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Laptop className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Client</p>
        </div>

        {/* Local DNS Resolver */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-green-500 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Local DNS</p>
        </div>

        {/* Root DNS Server */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Database className="h-10 w-10 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Root DNS</p>
        </div>

        {/* TLD DNS Server */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Database className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">TLD DNS</p>
        </div>

        {/* Authoritative DNS Server */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Database className="h-10 w-10 text-red-500 dark:text-red-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Auth DNS</p>
        </div>

        {/* Web Server */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Globe className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Web Server</p>
        </div>

        {/* Query Lines */}
        {step >= 1 && (
          <div className={`absolute left-[72px] top-1/2 w-[calc(25%-88px)] h-0.5 bg-blue-500 ${step === 1 ? 'animate-dns-query' : ''}`}></div>
        )}
        
        {step >= 2 && (
          <>
            <div className={`absolute left-1/4 top-[calc(50%-1px)] w-0.5 h-[calc(25%-1px)] bg-green-500 ${step === 2 ? 'animate-dns-query-vertical' : ''}`}></div>
            <div className={`absolute left-1/4 top-1/4 w-[calc(25%-1px)] h-0.5 bg-green-500 ${step === 2 ? 'animate-dns-query' : ''}`}></div>
          </>
        )}

        {step >= 3 && (
          <>
            <div className={`absolute left-1/2 top-[calc(25%+1px)] w-0.5 h-[calc(25%-1px)] bg-purple-500 ${step === 3 ? 'animate-dns-response-vertical' : ''}`}></div>
            <div className={`absolute left-1/2 top-1/2 w-[calc(25%-1px)] h-0.5 bg-purple-500 ${step === 3 ? 'animate-dns-response' : ''}`}></div>
          </>
        )}

        {step >= 4 && (
          <div className={`absolute left-[calc(75%-1px)] top-1/2 w-[calc(25%-72px)] h-0.5 bg-yellow-500 ${step === 4 ? 'animate-dns-query' : ''}`}></div>
        )}

        {step >= 5 && (
          <>
            <div className={`absolute left-1/4 top-[calc(50%+1px)] w-0.5 h-[calc(25%-1px)] bg-red-500 ${step === 5 ? 'animate-dns-response-vertical' : ''}`}></div>
            <div className={`absolute left-1/4 top-3/4 w-[calc(25%-1px)] h-0.5 bg-red-500 ${step === 5 ? 'animate-dns-response' : ''}`}></div>
          </>
        )}

        {/* Status Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {step === 0 && "Click 'Start' to see DNS resolution in action"}
            {step === 1 && "Step 1: Client requests domain name resolution from local DNS resolver"}
            {step === 2 && "Step 2: Local DNS queries root nameserver"}
            {step === 3 && "Step 3: Root nameserver refers to TLD nameserver (.com, .org, etc.)"}
            {step === 4 && "Step 4: TLD nameserver refers to authoritative nameserver"}
            {step === 5 && "Step 5: Authoritative nameserver returns IP address to client"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="dns" className="scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
            DNS (Domain Name System)
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Domain Name Resolution</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            DNS is the internet's naming system, translating human-friendly domain names (like example.com) to machine-readable IP addresses (like 192.0.2.1) that computers use to identify each other.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Key Components</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>DNS Resolver (Recursive Resolver)</li>
                <li>Root Nameservers</li>
                <li>Top-Level Domain (TLD) Nameservers</li>
                <li>Authoritative Nameservers</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Security Features</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>DNSSEC (DNS Security Extensions)</li>
                <li>DNS over HTTPS (DoH)</li>
                <li>DNS over TLS (DoT)</li>
                <li>DNS Filtering for Threat Protection</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">DNS Resolution Process</h3>
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

export default DNSSection;