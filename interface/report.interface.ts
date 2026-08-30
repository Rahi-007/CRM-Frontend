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
    status: string;
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

    workType: string;
    subType?: string | null;
    quantity: number;
    status: string;
    link?: string | null;
}

export interface ITeamReportFilter {
    teamId: string;
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

    workType: string;
    subType?: string | null;
    quantity: number;
    status: string;
    link?: string | null;
}