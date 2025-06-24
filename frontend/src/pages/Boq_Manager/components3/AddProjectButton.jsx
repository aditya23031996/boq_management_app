import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import ProjectModal from "./ProjectModal";

export default function AddProjectButton({ onProjectCreated, user_id: propUserId }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const user_id = propUserId || user?.user_id;

  const handleSave = async (formData) => {
    if (!formData.name || !formData.client_name) {
      throw new Error("Project name and client name are required.");
    }
    if (!user_id) {
      throw new Error("User ID is missing.");
    }
    const res = await fetch(`/project/${user_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to create project");
    if (onProjectCreated) onProjectCreated();
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
        <ProjectModal onClose={() => setOpen(false)} onSave={handleSave} />
      )}
    </>
  );
}