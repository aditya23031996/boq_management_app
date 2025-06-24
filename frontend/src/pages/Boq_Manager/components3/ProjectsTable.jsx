import React, { useEffect, useState } from "react";
import { Eye, Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";

// StatusBadge
function StatusBadge({ status }) {
  let badgeClass =
    status === "Completed"
      ? "bg-green-100 text-green-800 border border-green-200"
      : status === "In Progress"
      ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
      : "bg-gray-100 text-gray-700 border border-gray-200";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeClass} transition-all`}>
      {status || "N/A"}
    </span>
  );
}

// Tooltip for action buttons
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={-1}
    >
      {children}
      {show && (
        <span className="absolute z-50 left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap bg-[#264653] text-white text-xs rounded-md px-2 py-1 shadow-lg font-medium transition-all animate-fade-in border border-[#224245]">
          {text}
        </span>
      )}
    </span>
  );
}

export default function ProjectsTable({ onSelectProject, onDeleteProject, user_id }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filterManager, setFilterManager] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClient, setFilterClient] = useState("");

  // Sorting
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    setLoading(true);
    if (!user_id) return;
    fetch(`/project/${user_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user_id]);

  // Unique filter options
  const uniqueManagers = Array.from(new Set(projects.map((p) => p.project_manager).filter(Boolean)));
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const uniqueStatuses = Array.from(new Set(projects.map((p) => p.status).filter(Boolean)));
  const uniqueClients = Array.from(new Set(projects.map((p) => p.client_name).filter(Boolean)));

  // Filtering
  const filteredProjects = projects.filter((project) => {
    return (
      (filterManager ? project.project_manager === filterManager : true) &&
      (filterCategory ? project.category === filterCategory : true) &&
      (filterStatus ? project.status === filterStatus : true) &&
      (filterClient ? project.client_name === filterClient : true)
    );
  });

  // Sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn] || "";
    const valB = b[sortColumn] || "";
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    const comparison = String(valA).localeCompare(String(valB));
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleDelete = (projectId) => {
    if (
      window.confirm(
        "Warning: Your project and all BOQs within it will be deleted. Are you sure you want to proceed?"
      )
    ) {
      fetch(`/project/${projectId}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete project");
          setProjects((prev) => prev.filter((project) => project.id !== projectId));
          if (onDeleteProject) onDeleteProject(projectId);
        })
        .catch((err) => alert(err.message));
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading Projects...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 transition-all duration-300"
      style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {[
          { label: "Manager", value: filterManager, setter: setFilterManager, options: uniqueManagers },
          { label: "Category", value: filterCategory, setter: setFilterCategory, options: uniqueCategories },
          { label: "Status", value: filterStatus, setter: setFilterStatus, options: uniqueStatuses },
          { label: "Client", value: filterClient, setter: setFilterClient, options: uniqueClients },
        ].map(({ label, value, setter, options }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-[#264653] mb-1">{label}</label>
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="block w-44 border border-[#c7d0cb] rounded-lg px-2 py-2 text-sm bg-white text-[#264653] focus:ring-2 focus:ring-[#264653] transition"
            >
              <option value="">All</option>
              {options.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white rounded-2xl shadow border border-[#e1e5ea]">
        <table className="min-w-full">
          <thead>
            <tr className="sticky top-0 z-10" style={{ background: "#264653" }}>
              {[
                { label: "S.N.", col: "SN" },
                { label: "Project Name", col: "name" },
                { label: "Category", col: "category" },
                { label: "Client", col: "client_name" },
                { label: "Manager", col: "project_manager" },
                { label: "Status", col: "" },
                { label: "Billing", col: "billing_progress" },
                { label: "Onsite", col: "onsite_progress" },
                { label: "Scope", col: "total_scope" },
                { label: "Actions", col: "" },
              ].map(({ label, col }) => (
                <th
                  key={label}
                  className={`px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase ${
                    col ? "cursor-pointer select-none" : ""
                  }`}
                  style={{
                    background: "#264653",
                    color: "#fff",
                    letterSpacing: "0.06em",
                  }}
                  onClick={col ? () => handleSort(col) : undefined}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {sortColumn === col &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={14} color="white" />
                      ) : (
                        <ChevronDown size={14} color="white" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedProjects.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            ) : (
              sortedProjects.map((project, index) => (
                <tr
                  key={project.id}
                  className={`transition-all group hover:bg-[#e7efed] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f7faf9]"
                  }`}
                  style={{
                    boxShadow: "0 0.5px 0 #e1e5ea",
                    borderBottom: "1px solid #f2f4f8"
                  }}
                >
                  <td className="px-4 py-3 text-sm text-[#264653] font-medium">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-[#264653] font-medium">{project.name}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{project.category || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{project.client_name || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{project.project_manager || "-"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="w-full bg-[#e8edea] h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#264653] transition-all"
                        style={{ width: `${project.billing_progress || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#264653] font-medium">{project.billing_progress || 0}%</span>
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="w-full bg-[#e8edea] h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#4dc3b4] transition-all"
                        style={{ width: `${project.onsite_progress || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#264653] font-medium">{project.onsite_progress || 0}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{project.total_scope || 0}</td>
                  {/* Modern Action Buttons */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Tooltip text="View">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="p-2 rounded-full bg-[#f1f5f4] hover:bg-[#264653] text-[#264653] hover:text-white shadow-sm border border-transparent hover:shadow-lg transition-all"
                        >
                          <Eye size={17} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Edit">
                        <button
                          onClick={() => window.location.href = `/project/edit/${project.id}`}
                          className="p-2 rounded-full bg-[#f1f5f4] hover:bg-[#a0c6bd] text-[#264653] hover:text-white shadow-sm border border-transparent hover:shadow-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete">
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 rounded-full bg-[#f1f5f4] hover:bg-[#e95a5a] text-[#e95a5a] hover:text-white shadow-sm border border-transparent hover:shadow-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
