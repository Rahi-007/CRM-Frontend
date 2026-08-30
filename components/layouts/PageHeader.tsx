import Link from "next/link";
import { House, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  action,
}: PageHeaderProps) {
  return (
    <div className={cn("print:hidden border-b bg-white", action ? "" : "h-[16vh] md:h-[18vh]")}>
      <div className={cn("w-full mx-auto px-3 md:px-8 md:py-4 ", action ? "py-3 xl:py-6" : "pt-3 xl:pt-6 xl:pb-6")}>
        {breadcrumbs.length > 0 && (
          <div className="mb-2 md:mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <House className="h-4 w-4" />

            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <div key={index} className="flex items-center gap-2">
                  {index !== 0 && <ChevronRight className="h-4 w-4" />}

                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#449690]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast
                          ? "font-medium text-[#449690]"
                          : ""
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
            {description && (
              <p className="mt-1 sm:mt-2 text-slate-500 text-xs sm:text-sm md:text-md truncate">
                {description}
              </p>
            )}
          </div>

        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}