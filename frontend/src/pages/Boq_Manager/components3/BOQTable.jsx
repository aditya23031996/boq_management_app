import React, { useEffect, useState } from "react";

export default function BOQTable({ project, onSelectBoq, user_id }) {
  const [boqs, setBoqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = null;
    if (project) {
      url = `/boq/?project_id=${project.id}`;
    } else if (user_id) {
      url = `/boq/${user_id}`;
    }
    if (!url) {
      setBoqs([]);
      setLoading(false);
      return;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch BOQs");
        return res.json();
      })
      .then((data) => {
        setBoqs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [project, user_id]);

  if (loading) return <div className="p-4 text-gray-500">Loading BOQs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-md shadow-sm">
      <table className="min-w-full text-left text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 font-semibold text-gray-700">ID</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Title</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Description</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Project Name</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Total Amount</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Billing Completed</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Work Completed</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {boqs.length === 0 ? (
            <tr><td colSpan={8} className="px-3 py-4 text-center text-gray-500">No BOQs found.</td></tr>
          ) : boqs.map((boq) => (
            <tr key={boq.boq_id} className="border-b hover:bg-blue-50 transition">
              <td className="px-3 py-2">{boq.boq_id}</td>
              <td className="px-3 py-2 font-medium text-[#154078]">{boq.title}</td>
              <td className="px-3 py-2">{boq.description || '-'}</td>
              <td className="px-3 py-2">{boq.project_name || '-'}</td>
              <td className="px-3 py-2">₹{boq.total_amount?.toLocaleString() || '0'}</td>
              <td className="px-3 py-2">{boq.billing_completed || ''}</td>
              <td className="px-3 py-2">{boq.work_completed || ''}</td>
              <td className="px-3 py-2">
                {onSelectBoq && (
                  <button
                    className="text-blue-600 hover:underline font-semibold text-xs"
                    onClick={() => onSelectBoq(boq)}
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 