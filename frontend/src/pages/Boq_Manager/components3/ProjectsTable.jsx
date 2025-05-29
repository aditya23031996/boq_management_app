import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { apiFetch } from "../../../services/api";

function StatusBadge({ status }) {
  const color = status === "Completed"
    ? "bg-green-100 text-green-700"
    : status === "In Progress"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{status || 'N/A'}</span>;
}

export default function ProjectsTable({ onSelectProject, user_id }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!user_id) return;
    fetch(`/project/${user_id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user_id]);

  if (loading) return <div className="p-4 text-gray-500">Loading projects...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-md shadow-sm">
      <table className="min-w-full text-left text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 font-semibold text-gray-700">Project Name</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Category</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Client</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Manager</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Status</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Billing Progress</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Onsite Progress</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Total Scope</th>
            <th className="px-3 py-2 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr><td colSpan={9} className="px-3 py-4 text-center text-gray-500">No projects found.</td></tr>
          ) : projects.map((project) => (
            <tr key={project.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-3 py-2 font-medium text-[#154078]">{project.name}</td>
              <td className="px-3 py-2">{project.category || '-'}</td>
              <td className="px-3 py-2">{project.client_name || '-'}</td>
              <td className="px-3 py-2">{project.project_manager || '-'}</td>
              <td className="px-3 py-2"><StatusBadge status={project.status} /></td>
              <td className="px-3 py-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-blue-500`}
                    style={{ width: `${project.billing_progress || 0}%` }}
                  />
                </div>
                <span className="ml-2 text-xs text-gray-600">{project.billing_progress || 0}%</span>
              </td>
              <td className="px-3 py-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-blue-400`}
                    style={{ width: `${project.onsite_progress || 0}%` }}
                  />
                </div>
                <span className="ml-2 text-xs text-gray-600">{project.onsite_progress || 0}%</span>
              </td>
              <td className="px-3 py-2">{project.total_scope || 0}</td>
              <td className="px-3 py-2">
                <button
                  className="text-blue-600 hover:underline font-semibold text-xs"
                  onClick={() => onSelectProject(project)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 