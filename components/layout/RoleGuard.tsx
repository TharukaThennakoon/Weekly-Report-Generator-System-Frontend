// components/layout/RoleGuard.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UserWithRole = { role?: "MEMBER" | "MANAGER" } | undefined;

export function RoleGuard({
  allowedRole,
  children,
}: {
  allowedRole: "MEMBER" | "MANAGER";
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session to resolve

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const role = (session?.user as UserWithRole)?.role;
    if (role !== allowedRole) {
      router.push(role === "MANAGER" ? "/dashboard" : "/reports/mine");
    }
  }, [status, session, allowedRole, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-gray-400">
        Loading...
      </div>
    );
  }

  const role = (session?.user as UserWithRole)?.role;
  if (role !== allowedRole) return null; // redirect is in flight, render nothing

  return <>{children}</>;
}