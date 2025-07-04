"use client";
import { MdEmail } from "react-icons/md";
import { useState, type Dispatch, type SetStateAction } from "react";
import { toastErrorcolor, toastSuccesscolor } from "@/util/toastcol";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = {
  setForgetPassword: Dispatch<SetStateAction<boolean>>;
};

function Forgetpassword({ setForgetPassword }: Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send reset link");

      const data = await res.json();
      console.log("Success:", data);

      toast.success("Successful check your email", toastSuccesscolor);
      setForgetPassword(false);
    } catch (error) {
      console.error(error);
      toast.error(
        (error as Error)?.message || "Failed to send reset link.",
        toastErrorcolor
      );
    }
  };
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-30 backdrop-blur-sm">
      <div className="p-6 rounded-xl shadow-lg w-full max-w-md bg-black md:mx-20 mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Forgot Password
        </h2>
        <p className="mb-4 text-white text-sm">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <div className="space-y-4">
          <div className="relative">
            <MdEmail className="absolute text-white top-1/2 left-3 transform -translate-y-1/2" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 border-2 border-white rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-gray-500 bg-transparent text-white"
            />
          </div>

          {/* <button className=" cursor-pointer font-[600] w-full bg-white dark:text-black text-black px-4 text-sm py-2 rounded"></button> */}
          <Button type="submit" onSubmit={handleSubmit} className="py-2 px-4">
            {" "}
            Send Reset Link
          </Button>
        </div>
        <button
          onClick={() => setForgetPassword(false)}
          className="mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400">
          Back to login
        </button>
      </div>
    </section>
  );
}

export default Forgetpassword;
