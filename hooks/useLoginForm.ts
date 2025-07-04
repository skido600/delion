"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormData } from "@/util/type";
import { toastSuccesscolor, toastErrorcolor } from "@/util/toastcol";

const randomtextpasswordError = [
  "Oops! The password you entered is incorrect. Please try again.",
  "Hmm, that doesn’t look like the right password. Double-check and try again.",
  "We couldn’t verify your password. Make sure it’s typed correctly.",
  "Sorry, the password you entered doesn’t match our records.",
  "That password isn’t quite right. Please re-enter it carefully.",
  "Looks like that’s not the correct password. Give it another shot.",
  "Password mismatch. Kindly check and try again.",
  "We’re unable to log you in with that password. Please try again.",
  "The password entered is invalid. Please review and try once more.",
  "Too many failed attempts. Please take a moment and try again.",
];

const randomEmailerror = [
  "Hmm... we couldn't find that email in our admin records. Please double-check.",
  "This email doesn’t appear to be linked to an admin account.",
  "Oops! You may have entered the wrong email. Try again, please.",
  "We’re having trouble verifying this email for admin access.",
  "This email isn’t authorized for admin login. Please use a registered admin email.",
  "Sorry, that email isn’t on the list of approved admin users.",
  "Access restricted. Please use an email associated with an admin account.",
  "We couldn’t recognize this email. Make sure it’s spelled correctly.",
  "That email isn’t linked to admin privileges. Try another one.",
  "Looks like that’s not the right email for admin access. Please verify.",
];

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgetpassword, setForgetpassword] = useState(false);
  const [random, setRandom] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleForgetPassword = () => {
    setForgetpassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("signIn response:", res); // Check what's coming from backend

      if (res?.error) {
        if (res.error === "Please verify your email first") {
          toast.error(res.error, toastErrorcolor);
          setRandom(res.error);
        } else {
          toast.error("Invalid email or password", toastErrorcolor);
          setRandom("Invalid email or password");
        }
      } else if (res?.ok) {
        reset();
        toast.success("Login successful", toastSuccesscolor);
        router.push("/admin");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, toastErrorcolor);
      setRandom(message);
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    const emailType = errors.email?.type;
    const passwordType = errors.password?.type;

    if (emailType === "required" && passwordType === "required") {
      setRandom("Please fill in all the fields");
    } else if (emailType === "required") {
      setRandom("Email field can’t be empty.");
    } else if (emailType === "pattern") {
      const index = Math.floor(Math.random() * randomEmailerror.length);
      setRandom(randomEmailerror[index]);
    } else if (errors.email) {
      const index = Math.floor(Math.random() * randomEmailerror.length);
      setRandom(randomEmailerror[index]);
    } else if (passwordType === "required") {
      setRandom("Password field can’t be empty.");
    } else if (errors.password) {
      const index = Math.floor(Math.random() * randomtextpasswordError.length);
      setRandom(randomtextpasswordError[index]);
    } else {
      setRandom("");
    }
  };

  return {
    showPassword,
    forgetpassword,
    random,
    loading,
    register,
    handleSubmit,
    onSubmit,
    onError,
    togglePasswordVisibility,
    toggleForgetPassword,
    setForgetpassword,
  };
}
