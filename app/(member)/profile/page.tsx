"use client";

import { useSession, signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";

export default function ProfilePage() {
  const { data: session } = useSession();

 return (
  <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Profile
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View your account information and assigned role.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white backdrop-blur">
              {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                {session?.user?.name}
              </h2>

              <p className="mt-1 text-indigo-100">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-6 p-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Full Name
            </p>

            <p className="text-base font-medium text-gray-900">
              {session?.user?.name}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Email Address
            </p>

            <p className="text-base font-medium text-gray-900">
              {session?.user?.email}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Account Role
            </p>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                (session?.user as any)?.role === "MANAGER"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {(session?.user as any)?.role}
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </p>

            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Active
            </span>
          </div>
        </div>

        {/* Logout Section */}
<div className="border-t border-gray-200 px-8 py-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="text-base font-semibold text-gray-900">
        Sign out
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        Sign out from your account and return to the landing page.
      </p>
    </div>

    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
    >
      <IconLogout size={18} />
      Logout
    </button>
  </div>
</div>
      </div>
    </div>
  </div>
);
}
