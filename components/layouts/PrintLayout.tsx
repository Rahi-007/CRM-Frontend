"use client";

import { useAppSelector } from "@/hook/reduxHooks";
import { formatDate } from "@/lib/modifier";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    title: string;
    subTitle: string;
    subTitle2?: string;
    dateRange?: string;
}

const PrintLayout = ({ children, title, subTitle, subTitle2, dateRange }: IProps) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="w-full">
            <div className="hidden print:block print-layout">
                <div className="border-b border-gray-300 pb-3">
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {title}
                            </h1>

                            <p className="mt-0.5 pl-0.5 text-sm italic text-gray-600">
                                {subTitle}
                            </p>

                            {subTitle2 &&
                                <p className="mt-0.5 pl-0.5 text-sm italic text-gray-600">
                                    {subTitle2}
                                </p>
                            }

                        </div>

                        <div className="flex flex-col items-end gap-1.5 text-right">
                            {dateRange && (
                                <p className="text-sm font-semibold text-gray-700">
                                    {dateRange}
                                </p>
                            )}

                            <p className="text-xs font-medium italic text-gray-600">
                                Generated: {formatDate(new Date())}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {children}

            <div className="hidden print:block print-footer px-2">
                <div className="flex items-center justify-between pt-4 text-[10px] text-gray-500">
                    <span>UnityOps Software Limited</span>
                    <span>Print by {user?.firstName} {user?.lastName ?? ""}</span>
                    <span>Authority Signature</span>
                </div>
            </div>
        </div>
    );
};

export default PrintLayout;