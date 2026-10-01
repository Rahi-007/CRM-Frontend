"use client";

import MiniCard from "@/components/layouts/MiniCard";
import Container from "@/components/layouts/Container";
import { CircleCheck, FolderKanban, Users, UsersRound } from "lucide-react";
import { useGetDashboardReportQuery } from "@/service/dashboard.service";
import { Skeleton } from "@/components/ui/skeleton";
import { PERMISSIONS } from "@/config/const";

export default function Home() {
  const { data, isLoading } = useGetDashboardReportQuery();

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#449690]/30 bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>

                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>

                <Skeleton className="mt-4 h-4 w-32" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MiniCard
              title="Total Users"
              amount={data?.totalUsers ?? 0}
              description={`${data?.userGrowthPercentage && data?.userGrowthPercentage === 0 ? "+" : ""}${data?.userGrowthPercentage ?? 0}% from last month`}
              icon={Users}
            />

            <MiniCard
              title="Total Clients"
              amount={data?.totalClients ?? 0}
              description={`${data?.clientsThisMonth && data.clientsThisMonth === 0 ? "+" : ""}${data?.clientsThisMonth ?? 0} new client this month`}
              icon={UsersRound}
            />

            <MiniCard
              title="Total Projects"
              amount={data?.totalProjects ?? 0}
              description={`${data?.projectsThisMonth ?? 0} active projects`}
              icon={FolderKanban}
            />

            <MiniCard
              title="Total Completed"
              amount={data?.totalCompletedProjects ?? 0}
              description={`${data?.completionRateThisMonth ?? 0}% completion rate this month`}
              icon={CircleCheck}
            />
          </div>
        )}

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-[#449690]/30 h-38 shadow-sm sm:col-span-2">Project Overview Chart</div>
          <div className="p-5 rounded-xl border border-[#449690]/30 h-38 shadow-sm sm:col-span-2">user online</div>
          <div className="p-5 rounded-xl border border-[#449690]/30 h-52 shadow-sm sm:col-span-3">recent projects</div>
          <div className="h-52 grid gap-2">
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
          </div>
          <div className="p-5 rounded-xl border border-[#449690]/30 h-39 shadow-sm sm:col-span-3">top performer</div>
          <div className="h-39 grid gap-2">
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
            <div className="p-5 rounded-xl border border-[#449690]/30 h-11 shadow-sm"></div>
          </div>
        </div>
      </div>
    </Container >
  );
}
