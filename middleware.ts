// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    const isManagerRoute = path.startsWith("/dashboard") ||
      path.startsWith("/team") ||
      path.startsWith("/projects") ||
      path.startsWith("/assistant") ||
      (path.startsWith("/reports") && path === "/reports"); // manager's all-reports view

    // block members from manager-only pages
    if (isManagerRoute && token?.role !== "MANAGER" && path !== "/reports") {
      return NextResponse.redirect(new URL("/reports/mine", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // just checks "is there a logged-in user at all" — role logic is above
      authorized: ({ token }) => !!token,
    },
  }
);

// only run this middleware on these paths — skip login/register/static assets
export const config = {
  matcher: [
    "/reports/:path*",
    "/dashboard/:path*",
    "/team/:path*",
    "/projects/:path*",
    "/assistant/:path*",
  ],
};