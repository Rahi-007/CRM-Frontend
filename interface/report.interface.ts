export interface IDesignerReportFilter {
    designerId: string;
    formDate: string;
    toDate: string;
}

export interface IDesignerReport {
    projectId: number;
    projectName: string;

    clientId: string;
    clientName: string;

    submitDate: string;
    submitCode: string;

    workType: number;
    subType?: number | null;
    status: number;
    quantity: number;
    link?: string | null;
}

export interface IClientReportFilter {
    clientId: string;
    formDate: string;
    toDate: string;
}

export interface IClientReport {
    projectId: number;
    projectName: string;

    assignedToId: string;
    assignedToName: string;

    submitDate: string;
    submitCode: string;

    workType: number;
    subType?: number | null;
    quantity: number;
    status: number;
    link?: string | null;
}

export interface ITeamReportFilter {
    teamId: number;
    formDate: string;
    toDate: string;
}

export interface ITeamReport {
    projectId: number;
    projectName: string;

    clientId: string;
    clientName: string;

    assignedToId: string;
    assignedToName: string;

    submitDate: string;
    submitCode: string;

    workType: number;
    subType?: number | null;
    quantity: number;
    status: number;
    link?: string | null;
}
export interface IPerformerReport {
    designerId: string;
    designerName: string;
    designerPhone: string;
    totalQuantity: number;
    approvedQuantity: number;
    submittedQuantity: number;
    inReviewQuantity: number;
    totalProjects: number;
    workingHours: number;
    approvalPercentage: number;
    averageQuantity: number;
}

export interface IPerformerReportFilter {
    teamId: number;
    clientId?: string;
    formDate: string;
    toDate: string;
}
export interface ISummaryReportFilter {
    teamId: number;
    formDate: string;
    toDate: string;
}