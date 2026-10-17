
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickActionProps = {
    name: string;
    href: string;
    icon: LucideIcon;
};

export default function QuickAction({
    name,
    href,
    icon: Icon,
}: QuickActionProps) {
    return (
        <Link
            href={href}
            className="group flex h-11 items-center justify-between rounded-md border border-[#449690]/30 px-4 shadow-sm transition-all duration-200 hover:border-[#449690]/60 hover:bg-[#449690]/5 hover:shadow-sm"
        >
            <span className="flex items-center gap-2.5">
                <Icon
                    size={17}
                    className="text-[#449690]"
                />
                <span className="text-sm font-medium">
                    {name}
                </span>
            </span>

            <ArrowUpRight
                size={16}
                className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
        </Link>
    );
}
