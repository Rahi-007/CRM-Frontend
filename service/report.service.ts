import { RTKApi } from "@/context/rtk-query";
import { IDesignerReport, IDesignerReportFilter } from "@/interface/report.interface";

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
    }),
});

export const {
    useGetDesignerWiseReportQuery,
    useLazyGetDesignerWiseReportQuery
} = reportApi;