import React, { useState } from 'react';
import { Globe, Lock, Unlock, Shield, ShieldAlert, Server, Laptop } from 'lucide-react';

const HTTPSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'http' | 'https'>('http');
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <section id="http" className="scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1">
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4">
                <button
                  onClick={() => setActiveTab('http')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'http'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  HTTP
                </button>
                <button
                  onClick={() => setActiveTab('https')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'https'
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  HTTPS
                </button>
              </div>
              
              <div className="relative h-80 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 overflow-hidden">
                {/* Client */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
                    <Laptop className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Client</p>
                </div>

                {/* Web Server */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-md mb-2">
                    <Server className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Web Server</p>
                </div>

                {/* HTTP Connection (Unsecured) */}
                {activeTab === 'http' && (
                  <div className="absolute left-[76px] top-1/2 w-[calc(100%-152px)] h-8 flex items-center justify-center">
                    <div className="w-full h-1 bg-red-400 relative">
                      <div className="absolute -top-4 left-1/4 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-md transform -translate-x-1/2 animate-http-packet-request">
                        <div className="text-xs font-bold text-red-500">GET</div>
                      </div>
                      <div className="absolute -top-4 right-1/4 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-md transform translate-x-1/2 animate-http-packet-response">
                        <div className="text-xs font-bold text-red-500">200</div>
                      </div>
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                      <Unlock className="h-3.5 w-3.5 mr-1.5" />
                      Unencrypted HTTP Connection
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <ShieldAlert className="h-5 w-5 text-red-500 mb-1" />
                      <p className="text-xs text-red-500 font-medium">Vulnerable to eavesdropping</p>
                    </div>
                  </div>
                )}

                {/* HTTPS Connection (Secured) */}
                {activeTab === 'https' && (
                  <div className="absolute left-[76px] top-1/2 w-[calc(100%-152px)] h-8 flex items-center justify-center">
                    <div className="w-full h-4 bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 rounded-full relative">
                      <div className="absolute -top-4 left-1/4 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-md transform -translate-x-1/2 animate-https-packet-request">
                        <div className="text-xs font-bold text-green-500">GET</div>
                      </div>
                      <div className="absolute -top-4 right-1/4 w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full shadow-md transform translate-x-1/2 animate-https-packet-response">
                        <div className="text-xs font-bold text-green-500">200</div>
                      </div>
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                      <Lock className="h-3.5 w-3.5 mr-1.5" />
                      Encrypted HTTPS Connection
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <Shield className="h-5 w-5 text-green-500 mb-1" />
                      <p className="text-xs text-green-500 font-medium">End-to-end encryption</p>
                    </div>
                  </div>
                )}

                {/* SSL Certificate popup */}
                {showCertificate && activeTab === 'https' && (
                  <div className="absolute inset-0 bg-white dark:bg-slate-800 bg-opacity-95 dark:bg-opacity-95 rounded-xl p-4 flex flex-col z-10">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 text-green-500 mr-2" />
                        <h4 className="text-md font-semibold text-slate-800 dark:text-white">SSL Certificate</h4>
                      </div>
                      <button 
                        onClick={() => setShowCertificate(false)}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-grow overflow-auto text-xs text-slate-600 dark:text-slate-300 font-mono space-y-2 p-2 bg-slate-50 dark:bg-slate-900 rounded">
                      <p>Certificate:</p>
                      <p>    Data:</p>
                      <p>        Version: 3 (0x2)</p>
                      <p>        Serial Number:</p>
                      <p>            04:03:02:eb:c7:8e:11:c7:5a:a3:4a:db:41:a1:fc:42</p>
                      <p>        Signature Algorithm: sha256WithRSAEncryption</p>
                      <p>        Issuer: C=US, O=DigiCert Inc, CN=DigiCert TLS RSA SHA256 2020 CA1</p>
                      <p>        Validity</p>
                      <p>            Not Before: Feb 15 00:00:00 2023 GMT</p>
                      <p>            Not After : Mar 16 23:59:59 2024 GMT</p>
                      <p>        Subject: C=US, ST=California, L=San Francisco, O=Example Inc.</p>
                      <p>        Subject Public Key Info:</p>
                      <p>            Public Key Algorithm: rsaEncryption</p>
                      <p>                Public-Key: (2048 bit)</p>
                      <p>                Exponent: 65537 (0x10001)</p>
                      <p>        X509v3 extensions:</p>
                      <p>            X509v3 Authority Key Identifier:</p>
                      <p>            X509v3 Subject Key Identifier:</p>
                      <p>            X509v3 Key Usage: critical</p>
                      <p>                Digital Signature, Key Encipherment</p>
                      <p>            X509v3 Extended Key Usage:</p>
                      <p>                TLS Web Server Authentication, TLS Web Client Authentication</p>
                    </div>
                  </div>
                )}
              </div>
              
              {activeTab === 'https' && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowCertificate(!showCertificate)}
                    className="px-4 py-2 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center"
                  >
                    <Lock className="h-4 w-4 mr-1.5" />
                    {showCertificate ? 'Hide Certificate' : 'View SSL Certificate'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4">
            HTTP / HTTPS Protocols
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Web Communication Protocol</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            HTTP (Hypertext Transfer Protocol) and its secure variant HTTPS enable the transfer of hypertext between clients and servers, forming the foundation of data communication on the World Wide Web.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">HTTP vs HTTPS</h3>
              <div className="overflow-hidden overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Feature</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">HTTP</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">HTTPS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Default Port</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">80</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">443</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Encryption</td>
                      <td className="px-4 py-2 text-sm text-red-500 flex items-center">
                        <Unlock className="h-4 w-4 mr-1" /> None
                      </td>
                      <td className="px-4 py-2 text-sm text-green-500 flex items-center">
                        <Lock className="h-4 w-4 mr-1" /> SSL/TLS
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Data Privacy</td>
                      <td className="px-4 py-2 text-sm text-red-500">Vulnerable</td>
                      <td className="px-4 py-2 text-sm text-green-500">Protected</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">SEO Ranking</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">Lower</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">Higher</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">Performance</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">Slightly faster</td>
                      <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">Slight overhead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Common HTTP Methods</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li><span className="font-medium text-green-600 dark:text-green-400">GET</span> - Retrieves data from the server</li>
                <li><span className="font-medium text-blue-600 dark:text-blue-400">POST</span> - Submits data to the server</li>
                <li><span className="font-medium text-yellow-600 dark:text-yellow-400">PUT</span> - Updates existing resources</li>
                <li><span className="font-medium text-red-600 dark:text-red-400">DELETE</span> - Removes resources</li>
                <li><span className="font-medium text-purple-600 dark:text-purple-400">PATCH</span> - Partially updates resources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HTTPSection;