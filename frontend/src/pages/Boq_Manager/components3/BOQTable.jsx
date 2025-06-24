import React, { useEffect, useState } from "react";
import { Eye, ChevronUp, ChevronDown } from "lucide-react";

// StatusBadge for BOQ status
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

export default function BOQTable({ project, onSelectBoq, user_id }) {
  const [boqs, setBoqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterManager, setFilterManager] = useState("");

  // Sorting
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

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

  // Unique filter options
  const uniqueStatuses = Array.from(new Set(boqs.map((b) => b.status).filter(Boolean)));
  const uniqueProjects = Array.from(new Set(boqs.map((b) => b.project_name).filter(Boolean)));
  const uniqueTitles = Array.from(new Set(boqs.map((b) => b.title).filter(Boolean)));
  const uniqueManagers = Array.from(new Set(boqs.map((b) => b.project_manager).filter(Boolean)));

  // Filtering
  const filteredBoqs = boqs.filter((boq) => {
    return (
      (filterStatus ? boq.status === filterStatus : true) &&
      (filterProject ? boq.project_name === filterProject : true) &&
      (filterTitle ? boq.title === filterTitle : true) &&
      (filterManager ? boq.project_manager === filterManager : true)
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

  const sortedBoqs = [...filteredBoqs].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn] || "";
    const valB = b[sortColumn] || "";
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    const comparison = String(valA).localeCompare(String(valB));
    return sortDirection === "asc" ? comparison : -comparison;
  });

  if (loading) return <div className="p-4 text-gray-500">Loading BOQs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 transition-all duration-300"
      style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {[
          { label: "Status", value: filterStatus, setter: setFilterStatus, options: uniqueStatuses },
          { label: "Project", value: filterProject, setter: setFilterProject, options: uniqueProjects },
          { label: "Title", value: filterTitle, setter: setFilterTitle, options: uniqueTitles },
          { label: "Manager", value: filterManager, setter: setFilterManager, options: uniqueManagers },
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
                { label: "Title", col: "title" },
                { label: "Description", col: "description" },
                { label: "Project Name", col: "project_name" },
                { label: "Total Amount", col: "total_amount" },
                { label: "Billing Completed", col: "billing_completed" },
                { label: "Work Completed", col: "work_completed" },
                { label: "Status", col: "status" },
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
            {sortedBoqs.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  No BOQs found.
                </td>
              </tr>
            ) : (
              sortedBoqs.map((boq, index) => (
                <tr
                  key={boq.boq_id}
                  className={`transition-all group hover:bg-[#e7efed] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f7faf9]"
                  }`}
                  style={{
                    boxShadow: "0 0.5px 0 #e1e5ea",
                    borderBottom: "1px solid #f2f4f8"
                  }}
                >
                  <td className="px-4 py-3 text-sm text-[#264653] font-medium">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-[#154078] font-medium">{boq.title}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{boq.description || '-'}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">{boq.project_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-[#264653]">₹{boq.total_amount?.toLocaleString() || '0'}</td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="w-full bg-[#e8edea] h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#264653] transition-all"
                        style={{ width: `${boq.billing_completed || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#264653] font-medium">{boq.billing_completed || 0}%</span>
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="w-full bg-[#e8edea] h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#4dc3b4] transition-all"
                        style={{ width: `${boq.work_completed || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#264653] font-medium">{boq.work_completed || 0}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={boq.status} />
                  </td>
                  {/* Modern Action Buttons */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Tooltip text="View">
                        <button
                          onClick={() => onSelectBoq && onSelectBoq(boq)}
                          className="p-2 rounded-full bg-[#f1f5f4] hover:bg-[#264653] text-[#264653] hover:text-white shadow-sm border border-transparent hover:shadow-lg transition-all"
                        >
                          <Eye size={17} />
                        </button>
                      </Tooltip>
                      {/* Add Edit/Delete buttons here if needed */}
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