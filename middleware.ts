import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/authorized/admin", "/authorized/all"];

export async function middleware(req: NextRequest) {
  console.log("Middleware is running...");

  const session = await auth();
  console.log(session);
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Check if session is expired
    const now = new Date();
    const expires = new Date(session.expires);
    if (expires < now) {
      console.log("Session expired. Logging out user...");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Check if email is not verified
    if (!session.user.emailVerified) {
      console.log(typeof session.user.email);
      console.log("Email not verified. Redirecting to login...");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}
