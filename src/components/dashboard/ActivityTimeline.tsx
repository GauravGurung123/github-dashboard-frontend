import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityTimelineProps {
  activities: any[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.slice(0, 5).map((activity, index) => (
          <div key={index} className="border-l-2 border-blue-600 pl-4 py-2">
            <p className="text-sm font-medium">{activity.type || 'Activity'}</p>
            <p className="text-xs text-gray-500">{activity.created_at || 'Recently'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
