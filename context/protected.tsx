"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.emailVerified == null) {
    redirect("/login");
  }

  return <>{children}</>;
}
