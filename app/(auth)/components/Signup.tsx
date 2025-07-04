"use client";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoMdWarning } from "react-icons/io";
import { useSignupForm } from "@/hooks/useSignupForm";

function Signup() {
  const {
    showPassword,
    loading,
    random,
    register,
    handleSubmit,
    onSubmit,
    onError,
    togglePasswordVisibility,
  } = useSignupForm();

  return (
    <div className="flex justify-center py-12 px-4 h-screen overflow-y-auto dark:bg-[#0a0a0a] items-center">
      <section className="w-full max-w-xl">
        <h1 className="text-black md:text-[40px] text-2xl mb-4 font-bold dark:text-white tracking-[-1px]">
          Register to Delion Pos
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login">
            <i className="underline cursor-pointer">Login</i>
          </Link>{" "}
          and grow your business with us.
        </p>

        {random && (
          <div className="md:flex gap-x-2.5">
            <div className="mb-2 md:mb-0">
              <IoMdWarning className="text-red-500" size={30} />
            </div>
            <p className="text-red-600 mb-6">{random}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* username */}
          <div className="relative">
            <FaUser className="absolute dark:text-white top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 border-2 dark:border-white outline-none border-[#000235] rounded-lg focus:ring-1 focus:ring-[#000235] placeholder:text-gray-500"
            />
          </div>

          {/* email */}
          <div className="relative">
            <MdEmail className="absolute dark:text-white top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border-2 dark:border-white outline-none border-[#000235] rounded-lg focus:ring-1 focus:ring-[#000235] placeholder:text-gray-500"
            />
          </div>

          {/* password */}
          <div className="relative">
            <FaLock className="absolute dark:text-white top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border-2 dark:border-white outline-none border-[#000235] rounded-lg focus:ring-1 focus:ring-[#000235] placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#000235] focus:outline-none">
              {showPassword ? (
                <FaEyeSlash className="dark:text-white" />
              ) : (
                <FaEye className="dark:text-white" />
              )}
            </button>
          </div>

          {/* button */}
          <Button
            disabled={loading}
            type="submit"
            className="bg-black cursor-pointer font-[600] w-full dark:bg-white dark:text-black text-white px-4 text-sm py-4 rounded">
            {loading ? "Signing up..." : "Signup"}
          </Button>

          {/* terms */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            By continuing, you agree to our{" "}
            <span className="hover:underline text-blue-600 dark:text-blue-400">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="hover:underline text-blue-600 dark:text-blue-400">
              Privacy Policy
            </span>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Signup;
