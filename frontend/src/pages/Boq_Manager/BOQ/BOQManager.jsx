import React, { useState } from "react";
import ProjectsTable from "../components3/ProjectsTable";
import BOQTable from "../components3/BOQTable";
import BOQDetail from "../components3/BOQDetail";

export default function BOQManager() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBoq, setSelectedBoq] = useState(null);

  if (!selectedProject) {
    return <ProjectsTable onSelectProject={setSelectedProject} />;
  }
  if (!selectedBoq) {
    return (
      <BOQTable
        project={selectedProject}
        onSelectBoq={setSelectedBoq}
      />
    );
  }
  return <BOQDetail boq={selectedBoq} />;
} 