// app/(manager)/projects/page.tsx
"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { Project } from "@/types";
import { IconPlus } from "@tabler/icons-react";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openCreate = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProject(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the project tags team members can attach to reports.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium
                     px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          <IconPlus size={16} />
          New project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {isLoading && <p className="text-sm text-gray-400 py-8 text-center">Loading projects...</p>}
        {isError && (
          <p className="text-sm text-red-600 py-8 text-center">
            Couldn&apos;t load projects. Please try again.
          </p>
        )}
        {projects && <ProjectTable projects={projects} onEdit={openEdit} />}
      </div>

      {formOpen && <ProjectForm project={editingProject} onClose={closeForm} />}
    </div>
  );
}