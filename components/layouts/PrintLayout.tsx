"use client";

import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    title: string;
}

const PrintLayout = ({ children, title }: IProps) => {
    return (
        <div className="w-full">
            {/* Print Header */}
            <div className="hidden print:block print-layout">
                <div className="border-b border-gray-300 pb-3">
                    <div className="flex items-center justify-between px-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {title}
                            </h1>

                            <p className="mt-0.5 text-sm text-gray-600">
                                UnityOps Software Limited
                            </p>
                        </div>

                        <div className="text-right text-xs text-gray-500">
                            <p>Generated Date</p>
                            <p className="font-medium text-gray-700">
                                {new Date().toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report */}
            {children}

            {/* Print Footer */}
            <div className="hidden print:block print-footer px-2">
                <div className="flex items-center justify-between pt-4 text-[10px] text-gray-500">
                    <span>UnityOps Software Limited</span>
                    <span>{title}</span>
                </div>
            </div>
        </div>
    );
};

export default PrintLayout;