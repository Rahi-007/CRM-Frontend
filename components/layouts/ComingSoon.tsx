import { Construction } from "lucide-react";

export default function ComingSoonCard() {
  return (
    <div className="flex min-h-20 items-center justify-center bg-white p-10 rounded-sm sm:rounded-md xl:rounded-xl border border-[#449690]/30 shadow-sm">
      <div className="text-center">
        <div className="mx-auto w-16 mb-2">
          <Construction className="h-12 w-12 text -[#eaf3f2]" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Coming Soon
        </h2>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          This feature is currently under development and will be available in a
          future update.
        </p>
      </div>
    </div>
  );
}