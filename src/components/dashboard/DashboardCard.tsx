import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-2" style={{ color }} />
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
