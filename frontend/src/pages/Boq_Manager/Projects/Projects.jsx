import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectModal from "../components3/ProjectModal";
import DashboardLayout from "../components3/DashboardLayout";
import ProjectsTable from "../components3/ProjectsTable";


export default function Projects() {
  const { user_id } = useParams();
  const [refresh, setRefresh] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false); // For create modal

  // When a project is created, increment refresh to reload table
  const handleProjectCreated = () => {
    setRefresh((r) => r + 1);
    setShowCreateModal(false);
  };

  const handleProjectUpdated = () => setRefresh((r) => r + 1);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleUpdate = async (formData) => {
    const res = await fetch(`/project/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to update project.");
    handleProjectUpdated();
  };

  // Logic for creating a new project (show modal)
  const handleCreateProject = () => setShowCreateModal(true);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6" />
        <ProjectsTable user_id={user_id} key={refresh} onSelectProject={handleSelectProject} />
        
        {/* Floating Add Project Button */}
        <button
          className="fixed z-40 bottom-10 right-10 w-14 h-14 bg-[#264653] hover:bg-[#355f63] text-white shadow-2xl rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-150 border-none"
          onClick={handleCreateProject}
          title="Add New Project"
        >
          +
        </button>
      </div>
      {/* Create Project Modal */}
      {showCreateModal && (
        <ProjectModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleProjectCreated}
          user_id={user_id}
          isCreate // Pass a prop to indicate creation mode if needed
        />
      )}
      {/* Edit Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSave={handleUpdate}
        />
      )}
    </DashboardLayout>
  );
}