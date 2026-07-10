
"use client";

import { Project } from "@/types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDeleteProject } from "@/hooks/useProjects";
import { useState } from "react";

export function ProjectTable({
  projects,
  onEdit,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
}) {
  const deleteMutation = useDeleteProject();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    setConfirmingId(null);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-gray-400">
        No projects yet. Create one to get started.
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b border-gray-200">
          <th className="py-2 font-medium">Name</th>
          <th className="py-2 font-medium">Description</th>
          <th className="py-2 font-medium w-24">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id} className="border-b border-gray-100">
            <td className="py-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.color || "#888" }}
                />
                <span className="font-medium text-gray-900">{project.name}</span>
              </div>
            </td>
            <td className="py-3 text-gray-500">{project.description || "—"}</td>
            <td className="py-3">
              {confirmingId === project.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-xs text-red-600 font-medium hover:underline"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmingId(null)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-gray-400 hover:text-indigo-600"
                    aria-label="Edit"
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    onClick={() => setConfirmingId(project.id)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label="Delete"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}