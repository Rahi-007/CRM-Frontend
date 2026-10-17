import { RTKApi } from "@/context/rtk-query";
import { IAiChatRequest, IAiReportResponse, IAiSummaryRequest } from "@/interface/ai_report.interface";

export const aiReportApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        generateAiSummary: build.mutation<
            IAiReportResponse,
            IAiSummaryRequest
        >({
            query: data => ({
                url: "ai-reports/summary",
                method: "POST",
                body: data,
            }),
        }),

        askAiReport: build.mutation<
            IAiReportResponse,
            IAiChatRequest
        >({
            query: data => ({
                url: "ai-reports/chat",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGenerateAiSummaryMutation,
    useAskAiReportMutation,
} = aiReportApi;