import { Activity } from 'lucide-react';

export const Loading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Activity className="w-16 h-16 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
};
