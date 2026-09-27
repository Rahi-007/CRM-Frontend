import { RTKApi } from "@/context/rtk-query";
import { IDashboardRes } from "@/interface/dashboard";

export const dashboardApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        getDashboardReport: build.query<IDashboardRes, void>({
            query: () => "v1/dashboard",
            providesTags: ["User", "Client", "Project"],
        }),
    }),
});

export const {
    useGetDashboardReportQuery
} = dashboardApi;