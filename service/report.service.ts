import {
    IClientReport,
    IClientReportFilter,
    IDesignerReport,
    IDesignerReportFilter,
    ITeamReport,
    ITeamReportFilter
} from "@/interface/report.interface";
import { RTKApi } from "@/context/rtk-query";

export const reportApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        getDesignerWiseReport: build.query<
            IDesignerReport[],
            IDesignerReportFilter
        >({
            query: ({ designerId, formDate, toDate }) => ({
                url: "v1/reports/designer",
                params: {
                    designerId,
                    formDate,
                    toDate,
                },
            }),
        }),
        getClientWiseReport: build.query<
            IClientReport[],
            IClientReportFilter
        >({
            query: ({ clientId, formDate, toDate }) => ({
                url: "v1/reports/client",
                params: {
                    clientId,
                    formDate,
                    toDate,
                },
            }),
        }),
        getTeamWiseReport: build.query<
            ITeamReport[],
            ITeamReportFilter
        >({
            query: ({ teamId, formDate, toDate }) => ({
                url: "v1/reports/team",
                params: {
                    teamId,
                    formDate,
                    toDate,
                },
            }),
        }),
    }),
});

export const {
    useLazyGetDesignerWiseReportQuery,
    useLazyGetClientWiseReportQuery,
    useLazyGetTeamWiseReportQuery,
} = reportApi;