// components/projects/ProjectForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validators";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";
import { Project } from "@/types";
import { useEffect } from "react";

const COLOR_OPTIONS = ["#7F77DD", "#1D9E75", "#D85A30", "#D4537E", "#378ADD", "#EF9F27"];

export function ProjectForm({
  project,
  onClose,
}: {
  project?: Project | null;
  onClose: () => void;
}) {
  const isEdit = !!project;
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "", color: COLOR_OPTIONS[0] },
  });

  // when editing, pre-fill the form once the project prop is available
  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description || "",
        color: project.color || COLOR_OPTIONS[0],
      });
    }
  }, [project, reset]);

  const selectedColor = watch("color");

  const onSubmit = async (values: ProjectFormValues) => {
    if (isEdit && project) {
      await updateMutation.mutateAsync({ id: project.id, data: values });
    } else {
      await createMutation.mutateAsync(values);
    }
    onClose();
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isEdit ? "Edit project" : "New project"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Client A"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description")}
              rows={2}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional short description"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className={`w-7 h-7 rounded-full border-2 transition
                    ${selectedColor === color ? "border-gray-900" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                         rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}