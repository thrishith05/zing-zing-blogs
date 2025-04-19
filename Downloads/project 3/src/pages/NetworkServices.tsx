import React from 'react';
import Hero from '../components/Hero';
import DNSSection from '../components/services/DNSSection';
import DHCPSection from '../components/services/DHCPSection';
import FTPSection from '../components/services/FTPSection';
import HTTPSection from '../components/services/HTTPSection';
import EmailSection from '../components/services/EmailSection';

const NetworkServices: React.FC = () => {
  return (
    <div className="w-full">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        <DNSSection />
        <DHCPSection />
        <FTPSection />
        <HTTPSection />
        <EmailSection />
      </div>
    </div>
  );
};

export default NetworkServices;