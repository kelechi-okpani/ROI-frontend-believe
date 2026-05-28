import { BASE_URL } from "@/store/api/apiSlice";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const res = await fetch(
          // "http://localhost:3001/api/auth/login",
          `${BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) return null;

        const user = await res.json();

        if (!user?.token) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          token: user.token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        role: token.role as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        token: token.accessToken as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});