import type { LucideIcon } from "lucide-react";

interface IProps {
    title: string;
    amount: number;
    description: string;
    icon: LucideIcon;
}

const MiniCard = ({ title, amount, description, icon: Icon }: IProps) => {
    return (
        <div className="rounded-xl border border-[#449690]/30 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[#449690]/80 gray-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                        {amount}
                    </h3>

                    <p className="mt-2 text-xs text-green-500">
                        {description}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#449690]/10">
                    <Icon className="h-5 w-5 text-[#449690]" />
                </div>
            </div>
        </div>
    )
}

export default MiniCard
