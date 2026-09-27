"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setAuth } from "@/context/slice/auth.slice";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/service/auth.service";
import { useAppDispatch } from "@/hook/reduxHooks";
import GInput from "../generic/GInput";
import toast from "react-hot-toast";
import GButton from "../generic/GButton";

const LoginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, {
      message: "Enter a valid Bangladeshi phone number",
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema)
  });
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { accessToken, user, permissions } = await login(values).unwrap();
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("permissions", JSON.stringify(permissions));
      localStorage.setItem("loginAt", new Date().toISOString());

      dispatch(setAuth({ accessToken, user, permissions }));
      toast.success(`Welcome Back ${user.firstName} ${user.firstName ?? ""}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F6FBFA] flex items-center justify-center px-5 py-10 sm:px-10 lg:px-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center rounded-full bg-[#449690]/10 px-4 py-2 text-sm font-medium text-[#449690] mb-5">
            Team Management Software
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#07484a]">
            Welcome to
            <span className="block text-[#449690]">
              TeamSync
            </span>
          </h1>

          <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-7 text-gray-600">
            Manage your teams, projects, and workflow in one simple and
            powerful platform. Sign in to continue managing your workspace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <span className="rounded-lg bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              ✓ Team Management
            </span>

            <span className="rounded-lg bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              ✓ Project Tracking
            </span>

            <span className="rounded-lg bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              ✓ Secure Access
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md mx-auto lg:ml-auto">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-[#449690]/10 border border-gray-100"
          >

            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#449690]/10">
                <LogIn className="h-6 w-6 text-[#449690]" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Welcome Back!
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sign in to continue to your account.
              </p>
            </div>

            <div className="space-y-1">
              <GInput.Form
                type="text"
                name="phone"
                label="Phone"
                control={form.control}
                placeholder="Enter your phone number"
                className="mb-4"
              />

              <GInput.Form
                type={showPass ? "text" : "password"}
                name="password"
                label="Password"
                control={form.control}
                placeholder="Enter your password"
                className="mb-5"
              />
            </div>

            <GButton
              type="submit"
              action="update"
              loading={form.formState.isSubmitting}
              className="w-full justify-center"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </GButton>

            <p className="mt-6 text-center text-xs text-gray-400">
              Secure access to your TeamSync workspace
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
