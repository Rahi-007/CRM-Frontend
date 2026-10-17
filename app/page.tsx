"use client";

import MiniCard from "@/components/layouts/MiniCard";
import Container from "@/components/layouts/Container";
import QuickAction from "@/components/layouts/QuickAction";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BarChart3, BookUser, CircleCheck, ExternalLink, FileBarChart, FolderKanban, Users } from "lucide-react";
import { useGetDashboardReportQuery } from "@/service/dashboard.service";
import { useOnlineUsersQuery } from "@/service/user.service";
import { Skeleton } from "@/components/ui/skeleton";
import { PERMISSIONS } from "@/config/const";
import { useState } from "react";
import Link from "next/link";

const lines = ["#449690", "#6366f1", "#f59e0b", "#ec4899", "#8b5cf6"];

const quickListActions = [
  { name: "View Users", href: "/user", icon: Users },
  { name: "View Clients", href: "/client", icon: BookUser },
  { name: "View Projects", href: "/project", icon: FolderKanban },
  { name: "Add New Project", href: "/project/add", icon: FolderKanban },
];

const quickReportActions = [
  { name: "Ai Reports", href: "/reports", icon: BarChart3 },
  { name: "Top Performance", href: "/reports/performer", icon: FileBarChart },
  { name: "AI Summary Report", href: "/reports/summary", icon: BarChart3 },
];

export default function Home() {
  const { data, isLoading } = useGetDashboardReportQuery();
  const [fetchOnlineUsers, setFetchOnlineUsers] = useState(false);
  const {
    data: onlineUsers,
    isLoading: loading,
    isFetching,
    refetch,
  } = useOnlineUsersQuery(undefined, {
    skip: !fetchOnlineUsers,
    pollingInterval: 300000,
  });

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {/* Mini Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border border-[#449690]/30 bg-card p-5">
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
              icon={BookUser}
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
          {/* Project Overview Chart */}
          <div className="h-38 overflow-hidden rounded-xl border border-[#449690]/30 p-3 shadow-sm sm:col-span-2">
            <div className="mb-1">
              <h3 className="text-sm font-semibold">Project Overview</h3>
              <p className="text-[10px] text-muted-foreground">Projects by status</p>
            </div>

            {isLoading ? (
              <div className="h-[calc(9.5rem-2rem)] w-full animate-pulse">
                <div className="flex h-full items-end justify-around gap-2 px-4 pb-7 pt-3">
                  {[35, 65, 45, 85, 55, 30, 70].map((height, index) => (
                    <div key={index} className="w-full max-w-7 rounded-t-sm bg-[#449690]/15" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[calc(9.5rem-2rem)] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={(data?.projectOverview ?? []).map(item => ({
                      ...item,
                      statusName:
                        ["BM Approved", "Brief Submitted", "HoM Approved", "In Review", "Running", "Canceled", "Revision"][item.status] ?? "Unknown",
                    }))}
                    margin={{ top: 4, right: 4, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="statusName" tick={{ fontSize: 8 }} tickLine={false} axisLine={false} interval={0} height={28} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} width={25} />
                    <Tooltip />
                    <Bar dataKey="count" name="Projects" fill="#449690" radius={[3, 3, 0, 0]} maxBarSize={22} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Online Users */}
          <div className="p-4 rounded-xl border border-[#449690]/30 h-38 shadow-sm sm:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h3 className="text-sm font-semibold">Users Online</h3>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#449690] font-medium">{loading ? "Loading..." : `${onlineUsers?.length ?? 0} online`}</span>

                <button
                  onClick={() => {
                    if (!fetchOnlineUsers) {
                      setFetchOnlineUsers(true);
                    } else {
                      refetch();
                    }
                  }}
                  disabled={isFetching}
                  className="text-sm font-medium text-[#449690] hover:underline disabled:opacity-50"
                >
                  {isFetching ? "Loading..." : fetchOnlineUsers ? "Refresh" : "Fetch"}
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-9 rounded-full shrink-0" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))
              ) : !fetchOnlineUsers ? (
                <p className="text-sm text-gray-500">Click Fetch to load online users.</p>
              ) : onlineUsers && onlineUsers.length > 0 ? (
                onlineUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#449690]/10 text-[#449690] font-semibold">
                        {user.fullName.charAt(0).toUpperCase()}
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-500 shrink-0">
                      {new Date(user.lastSeenAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No users online right now.</p>
              )}
            </div>
          </div>

          {/* Recent projects */}
          <div className="h-52 rounded-xl border border-[#449690]/30 p-3 shadow-sm sm:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">Recent Projects</h3>
                <p className="text-xs text-muted-foreground">Latest 5 projects</p>
              </div>

              <Link href="/project" className="ml-2 flex shrink-0 items-center gap-1 text-xs font-medium text-[#449690] hover:underline">
                View all <ExternalLink size={12} />
              </Link>
            </div>

            <div className="h-34 space-y-1 overflow-y-auto pr-1">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex animate-pulse items-center gap-2 rounded-lg px-2 py-1.5">
                    <div className="size-8 shrink-0 rounded-md bg-[#449690]/10" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-muted" />
                      <div className="h-2 w-1/2 rounded bg-muted" />
                    </div>

                    <div className="w-24 shrink-0 space-y-2">
                      <div className="ml-auto h-2.5 w-16 rounded bg-[#449690]/10" />
                      <div className="ml-auto h-2 w-12 rounded bg-muted" />
                    </div>
                  </div>
                ))
              ) : data?.recentProjects?.length ? (
                data.recentProjects.map(project => {
                  const statusNames = ["BM Approved", "Brief Submitted", "Completed", "In Review", "Running", "Canceled", "Revision"];

                  return (
                    <div key={project.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#449690]/5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#449690]/10 text-[#449690]">
                        <FolderKanban size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium" title={project.name}>
                          {project.name}
                        </p>
                        <p className="truncate text-[10px] text-muted-foreground" title={`${project.clientName} · ${project.designerName}`}>
                          {project.clientName} · {project.designerName}
                        </p>
                      </div>

                      <div className="w-24 shrink-0 text-right">
                        <p className="truncate text-[10px] font-medium text-[#449690]" title={statusNames[project.status] ?? "Unknown"}>
                          {statusNames[project.status] ?? "Unknown"}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{new Date(project.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="py-6 text-center text-xs text-muted-foreground">No recent projects found.</p>
              )}
            </div>
          </div>

          {/* Quick Action List */}
          <div className="h-52 grid gap-2">
            {quickListActions.map(action => (
              <QuickAction {...action} key={action.href} />
            ))}
          </div>

          {/* Top 5 Performer trends line */}
          <div className="h-39 overflow-hidden rounded-xl border border-[#449690]/30 p-3 shadow-sm sm:col-span-3">
            <div className="mb-1">
              <h3 className="text-sm font-semibold">Top Performers</h3>
              <p className="text-[10px] text-muted-foreground">Monthly quantity trend · Top 5 designers · Last 12 months</p>
            </div>

            {isLoading ? (
              <div className="h-26.25 w-full animate-pulse">
                <svg viewBox="0 0 600 105" className="h-full w-full" preserveAspectRatio="none">
                  {[15, 35, 55, 75].map(y => (
                    <line key={y} x1="35" y1={y} x2="590" y2={y} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                  ))}
                  {[
                    {
                      color: "#449690",
                      points: "35,68 85,55 135,62 185,35 235,45 285,25 335,42 385,30 435,48 485,22 535,35 585,18",
                    },
                    {
                      color: "#818cf8",
                      points: "35,48 85,60 135,40 185,52 235,30 285,45 335,25 385,42 435,32 485,50 535,28 585,38",
                    },
                    {
                      color: "#f59e0b",
                      points: "35,75 85,68 135,78 185,60 235,68 285,55 335,65 385,50 435,60 485,45 535,58 585,48",
                    },
                    {
                      color: "#ec4899",
                      points: "35,30 85,42 135,25 185,40 235,20 285,32 335,18 385,35 435,22 485,38 535,20 585,28",
                    },
                    {
                      color: "#a78bfa",
                      points: "35,80 85,72 135,65 185,75 235,58 285,68 335,55 385,65 435,52 485,62 535,45 585,55",
                    },
                  ].map(line => (
                    <g key={line.color}>
                      <polyline
                        points={line.points}
                        fill="none"
                        stroke={line.color}
                        strokeOpacity="0.35"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {line.points.split(" ").map((point, index) => {
                        const [cx, cy] = point.split(",").map(Number);

                        return <circle key={index} cx={cx} cy={cy} r="2" fill={line.color} fillOpacity="0.4" />;
                      })}
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              (() => {
                const trends = data?.topPerformerTrends ?? [];

                const designers = Array.from(
                  new Map(trends.map(item => [item.designerId, { id: item.designerId, name: item.designerName }])).values()
                ).slice(0, 5);

                const months = Array.from(new Set(trends.map(item => item.month))).sort();

                const chartData = months.map(month => {
                  const row: Record<string, string | number> = { month };

                  designers.forEach(designer => {
                    row[designer.id] = trends.find(item => item.month === month && item.designerId === designer.id)?.totalQuantity ?? 0;
                  });

                  return row;
                });

                return (
                  <div className="h-26.25 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.12} />

                        <XAxis
                          dataKey="month"
                          tickFormatter={(value: string) => {
                            const year = Number(value.slice(0, 4));
                            const month = Number(value.slice(4, 6)) - 1;

                            return new Date(year, month, 1).toLocaleDateString("en-US", { month: "short" });
                          }}
                          tick={{ fontSize: 9 }}
                          tickLine={false}
                          axisLine={false}
                          interval={0}
                          minTickGap={0}
                          tickMargin={4}
                        />

                        <YAxis allowDecimals={false} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} width={28} domain={[0, "auto"]} />

                        <Tooltip
                          labelFormatter={value => {
                            const month = String(value);
                            const year = Number(month.slice(0, 4));
                            const monthIndex = Number(month.slice(4, 6)) - 1;

                            return new Date(year, monthIndex, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
                          }}
                          formatter={(value, name) => [value ?? 0, name]}
                        />

                        {designers.map((designer, index) => (
                          <Line
                            key={designer.id}
                            type="linear"
                            dataKey={designer.id}
                            name={designer.name}
                            stroke={lines[index % lines.length]}
                            strokeWidth={1.8}
                            dot={{ r: 2 }}
                            activeDot={{ r: 4 }}
                            connectNulls={false}
                            isAnimationActive={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                );
              })()
            )}
          </div>

          {/* Quick Action Report */}
          <div className="h-39 grid gap-2">
            {quickReportActions.map(action => (
              <QuickAction {...action} key={action.href} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
