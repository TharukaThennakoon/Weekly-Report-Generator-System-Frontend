import { z } from "zod";

export const reportSchema = z.object({
  weekStart: z.string().min(1, "Week start date is required"),
  weekEnd: z.string().min(1, "Week end date is required"),
  projectId: z.string().min(1, "Please select a project"),
  tasksCompleted: z.string().min(1, "Tell us what you completed this week"),
  tasksPlanned: z.string().min(1, "Tell us what's planned for next week"),
  blockers: z.string().optional().default(""),
  hoursWorked: z
    .number()
    .min(0)
    .max(168)
    .optional(),
  notes: z.string().optional().default(""),
});

// Keep the form input and validated output types explicit because
// defaulted fields can differ between what the form accepts and what the
// resolver returns on submit.
export type ReportFormInput = z.input<typeof reportSchema>;
export type ReportFormValues = z.output<typeof reportSchema>;

export const projectSchema = z.object({
  name: z.string().min(2, "Project name is too short"),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name is too short"),
  role: z.enum(["MEMBER", "MANAGER"]),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;