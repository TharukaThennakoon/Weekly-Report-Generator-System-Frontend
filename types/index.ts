// types/index.ts

export type UserRole = "MEMBER" | "MANAGER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string; // for chart/badge coloring
  createdAt: string;
}

export type ReportStatus = "DRAFT" | "SUBMITTED" | "LATE";

export interface Report {
  id: string;
  userId: string;
  userName: string;          // denormalized for easy display in manager tables
  weekStart: string;         // ISO date string, e.g. "2026-06-29"
  weekEnd: string;
  projectId: string;
  projectName: string;
  tasksCompleted: string;
  tasksPlanned: string;
  blockers: string;
  hasBlockers: boolean;      // derived flag, useful for dashboard "open blockers" count
  hoursWorked?: number;
  notes?: string;
  status: ReportStatus;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Shape for the manager dashboard's aggregated metrics endpoint
export interface DashboardMetrics {
  totalSubmitted: number;
  totalExpected: number;
  complianceRate: number;    // 0-100
  openBlockers: number;
  tasksTrend: { week: string; count: number }[];
  submissionByMember: { name: string; status: ReportStatus }[];
  workloadByProject: { project: string; count: number }[];
  recentActivity: { id: string; userName: string; action: string; timestamp: string }[];
}