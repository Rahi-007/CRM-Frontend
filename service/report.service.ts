import {
    IClientReport,
    IClientReportFilter,
    IDesignerReport,
    IDesignerReportFilter,
    IPerformerReportFilter,
    ISummaryReportFilter,
    ITeamReportFilter,
    ITeamReport,
    IPerformerReport,
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
        getPerformerReport: build.query<
            IPerformerReport[],
            IPerformerReportFilter
        >({
            query: ({ teamId, clientId, formDate, toDate }) => ({
                url: "v1/reports/performer",
                params: {
                    clientId,
                    teamId,
                    formDate,
                    toDate,
                },
            }),
        }),
        getSummaryReport: build.query<
            IPerformerReport[],
            ISummaryReportFilter
        >({
            query: ({ teamId, formDate, toDate }) => ({
                url: "v1/reports/summary",
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
    useLazyGetPerformerReportQuery,
    useLazyGetSummaryReportQuery,
} = reportApi;