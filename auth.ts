import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./model/User_model";
import { connectDB } from "./lib/mongo";

// Define your custom MongoDB user shape
// interface CustomUser {
//   id: string;
//   email: string;
//   username: string;
//   password: string;
// }

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
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        try {
          const email = credentials.email as string;
          const password = credentials.password as string;

          if (!email || !password) throw new Error("Missing email or password");

          await connectDB();

          const user = await User.findOne({ email }).select("+password");

          if (!user || !user.password)
            throw new Error("Invalid email or password");
          console.log("User found:", user);
          const isValid = await bcrypt.compare(password, user.password);
          console.log("Password valid:", isValid);
          if (!isValid) throw new Error("Invalid email or password");
          if (!user.emailVerified)
            throw new Error("Please verify your email first");
          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
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
      }
      return token;
    },
    // async session({ session, token }) {
    //   if (token) {
    //     session.user = {
    //       id: token.id as string,
    //       email: token.email as string,
    //       name: token.name as string,
    //     };
    //   }
    //   return session;
    // },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
