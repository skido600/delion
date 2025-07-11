"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function UserBox() {
  const { data: session, status } = useSession();
  console.log(status);
  console.log(session);
  return (
    <Button variant="outline">
      {status === "loading" && <p>Loading...</p>}
      {status === "authenticated" && <p>Hello, {session?.user.name}</p>}
    </Button>
  );
}
