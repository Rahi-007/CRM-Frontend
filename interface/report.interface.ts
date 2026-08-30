export interface IDesignerReportFilter {
    designerId: string;
    formDate: string;
    toDate: string;
}

export interface IDesignerReport {
    projectId: number;
    projectName: string;

    designerId: string;
    designerName: string;

    clientId: string;
    clientName: string;

    workType: string;
    subType?: string | null;

    quantity: number;

    submitDate: string;
    submitCode: string;

    status: string;

    link?: string | null;
}