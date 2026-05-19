// FRONTEND (Port 3000) - auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string; 
    firstName: string;
    lastName: string;
    role: string;
    token?: string; // Optional: If your backend returns a specific JWT token
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    token?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Forward credentials to your Backend Server on Port 3001
        const res = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const backendUser = await res.json();

        // If the backend says no, return null to trigger an auth error
        if (!res.ok || !backendUser) {
          return null;
        }

        // Return the user data supplied by your backend API
        return {
          id: backendUser.id || backendUser._id, // map whatever your backend sends
          firstName: backendUser.firstName,
          lastName: backendUser.lastName,
          email: backendUser.email,
          role: backendUser.role,
          token: backendUser.token, // Store it if your backend uses tokens
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.token = user.token;
      }
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const t: any = token;
        session.user.id = t.id as string;
        session.user.role = t.role as string;
        session.user.firstName = t.firstName as string;
        session.user.lastName = t.lastName as string;
        (session.user as any).token = t.token as string | undefined;
      }
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
});