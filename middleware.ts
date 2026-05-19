// FRONTEND (Port 3000) - middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req:any) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isDashboard = pathname.startsWith("/dashboard");

  // Redirect logged-in users away from the login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect the dashboard layout
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};


// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Retrieve the token using the shared secret across your split apps
//   const token = await getToken({ 
//     req, 
//     secret: process.env.NEXTAUTH_SECRET 
//   });

//   const isAuth = !!token;

//   // Define the route categories based on your list
//   const isAdminRoute = pathname.startsWith("/api/admin");
//   const isTransactionRoute = pathname.startsWith("/api/transactions");

//   // 1. Authentication Guard: If no token exists for any of these routes
//   if ((isAdminRoute || isTransactionRoute) && !isAuth) {
//     return NextResponse.json(
//       { success: false, message: "Unauthorized: Access denied." },
//       { status: 401 }
//     );
//   }

//   // 2. Authorization Guard: Specifically for admin routes
//   if (isAdminRoute && token?.role !== "ADMIN") {
//     return NextResponse.json(
//       { success: false, message: "Forbidden: Admin privileges required." },
//       { status: 403 }
//     );
//   }

//   return NextResponse.next();
// }

// /**
//  * The matcher handles all the specific routes you provided.
//  * Using wildcards ensures nested paths (like /api/admin/users/123) are also protected.
//  */
// export const config = {
//   matcher: [
//     "/api/admin/:path*",      // Covers /users, /stats, /investments, /chatList, /wallet, etc.
//     "/api/transactions/:path*",
//     "/api/admin",             // Covers the base admin route
//   ],
// };