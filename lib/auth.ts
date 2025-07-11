/* eslint-disable */
import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import User from "@/model/User_model";
import { CredentialsSignin } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      emailVerified: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    emailVerified: string | null;
  }

  interface JWT {
    id: string;
    email: string;
    name?: string;
    emailVerified: string | null;
  }
}

class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user = await User.findOne({ email });
          if (!user) throw new CustomAuthError("UserNotFound");
          if (!user.emailVerified)
            throw new CustomAuthError("EmailNotVerified");

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) throw new CustomAuthError("InvalidPassword");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username ?? null,
            emailVerified: user.emailVerified ?? null,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
          throw new CustomAuthError(error.message || "CredentialsSignin");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = (user as any).emailVerified ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        emailVerified: (token as any).emailVerified ?? null,
      };
      return session;
    },
  },

  pages: {
    signIn: "/signup",
    newUser: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
