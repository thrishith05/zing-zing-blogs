import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="p-6">
        <div className={`inline-flex items-center justify-center p-3 rounded-full ${color} mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;