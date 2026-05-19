// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    console.log("Middleware Check - Token Payload:", token);

    const { pathname } = req.nextUrl;

    // If an authenticated user manually browses to the login page, redirect them to their home base
    if (pathname.startsWith("/auth/login") && token) {
      const targetPath = token.role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(targetPath, req.url));
    }

    // Role Enforcement Guard: Keep standard users out of administrative directories
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Keep administrative users cleanly separated from base customer dashboards
    if (pathname.startsWith("/dashboard") && token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Always allow the login page itself to bypass authentication checks
        if (pathname.startsWith("/auth/login")) {
          return true;
        }
        
        // For dashboard or admin paths, require a valid decrypted token
        // If this returns false, NextAuth handles the redirect to /auth/login natively and safely
        // return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
    // ⚡️ CRITICAL FIX: NextAuth v4 Middleware requires the secret passed explicitly right here 
    // to successfully decrypt tokens during Edge-level redirects.
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  }
);

export const config = {
  // Protect the dashboard, admin panel, and intercept requests to the auth login page
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/login"],
};




// // middleware.ts
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const isLoggedIn = !!req.nextauth.token;
//     const { pathname } = req.nextUrl;

//     const isAuthPage = pathname.startsWith("/auth/login");

//     // Redirect logged-in users away from the login page if they try to visit it
//     if (isAuthPage && isLoggedIn) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       // This callback determines if the page request should be authorized.
//       // If it returns false, the user is automatically redirected to pages.signIn (/auth/login).
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;
        
//         // Always allow the login page to load without authentication redirects
//         if (pathname.startsWith("/auth/login")) {
//           return true;
//         }
        
//         // For everything else matched by the config filter (like /dashboard), require a token
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   // Protect the dashboard and intercept requests to the auth login page
//   matcher: ["/dashboard/:path*", "/auth/login"],
// };