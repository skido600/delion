"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect if no session or email not verified
  if (!session || session.user.emailVerified == null) {
    redirect("/login");
  }

  // Check if session expired
  if (session.expires) {
    const expiresDate = new Date(session.expires);
    const now = new Date();

    if (expiresDate <= now) {
      redirect("/login");
    }
  } else {
    redirect("/login");
  }

  return <>{children}</>;
}
