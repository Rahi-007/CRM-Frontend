"use client";

import Loading from "./loading";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { setAuth } from "@/context/slice/auth.slice";
import { logout } from "@/service/auth.service";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";
import Login from "@/components/layouts/LoginForm";

export default function Root({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const user = localStorage.getItem("user");
    const permissions = localStorage.getItem("permissions");
    const loginAt = localStorage.getItem("loginAt");

    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    if (token && user && permissions && loginAt) {
      if (Date.now() - new Date(loginAt).getTime() >= THIRTY_DAYS) {
        logout();
        window.location.href = "/login";
        return;
      }

      dispatch(
        setAuth({
          accessToken: token,
          user: JSON.parse(user),
          permissions: JSON.parse(permissions),
        })
      );
    }

    setTimeout(() => {
      setChecking(false);
    }, 0);
  }, [dispatch]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  if (checking) {
    return <Loading />;
  }

  if (!accessToken) {
    return (
      <div className="flex w-full items-center justify-center h-screen bg-white">
        <Login />
      </div>
    );
  }

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative md:flex">
        <SideBar
          className={cn(
            "absolute left-0 top-0 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="min-w-0 md:flex-1">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
