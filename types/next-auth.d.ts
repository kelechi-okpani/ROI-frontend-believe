import NextAuth, {
  DefaultSession,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      firstName: string;
      lastName: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    token: string;
  }
}