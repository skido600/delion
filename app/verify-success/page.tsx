import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function VerifySuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Image
              src="/check.png"
              alt="Success"
              width={60}
              height={60}
              className="w-12 h-12"
            />
          </div>
        </div>

        <h1 className="text-green-600 dark:text-green-400 text-2xl font-bold mb-4">
          Email Verified Successfully!
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome to Delion POS. Your account is now ready to use.
        </p>

        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Continue to Login</Link>
        </Button>
      </div>
    </div>
  );
}
