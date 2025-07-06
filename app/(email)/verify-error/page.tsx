import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
            <Image
              src="/remove.png"
              alt="Error"
              width={60}
              height={60}
              className="w-12 h-12"
            />
          </div>
        </div>

        <h1 className="text-red-600 dark:text-red-400 text-2xl font-bold mb-4">
          Invalid or Expired Link
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The verification link is invalid or has expired. Please try signing up
          again.
        </p>

        <div className="flex flex-col space-y-3">
          <Button asChild variant="destructive">
            <Link href="/signup">Go to Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
