// app/(manager)/team/page.tsx
"use client";

import { useTeamMembers } from "@/hooks/useTeam";

export default function TeamPage() {
  const { data: members, isLoading, isError } = useTeamMembers();

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Team</h1>
      <p className="text-sm text-gray-500 mb-6">Everyone submitting weekly reports.</p>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {isLoading && <p className="text-sm text-gray-400 py-8 text-center">Loading team...</p>}
        {isError && (
          <p className="text-sm text-red-600 py-8 text-center">
            Couldn&apos;t load team members. Please try again.
          </p>
        )}
        {members && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="py-2.5 px-4 font-medium">Name</th>
                <th className="py-2.5 px-4 font-medium">Email</th>
                <th className="py-2.5 px-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4 font-medium text-gray-900">{m.name}</td>
                  <td className="py-3 px-4 text-gray-600">{m.email}</td>
                  <td className="py-3 px-4 text-gray-600">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}