import { IPermission } from "./auth.interface";

export interface IDesignation {
    id: number;
    name: string;
    permissions: IPermission[];
    narration?: string;
    createdAt: Date;
    updatedAt?: Date;
    createdBy: {
        id: string;
        name: string;
    };
    updatedBy?: {
        id: string;
        name: string;
    };
}
export interface ISelectDesignation {
    id: string;
    name: string;
}

export interface IAddDesignation {
    name: string;
    permissionIds: number[];
    narration?: string;
}
