// // app/api/auth/[...nextauth]/route.ts
// import { handlers } from "@/lib/auth"; 
// export const { GET, POST } = handlers;

// app/api/auth/[...nextauth]/route.ts
// app/api/auth/[...nextauth]/route.ts
export const dynamic = "force-dynamic";

import NextRequest from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; 

const handler = NextAuth(authOptions);

// Explicitly handle incoming requests to protect internal context scopes
export async function GET(req: any, res: any) {
  return handler(req, res);
}

export async function POST(req: any, res: any) {
  return handler(req, res);
}