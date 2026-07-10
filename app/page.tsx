// app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  IconFileText,
  IconChartBar,
  IconUsers,
  IconMessageCircle,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconFileText,
    title: "Consistent weekly reports",
    description: "Every team member fills out the same structured form — nothing to configure, nothing to miss.",
  },
  {
    icon: IconChartBar,
    title: "Team dashboard & insights",
    description: "See submission compliance, blockers, and workload distribution at a glance.",
  },
  {
    icon: IconUsers,
    title: "Built for teams",
    description: "Role-based access keeps personal reports private and manager views comprehensive.",
  },
  {
    icon: IconMessageCircle,
    title: "AI-powered summaries",
    description: "Ask what your team worked on last week and get an instant answer.",
  },
];

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // if already logged in, skip the landing page entirely
  useEffect(() => {
    if (status === "authenticated") {
      const role = (session?.user as { role?: string })?.role;
      router.push(role === "MANAGER" ? "/dashboard" : "/reports/mine");
    }
  }, [status, session, router]);

  // avoid flashing the landing page for a split second before the redirect kicks in
  if (status === "loading" || status === "authenticated") {
    return <div className="min-h-screen bg-white" />;
  }

  return (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight text-gray-900">
          Team Reports
        </span>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>

    {/* Hero */}
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 pb-24 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
        <IconCheck size={14} />
        Weekly reporting made simple
      </div>

      <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-gray-950 sm:text-6xl">
        Weekly reports your team
        <br />
        will actually enjoy using.
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
        A structured reporting platform that keeps every weekly update
        consistent, gives managers real-time visibility, and helps teams stay
        aligned.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Get Started
          <IconArrowRight size={18} />
        </Link>

        <Link
          href="/login"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
          Log In
        </Link>
      </div>
    </section>

    {/* Dashboard Preview */}
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-100 to-white p-4 shadow-sm">
        <div className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-5 w-40 rounded bg-gray-200" />

            <div className="h-3 rounded bg-gray-100" />
            <div className="h-3 w-11/12 rounded bg-gray-100" />
            <div className="h-3 w-9/12 rounded bg-gray-100" />

            <div className="flex gap-3 pt-3">
              <div className="h-8 w-24 rounded-full border border-green-200 bg-green-50" />
              <div className="h-8 w-20 rounded-full border border-indigo-200 bg-indigo-50" />
              <div className="h-8 w-16 rounded-full border border-amber-200 bg-amber-50" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-24 rounded-xl border border-indigo-200 bg-indigo-50" />
            <div className="h-24 rounded-xl border border-amber-200 bg-amber-50" />
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="mb-14 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Everything your team needs
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Designed to make weekly reporting easier for employees while giving
          managers better visibility into team progress.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 transition group-hover:bg-indigo-100">
                <Icon size={22} className="text-indigo-600" />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Ready to simplify weekly reporting?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-600">
          Join your team today and start collecting structured reports with
          meaningful insights.
        </p>

        <Link
          href="/register"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          Create Account
          <IconArrowRight size={18} />
        </Link>
      </div>
    </section>
  </div>
);
}