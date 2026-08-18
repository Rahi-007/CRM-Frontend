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
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 border-2 rounded-md w-100">
      <h1 className="text-2xl py-4 font-semibold">Login Form</h1>
      <div className="p-4">
        <GInput.Form type="text" name="phone" label="Phone" control={form.control} placeholder="Phone number" className="mb-4" />
        <GInput.Form
          type={showPass ? "text" : "password"}
          name="password"
          label="Password"
          control={form.control}
          placeholder="password"
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <span className={form.formState.isSubmitting ? "invisible" : "inline-flex items-center gap-2"}>
              <LogIn className="h-4 w-4" />
              Sign in
            </span>

            {/* Loading animation */}
            {form.formState.isSubmitting && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
