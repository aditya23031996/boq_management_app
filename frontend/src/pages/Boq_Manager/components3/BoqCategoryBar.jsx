import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';

const COLORS = ['#154078', '#48bb78', '#fbbf24', '#f87171', '#6366f1', '#a3e635'];

function getCategoryData(boqs) {
  const catCount = {};
  boqs.forEach(bq => {
    const cat = bq.category || 'Uncategorized';
    catCount[cat] = (catCount[cat] || 0) + 1;
  });
  return Object.entries(catCount).map(([name, value]) => ({ name, value }));
}

export default function BoqCategoryBar({ boqs }) {
  const data = getCategoryData(boqs);
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h3 className="text-base font-medium text-[#154078] mb-1">BoQ Categories</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
          <XAxis type="number" allowDecimals={false} stroke="#154078" tick={{ fontSize: 12, fontFamily: 'Inter, sans-serif' }} />
          <YAxis type="category" dataKey="name" stroke="#154078" tick={{ fontSize: 12, fontFamily: 'Inter, sans-serif' }} width={70} />
          <Tooltip contentStyle={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }} />
          <Bar dataKey="value" name="BoQs" barSize={16} radius={[8, 8, 8, 8]} >
            <LabelList dataKey="value" position="right" fill="#154078" fontSize={12} fontFamily="Inter, sans-serif" />
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 