"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import menus from "../../lib/menu"

const MIN_WIDTH = 220;
const MAX_WIDTH = 420;
const DEFAULT_WIDTH = 280;

interface IPropsItems {
    title: string;
    icon: LucideIcon;
    link: string;
    active: string;
    subItem: {
        title: string;
        href: string;
    }[] | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<string | null>>;
    onToggle: () => void;
    onRouteClick: () => void;
}

const MenuItems = ({ title, icon: Icon, link, active, subItem, onToggle, open, setOpen, onRouteClick }: IPropsItems) => {
    const isActive = active === link || active.startsWith(link + "/");
    return (
        <li className={cn("transition-colors",
            isActive
                ? 'bg-[#4a615f] hover:bg-[#4a615f]/80 text-white'
                : 'bg-transparent hover:bg-white/20 text-black'
        )}>
            <div className="pl-4 flex w-full items-center">
                <Link
                    href={link}
                    onClick={() => {
                        setOpen(null)
                        onRouteClick();
                    }}
                    className="w-full flex items-center gap-3 py-2"
                >
                    <Icon size={18} />
                    {title}
                </Link>

                {subItem && (
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-black/10 transition"
                    >
                        <ChevronDown
                            size={18}
                            className={cn(
                                "transition-transform duration-300 ease-in-out",
                                open && "rotate-180"
                            )}
                        />
                    </button>
                )}
            </div>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    open ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                )}
            >
                <ul className={cn("ml-8 space-y-1 border-l  pl-4",
                    isActive
                        ? 'border-gray-300'
                        : 'border-gray-900'
                )}
                >
                    {subItem?.map((child) => (
                        <li
                            key={child.href}
                            onClick={() => {
                                onToggle();
                                onRouteClick();
                            }}
                        >
                            <Link
                                href={child.href}
                                className={cn("block rounded-xs px-2 py-2 text-sm transition-colors ",
                                    active === child.href
                                        ? "bg-black/20 hover:bg-black/15"
                                        : "hover:bg-white/15"
                                )}
                            >
                                {child.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li >
    )
}

interface IProps {
    className?: string;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = ({ className, setSidebarOpen }: IProps) => {
    const pathname = usePathname();
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    useEffect(() => {
        queueMicrotask(() => {
            const saved = localStorage.getItem("sidebar-width");

            if (saved) {
                setWidth(Number(saved));
            }
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebar-width", String(width));
    }, [width]);

    const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = width;

        const handleMouseMove = (event: MouseEvent) => {
            const newWidth = Math.min(
                MAX_WIDTH,
                Math.max(MIN_WIDTH, startWidth + (event.clientX - startX))
            );

            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleRouteClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <div
            className={cn("relative min-h-[95.5vh] border-r border-gray-300 bg-[#449690]", className)}
            style={{ width }}
        >
            <h1 style={{ fontFamily: "var(--font-salsa)" }} className="pt-1 pb-2 px-4 text-sm underline">
                Team Management Software
            </h1>

            <ul className="bg- [#53a78d] ml-3">
                {menus.map((item) => (
                    <MenuItems
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        link={item.href}
                        subItem={item.children}
                        active={pathname}
                        open={openMenu === item.title}
                        setOpen={setOpenMenu}
                        onToggle={() =>
                            setOpenMenu((prev) =>
                                prev === item.title ? null : item.title
                            )
                        }
                        onRouteClick={handleRouteClick}
                    />
                ))}
            </ul>

            <div
                onMouseDown={startResize}
                className="absolute top-0 right-0 h-full w-1 cursor-ew-resize hover:bg-[#4a615f]"
            />

            <div className="border-t dark:border-gray-300 text-right absolute bottom-0 left-0 w-full h-[3.2vh]">
                <small className="pl-1 font-light font-mono text-xs">
                    Author:
                    <Link href="https://github.com/Rahi-007" target="_blank" className="hover:underline italic pr-2">
                        Bisakto Rahi
                    </Link>
                </small>
            </div>
        </div>
    );
};

export default SideBar;