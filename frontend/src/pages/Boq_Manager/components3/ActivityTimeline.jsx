import React from 'react';

export default function ActivityTimeline({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 text-center text-gray-500">
        No recent activities.
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
      <h3 className="text-sm font-semibold text-[#154078] mb-2">Recent Activity</h3>
      <ul className="relative border-l-2 border-[#154078] pl-4">
        {activities.map((a, idx) => (
          <li key={idx} className="mb-6 last:mb-0 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#154078] rounded-full border-2 border-white"></div>
            <div className="text-xs text-gray-500 mb-0.5">{a.date}</div>
            <div className="text-sm text-gray-800">{a.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 