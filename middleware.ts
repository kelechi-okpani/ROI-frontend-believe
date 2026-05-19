import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const token = req.auth?.user;

  // Allow login page always
  if (pathname.startsWith("/auth/login")) {
    if (token) {
      const target =
        token.role === "ADMIN"
          ? "/admin"
          : "/dashboard";

      return NextResponse.redirect(
        new URL(target, req.url)
      );
    }

    return NextResponse.next();
  }

  // Block unauthenticated users
  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  // Role guard
  if (
    pathname.startsWith("/admin") &&
    token.role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  if (
    pathname.startsWith("/dashboard") &&
    token.role === "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/admin", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/auth/login",
  ],
};