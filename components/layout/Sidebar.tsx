// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconFileText,
  IconUsers,
  IconFolders,
  IconMessageCircle,
  IconUser,
} from "@tabler/icons-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

const memberNav: NavItem[] = [
  { label: "My Reports", href: "/reports/mine", icon: IconFileText },
  { label: "Profile", href: "/profile", icon: IconUser },
];

const managerNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Team Reports", href: "/manager_reports", icon: IconFileText },
  { label: "Team", href: "/team", icon: IconUsers },
  { label: "Projects", href: "/projects", icon: IconFolders },
  { label: "Assistant", href: "/assistant", icon: IconMessageCircle },
];

export function Sidebar({ role }: { role: "MEMBER" | "MANAGER" }) {
  const pathname = usePathname();
  const items = role === "MANAGER" ? managerNav : memberNav;

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <span className="font-semibold text-gray-900">Team Reports</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                ${active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}