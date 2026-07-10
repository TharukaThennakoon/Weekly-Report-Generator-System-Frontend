// components/layout/Topbar.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{session?.user?.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition"
        >
          <IconLogout size={16} />
          Log out
        </button>
      </div>
    </header>
  );
}