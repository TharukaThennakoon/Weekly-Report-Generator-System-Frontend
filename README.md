# Frontend — Weekly Report Generator & Team Dashboard

Next.js frontend for the Weekly Report Generator & Team Dashboard application.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query)
- React Hook Form + Zod
- NextAuth (authentication/session)
- Recharts (charts)

## Prerequisites

- Node.js 18+
- The backend API must be running first — see `backend/README.md`

---

## Setup Instructions

### 1. Installing Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the `frontend/` root:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=replace-with-a-random-secret
NEXTAUTH_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend REST API |
| `NEXTAUTH_SECRET` | Random string used to sign NextAuth session tokens |
| `NEXTAUTH_URL` | The URL this frontend is running on |

### 3. Running the Frontend

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

> **Note:** the backend must already be running at the URL set in
> `NEXT_PUBLIC_API_URL`, or requests (login, reports, dashboard data) will fail.
> See `backend/README.md` for backend + database setup.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
frontend/
├── app/
│   ├── (auth)/            # login, register
│   ├── (member)/          # team member pages: my reports, create/edit report
│   ├── (manager)/         # manager pages: dashboard, reports, projects, team, assistant
│   └── providers.tsx      # SessionProvider + React Query provider
├── components/
│   ├── layout/             # Sidebar, Topbar, RoleGuard
│   ├── reports/             # ReportForm, ReportCard, ReportHistoryTable, ReportStatusBadge
│   ├── projects/            # ProjectForm, ProjectTable
│   ├── dashboard/           # MetricCard, charts, ActivityFeed
│   ├── filters/              # ReportFilters
│   └── chat/                 # ChatWidget, ChatMessage
├── hooks/                  # useReports, useProjects, useTeam, useDashboardMetrics
├── lib/                    # api.ts, auth.ts, validators.ts, utils.ts
├── types/                  # shared TypeScript types
└── middleware.ts           # route protection by role
```

## Login Credentials (Demo Data)

Seeded automatically by the backend on first run:

| Role    | Email             | Password    |
|---------|-------------------|-------------|
| Manager | manager@test.com  | password123 |
| Member  | priya@test.com    | password123 |
| Member  | sam@test.com      | password123 |
| Member  | jordan@test.com   | password123 |

## Notes

- Role-based routing is enforced both server-side (`middleware.ts`) and
  client-side (`RoleGuard` component) — the middleware is the actual security
  boundary, `RoleGuard` just avoids UI flicker while the session loads.
- Manager report filters are stored in the URL (`?member=&project=&status=`),
  so filtered views are shareable and survive a page refresh.
