import { BusinessUnit, ProjectStatus, SubType, WorkType } from "@/config/enum";

export interface IProject {
    id: number;
    name: string;
    businessUnit: BusinessUnit;
    client: {
        id: string;
        name: string;
    };
    briefCode?: string;
    workType: WorkType;
    subType?: SubType;
    quantity: number;
    submitDate: string;
    submitCode: string;
    status: ProjectStatus;
    assignedTo: {
        id: string;
        name: string;
    }
    link?: string;
    createdAt: Date;
    updatedAt?: Date;
    createdBy: {
        id: string;
        name: string;
    };
    updatedABy?: {
        id: string;
        name: string;
    };
}

export interface IAddProject {
    name: string;
    businessUnit: BusinessUnit;
    clientId: string;
    briefCode?: string;
    workType: WorkType;
    subType?: SubType;
    quantity: number;
    submitDate: string;
    submitCode: string;
    status: ProjectStatus;
    assignedToId: string;
    link?: string;
}

export interface ISelectProject {
    id: number;
    name: string;
}