import React, { useState, useEffect, useRef } from 'react';
import { Server, Laptop, Router, Layers } from 'lucide-react';

const DHCPSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const maxSteps = 4;
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
        {/* DHCP Server */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Server className="h-10 w-10 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">DHCP Server</p>
        </div>

        {/* Router/Gateway */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Router className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Router</p>
        </div>

        {/* Client */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
            <Laptop className="h-10 w-10 text-green-500 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Client</p>
        </div>

        {/* Arrows and packets */}
        {step >= 1 && (
          <div className="absolute left-[76px] top-1/2 w-[calc(50%-88px)] h-0.5 bg-green-500">
            <div className={`absolute top-0 right-0 w-4 h-4 -mt-2 rounded-full bg-green-500 animate-pulse ${step === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
            <div className="absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded">
              DHCP Discover
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="absolute right-[76px] top-[calc(50%-6px)] w-[calc(50%-88px)] h-0.5 bg-blue-500">
            <div className={`absolute top-0 left-0 w-4 h-4 -mt-2 rounded-full bg-blue-500 animate-pulse ${step === 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
            <div className="absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
              DHCP Offer
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="absolute left-[76px] top-[calc(50%+6px)] w-[calc(50%-88px)] h-0.5 bg-yellow-500">
            <div className={`absolute top-0 right-0 w-4 h-4 -mt-2 rounded-full bg-yellow-500 animate-pulse ${step === 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
            <div className="absolute bottom-0 -mb-8 left-1/2 -translate-x-1/2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs font-medium px-2 py-1 rounded">
              DHCP Request
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="absolute right-[76px] top-[calc(50%+12px)] w-[calc(50%-88px)] h-0.5 bg-purple-500">
            <div className={`absolute top-0 left-0 w-4 h-4 -mt-2 rounded-full bg-purple-500 animate-pulse ${step === 4 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
            <div className="absolute bottom-0 -mb-8 left-1/2 -translate-x-1/2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-1 rounded">
              DHCP Acknowledge
            </div>
          </div>
        )}

        {/* Status Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {step === 0 && "Click 'Start' to see DHCP process in action"}
            {step === 1 && "Step 1: DISCOVER - Client broadcasts to find DHCP servers"}
            {step === 2 && "Step 2: OFFER - Server offers an IP address to the client"}
            {step === 3 && "Step 3: REQUEST - Client requests the offered IP address"}
            {step === 4 && "Step 4: ACK - Server acknowledges the request and confirms lease"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="dhcp" className="scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1">
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">DHCP Process (DORA)</h3>
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

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 text-sm font-medium mb-4">
            DHCP (Dynamic Host Configuration Protocol)
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Automated Network Configuration</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            DHCP automates the assignment of IP addresses, subnet masks, default gateways, and other network parameters, enabling devices to easily join and communicate on a network without manual configuration.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Key Components</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>DHCP Server</li>
                <li>DHCP Client</li>
                <li>IP Address Pools (Scopes)</li>
                <li>Lease Duration</li>
                <li>DHCP Relay Agents</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Security Considerations</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>DHCP Snooping (prevents rogue DHCP servers)</li>
                <li>IP/MAC Address Binding</li>
                <li>DHCP Authentication</li>
                <li>Access Control Lists (ACLs)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DHCPSection;