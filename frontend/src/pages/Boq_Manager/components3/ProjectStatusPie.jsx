import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#154078', '#48bb78', '#fbbf24', '#f87171', '#6366f1', '#a3e635'];

function getStatusData(projects) {
  const statusCount = {};
  projects.forEach(p => {
    const status = p.status || 'Unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
}

export default function ProjectStatusPie({ projects }) {
  const data = getStatusData(projects);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h3 className="text-base font-medium text-[#154078] mb-1">Project Status</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={65}
            label={({ name, value }) => `${((value/total)*100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }} />
          <Legend verticalAlign="bottom" height={30} iconType="circle" wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 