import React, { useEffect, useState } from "react";
import DashboardLayout from "../components3/DashboardLayout";
import ProjectsTable from "../components3/ProjectsTable";
import AddProjectButton from "../components3/AddProjectButton";
import { useParams } from "react-router-dom";

export default function Projects() {
  const { user_id } = useParams();
  const [refresh, setRefresh] = useState(0);

  // When AddProjectButton creates a project, increment refresh to reload table
  const handleProjectCreated = () => setRefresh((r) => r + 1);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6 transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif', background: '#f7f8fa', minHeight: '100vh' }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#154078]">Projects</h1>
          <AddProjectButton user_id={user_id} onProjectCreated={handleProjectCreated} />
        </div>
        <ProjectsTable user_id={user_id} key={refresh} />
      </div>
    </DashboardLayout>
  );
}