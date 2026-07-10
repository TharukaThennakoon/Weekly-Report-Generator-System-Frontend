import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "./api";
import { User } from "@/types";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // your backend validates the password and returns the user
          const user = await api.post<User>("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });
          return user; // becomes the `user` object NextAuth stores
        } catch {
          return null; // null = "invalid credentials" shown to user
        }
      },
    }),
  ],
  callbacks: {
    // runs whenever a JWT is created/updated — attach role + id to the token
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as User).id;
        token.role = (user as User).role;
      }
      return token;
    },
    // runs whenever session() is called client-side — expose role + id
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as typeof session.user & {
          id?: string;
          role?: string;
        };
        user.id = token.id as string | undefined;
        user.role = token.role as string | undefined;
      }
      return session;
    },
  },
};