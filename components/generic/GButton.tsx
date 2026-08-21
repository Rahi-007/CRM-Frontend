"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GButtonType = "add" | "submit" | "update" | "delete" | "print" | "reset";

interface GButtonProps extends React.ComponentProps<typeof Button> {
    action: GButtonType;
    loading?: boolean;
}

const config: Record<
    GButtonType,
    {
        text: string;
        loadingText: string;
        className: string;
    }
> = {
    add: {
        text: "Create",
        loadingText: "Creating...",
        className:
            "bg-[#449690] hover:bg-[#3b837d] text-white",
    },
    submit: {
        text: "Submit",
        loadingText: "Submit...",
        className:
            "bg-[#449690] hover:bg-[#3b837d] text-white",
    },
    update: {
        text: "Update",
        loadingText: "Updating...",
        className:
            "bg-[#449690] hover:bg-[#3b837d] text-white",
    },
    delete: {
        text: "Delete",
        loadingText: "Deleting...",
        className:
            "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    },
    print: {
        text: "Print",
        loadingText: "Printing...",
        className:
            "bg-slate-700 hover:bg-slate-800 text-white",
    },
    reset: {
        text: "Reset",
        loadingText: "Resetting...",
        className:
            "border-gray-400 text-gray-700 hover:bg-gray-100",
    },
};

const GButton = ({
    action,
    loading = false,
    className,
    children,
    ...props
}: GButtonProps) => {
    const btn = config[action];

    return (
        <Button
            {...props}
            variant={action === "delete" || action === "reset" ? "outline" : "default"}
            disabled={loading || props.disabled}
            className={cn(
                "min-w-32 sm:min-w-36 cursor-pointer transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
                btn.className,
                className
            )}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children ?? (loading ? btn.loadingText : btn.text)}
        </Button>
    );
};

export default GButton;