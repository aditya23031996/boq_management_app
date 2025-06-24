import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import BOQTable from "./BOQTable";  // ensure the import path is correct

export default function ProjectModal({ project = null, onClose, onSave }) {
  const isEditMode = project !== null;
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    client_name: "",
    project_manager: "",
    status: "In Progress",
    billing_progress: 0,
    onsite_progress: 0,
    total_scope: 0,
    description: "",
    boqs: []  // used only in new project mode
  });
  const [saving, setSaving] = useState(false);

  // When editing an existing project, fetch the BOQs from the backend.
  useEffect(() => {
    if (project) {
      if (project.id) {
        fetch(`/boq/?project_id=${project.id}`)
          .then((res) => {
            if (!res.ok)
              throw new Error("Failed to fetch BOQs for the project.");
            return res.json();
          })
          .then((data) =>
            setFormData({ ...project, boqs: data || [] })
          )
          .catch((err) => {
            toast.error(err.message);
            setFormData({ ...project, boqs: [] });
          });
      } else {
        setFormData({ ...project, boqs: project.boqs || [] });
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
  };

  // Inline BOQ handlers (used only when creating new projects)
  const handleAddNewBOQ = () => {
    setFormData((prev) => ({
      ...prev,
      boqs: [
        ...prev.boqs,
        { id: Date.now(), item: "", description: "", quantity: 0, rate: 0 }
      ]
    }));
  };

  const handleBOQChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newBOQs = [...prev.boqs];
      newBOQs[index] = {
        ...newBOQs[index],
        [name]:
          name === "quantity" || name === "rate"
            ? value === "" ? "" : Number(value)
            : value
      };
      return { ...prev, boqs: newBOQs };
    });
  };

  const handleRemoveBOQ = (index) => {
    setFormData((prev) => {
      const newBOQs = prev.boqs.filter((_, i) => i !== index);
      return { ...prev, boqs: newBOQs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success(`Project ${isEditMode ? "updated" : "created"} successfully!`);
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start z-50 overflow-auto pt-12">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 p-10 my-8 max-h-screen overflow-y-auto border-t-4 border-blue-600">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {isEditMode ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-4xl leading-none">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name *</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Manager</label>
              <input
                type="text"
                name="project_manager"
                value={formData.project_manager}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Billing Progress (%)</label>
              <input
                type="number"
                name="billing_progress"
                value={formData.billing_progress}
                onChange={handleNumberChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Onsite Progress (%)</label>
              <input
                type="number"
                name="onsite_progress"
                value={formData.onsite_progress}
                onChange={handleNumberChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Scope</label>
              <input
                type="number"
                name="total_scope"
                value={formData.total_scope}
                onChange={handleNumberChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              ></textarea>
            </div>
          </div>
          {/* BOQs Section */}
          <div className="mt-8">
            {isEditMode ? (
              // When editing a project, show the BOQTable (fetched via project id)
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Bill of Quantities (BOQs)
                </h3>
                <BOQTable project={project} />
              </>
            ) : (
              // For new projects, allow inline BOQ addition
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Bill of Quantities (BOQs)
                  </h3>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
                    onClick={handleAddNewBOQ}
                  >
                    Add New BOQ
                  </button>
                </div>
                {formData.boqs && formData.boqs.length > 0 ? (
                  <table className="min-w-full border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rate</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.boqs.map((boq, index) => (
                        <tr key={boq.id || index} className="border-b">
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              name="item"
                              value={boq.item}
                              onChange={(e) => handleBOQChange(index, e)}
                              placeholder="Item"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              name="description"
                              value={boq.description}
                              onChange={(e) => handleBOQChange(index, e)}
                              placeholder="Description"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              name="quantity"
                              value={boq.quantity}
                              onChange={(e) => handleBOQChange(index, e)}
                              placeholder="Quantity"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              name="rate"
                              value={boq.rate}
                              onChange={(e) => handleBOQChange(index, e)}
                              placeholder="Rate"
                              className="w-full px-2 py-1 border rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveBOQ(index)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-sm">No BOQs added yet.</p>
                )}
              </>
            )}
          </div>
          <div className="mt-8 flex justify-end gap-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : isEditMode ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}