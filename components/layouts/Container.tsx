"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hook/reduxHooks";

interface IProps {
  children: React.ReactNode;
  className?: string;
  permission: string;
}

const Container = ({ children, className, permission }: IProps) => {
  const permissions = useAppSelector(state => state.auth.permissions);
  const hasPermission = permissions?.some(item => item.name === permission) ?? false;

  if (!hasPermission) {
    return (
      <div className="flex min-h-[92.2vh] w-full items-center justify-center bg-[#F6FBFA] border border-gray-300">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            No Access View
          </h1>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full min-h-[92.4vh] bg-[#F6FBFA] border border-gray-300", className)}>
      {children}
    </div>
  );
};

export default Container;