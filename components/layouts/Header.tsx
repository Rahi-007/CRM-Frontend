"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { clearAuth } from "@/context/slice/auth.slice";
import { useAppSelector } from "@/hook/reduxHooks";
import { logout } from "@/service/auth.service";
import toast from "react-hot-toast";

interface IProps {
    className?: string;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ className, setSidebarOpen, sidebarOpen }: IProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className={cn("print:hidden h-[4.5vh] w-full bg-[#449690] flex justify-between items-center border-b border-gray-300", className)}>
            <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="px-4 text-xl font-semibold"
            >
                <span className={`inline-block md:hidden transition-transform duration-500 ${sidebarOpen ? "italic -skew-x-6" : "not-italic skew-x-0"}`}>
                    UnityOps Soft
                </span>
                <span className="hidden md:inline-block">
                    UnityOps Software Limited
                </span>
            </button>
            <div ref={ref} className="relative">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="cursor-pointer px-2 py-2 hover:bg-white/20"
                >
                    <span className="text-lg font-semibold sm:hidden pl-10">{user?.firstName}</span>
                    <span className="text-lg font-semibold hidden sm:block">{user?.firstName} {user?.lastName ?? ""}</span>
                </button>
                <div
                    className={cn(
                        "absolute left-0 right-0 top-full shadow-sm rounded-sm transition-all duration-200 bg-green-50 z-1",
                        open
                            ? "translate-y-0 opacity-100 visible"
                            : "-translate-y-2 opacity-0 invisible"
                    )}
                >
                    <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="flex gap-1 px-3 justify-start items-center py-2 hover:bg-black/10 font-medium"
                    >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                    </Link>

                    <Link
                        href="/settings"
                        onClick={() => setOpen(false)}
                        className="flex gap-1 px-3 justify-start items-center py-2 hover:bg-black/10 font-medium"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>

                    <button
                        onClick={() => {
                            logout();
                            dispatch(clearAuth());
                            router.push("/")
                            setOpen(false);
                            toast.success("Logout Successful");
                        }}
                        className="w-full px-3 py-2 flex gap-1 justify-start items-center font-medium hover:bg-red-50 text-red-600 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
