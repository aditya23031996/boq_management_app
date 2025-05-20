import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const initialForm = {
  name: "",
  category: "",
  location: "",
  client_name: "",
  project_manager: "",
  status: "",
  billing_progress: 0,
  onsite_progress: 0,
  total_scope: 0,
  description: "",
};

export default function AddProjectButton({ onProjectCreated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value === "" ? "" : Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.client_name) {
      setError("Project name and client name are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/project/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create project");
      setSuccess("Project created successfully!");
      setForm(initialForm);
      setOpen(false);
      if (onProjectCreated) onProjectCreated();
    } catch (err) {
      setError(err.message || "Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-1.5 px-4 py-2 bg-[#154078] text-white font-semibold rounded shadow hover:bg-blue-800 transition text-sm"
        onClick={() => setOpen(true)}
      >
        <PlusCircle size={16} /> New Project
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-[#154078]">Create New Project</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input name="category" value={form.category} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name *</label>
                <input name="client_name" value={form.client_name} onChange={handleChange} required className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Manager</label>
                <input name="project_manager" value={form.project_manager} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input name="status" value={form.status} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Billing Progress (%)</label>
                  <input type="number" name="billing_progress" value={form.billing_progress} onChange={handleNumberChange} min={0} max={100} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Onsite Progress (%)</label>
                  <input type="number" name="onsite_progress" value={form.onsite_progress} onChange={handleNumberChange} min={0} max={100} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Scope</label>
                <input type="number" name="total_scope" value={form.total_scope} onChange={handleNumberChange} min={0} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 text-sm" rows={2} />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold" onClick={() => setOpen(false)} disabled={loading}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-[#154078] text-white font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? "Saving..." : "Create Project"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 