export interface IAiReportResponse {
    answer: string;
    generatedAtUtc: string;
}

export interface IAiChatMessage {
    role: "user" | "assistant";
    content: string;
}

export interface IAiSummaryRequest {
    from: string;
    to: string;
}

export interface IAiChatRequest {
    question: string;
    from: string;
    to: string;
    history: IAiChatMessage[];
}