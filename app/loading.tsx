"use client";

import { Search } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F5FFFC]">
      <div className="flex flex-col items-center">
        <div className="relative h-50 w-100">
          <Search size={100} strokeWidth={2.5} className="text-primary search-loader ScanSearch" />
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Searching...</h2>
          <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your workspace</p>
        </div>

        <div className="mt-6 flex gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
