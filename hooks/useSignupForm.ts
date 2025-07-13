"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FormData } from "@/util/type";
import { toastSuccesscolor } from "@/util/toastcol";

export function useSignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [random, setRandom] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 401) {
        setRandom(result.error || "Invalid input");
        toast.error(result.error || "Invalid input");
        return;
      }
      if (response.status === 409) {
        setRandom(result.error || "User already exists");
        return;
      }
      if (response.status === 201) {
        toast.success(result.message, toastSuccesscolor);
        reset();
        router.push("/login");
      }

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        setRandom(error.message || "Something went wrong");
      } else {
        setRandom("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    if (errors.username) {
      setRandom(errors.username.message ?? "Invalid username");
    } else if (errors.email) {
      setRandom(errors.email.message ?? "Invalid email");
    } else if (errors.password) {
      setRandom(errors.password.message ?? "Invalid password");
    } else {
      setRandom("Please fill in all the fields.");
    }
  };

  return {
    showPassword,
    loading,
    random,
    register,
    handleSubmit,
    onSubmit,
    onError,
    togglePasswordVisibility,
  };
}
