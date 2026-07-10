"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  IconClipboardText,
  IconUserCircle,
  IconLogout,
} from "@tabler/icons-react";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/reports/mine"
            className="text-lg font-bold tracking-tight text-gray-900"
          >
            Team Reports
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/reports/mine"
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                pathname.startsWith("/reports")
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <IconClipboardText size={18} />
                My Reports
              </span>
            </Link>

            <Link
              href="/profile"
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                pathname === "/profile"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <IconUserCircle size={18} />
                Profile
              </span>
            </Link>
          </nav>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500">
                {session?.user?.email}
              </p>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <IconLogout size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}