// components/reports/ReportForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportSchema, ReportFormInput, ReportFormValues } from "@/lib/validators";
import { useCreateReport, useUpdateReport, useSubmitReport } from "@/hooks/useReports";
import { useProjects } from "@/hooks/useProjects";
import { getWeekRange, getCurrentMonday } from "@/lib/utils";
import { Report } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ReportForm({ existingReport }: { existingReport?: Report }) {
  const router = useRouter();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const createMutation = useCreateReport();
  const updateMutation = useUpdateReport();
  const submitMutation = useSubmitReport();
  const [serverError, setServerError] = useState("");

  const isEdit = !!existingReport;
  const isLocked = existingReport?.status === "SUBMITTED";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormInput, unknown, ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      weekStart: getCurrentMonday(),
      weekEnd: getWeekRange(getCurrentMonday()).weekEnd,
      projectId: "",
      tasksCompleted: "",
      tasksPlanned: "",
      blockers: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (existingReport) {
      reset({
        weekStart: existingReport.weekStart.slice(0, 10),
        weekEnd: existingReport.weekEnd.slice(0, 10),
        projectId: existingReport.projectId,
        tasksCompleted: existingReport.tasksCompleted,
        tasksPlanned: existingReport.tasksPlanned,
        blockers: existingReport.blockers,
        hoursWorked: existingReport.hoursWorked,
        notes: existingReport.notes,
      });
    }
  }, [existingReport, reset]);

  const saveDraft = async (values: ReportFormValues) => {
    setServerError("");
    try {
      if (isEdit && existingReport) {
        await updateMutation.mutateAsync({ id: existingReport.id, data: values });
      } else {
        const saved = await createMutation.mutateAsync(values);
        router.push(`/reports/mine/${saved.id}`);
      }
    } catch {
      setServerError("Couldn't save your report. Please try again.");
    }
  };

  const saveAndSubmit = async (values: ReportFormValues) => {
    setServerError("");
    try {
      let reportId = existingReport?.id;
      if (isEdit && reportId) {
        await updateMutation.mutateAsync({ id: reportId, data: values });
      } else {
        const saved = await createMutation.mutateAsync(values);
        reportId = saved.id;
      }
      await submitMutation.mutateAsync(reportId!);
      router.push("/reports/mine");
    } catch {
      setServerError("Couldn't submit your report. Please try again.");
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending || submitMutation.isPending;

  return (
    <form className="space-y-6 max-w-2xl">
      {isLocked && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-md px-4 py-2">
          This report has been submitted and can no longer be edited.
        </div>
      )}

      {/* Week / date range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Week starting (Monday)</label>
          <input
            type="date"
            disabled={isLocked}
            {...register("weekStart")}
            className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                       disabled:bg-gray-100 disabled:text-gray-600`}
          />
          {errors.weekStart && <p className="text-xs text-red-600 mt-1">{errors.weekStart.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Week ending</label>
          <input
            type="date"
            disabled={isLocked}
            {...register("weekEnd")}
            className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                       disabled:bg-gray-100 disabled:text-gray-600`}
          />
          {errors.weekEnd && <p className="text-xs text-red-600 mt-1">{errors.weekEnd.message}</p>}
        </div>
      </div>

      {/* Project / category tag */}
      <div>
        <label className="text-sm font-medium text-gray-700">Project / category</label>
        <select
          disabled={isLocked || projectsLoading}
          {...register("projectId")}
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        >
          <option value="">Select a project...</option>
          {projects?.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && <p className="text-xs text-red-600 mt-1">{errors.projectId.message}</p>}
      </div>

      {/* Tasks completed */}
      <div>
        <label className="text-sm font-medium text-gray-700">Tasks completed this week</label>
        <textarea
          disabled={isLocked}
          {...register("tasksCompleted")}
          rows={4}
          placeholder="What did you get done this week?"
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        />
        {errors.tasksCompleted && <p className="text-xs text-red-600 mt-1">{errors.tasksCompleted.message}</p>}
      </div>

      {/* Tasks planned */}
      <div>
        <label className="text-sm font-medium text-gray-700">Tasks planned for next week</label>
        <textarea
          disabled={isLocked}
          {...register("tasksPlanned")}
          rows={4}
          placeholder="What's on deck for next week?"
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        />
        {errors.tasksPlanned && <p className="text-xs text-red-600 mt-1">{errors.tasksPlanned.message}</p>}
      </div>

      {/* Blockers */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Blockers / challenges <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          disabled={isLocked}
          {...register("blockers")}
          rows={3}
          placeholder="Anything holding you up? Leave blank if none."
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        />
      </div>

      {/* Hours worked */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Hours worked <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="number"
          step="0.5"
          disabled={isLocked}
          {...register("hoursWorked", { valueAsNumber: true })}
          placeholder="40"
          className={`mt-1 w-32 rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        />
        {errors.hoursWorked && <p className="text-xs text-red-600 mt-1">{errors.hoursWorked.message}</p>}
      </div>

      {/* Notes / links */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Notes or links <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          disabled={isLocked}
          {...register("notes")}
          rows={2}
          placeholder="PR links, docs, anything else worth noting"
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     ${isLocked ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white text-gray-900'}
                     disabled:bg-gray-100 disabled:text-gray-600`}
        />
      </div>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {serverError}
        </p>
      )}

      {!isLocked && (
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSubmit(saveDraft)}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300
                       rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSubmit(saveAndSubmit)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600
                       rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Submit report"}
          </button>
        </div>
      )}
    </form>
  );
}