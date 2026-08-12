"use client";

import { ColDef } from "ag-grid-community";
import { ProjectStatus } from "@/config/enum";
import { SquarePen, Trash2 } from "lucide-react";
import { ICellRendererParams } from "ag-grid-community";
import type { IProject } from "@/interface/project.interface";
import { useDeleteProjectMutation } from "@/service/project.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import DataTable from "@/components/layouts/DataTable";
import toast from "react-hot-toast";
import Link from "next/link";

interface IProps {
    data: IProject[];
}

export default function ProjectTable({ data }: IProps) {
    const [deleteProject] = useDeleteProjectMutation();

    const columnDefs: ColDef<IProject>[] = [
        {
            headerName: "ID",
            field: "id",
            sortable: false,
            width: 50,
        },
        {
            headerName: "Project Name",
            field: "name",
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: "Client Name",
            field: "client.name",
            valueGetter: (params) => params.data?.client?.name,
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: "Assign To",
            field: "assignedTo.name",
            valueGetter: (params) => params.data?.assignedTo?.name,
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: "Brief Code",
            field: "briefCode",
            filter: true,
            flex: 1,
        },
        {
            headerName: "Quantity",
            field: "quantity",
            sortable: false,
            width: 66,
        },
        {
            headerName: "Status",
            field: "status",
            filter: true,
            width: 120,
            cellRenderer: (params: { value: ProjectStatus }) => {
                const statusMap = {
                    [ProjectStatus.BM_Approved]: {
                        label: "BM Approved",
                        className: "bg-blue-100 text-blue-700",
                    },
                    [ProjectStatus.Brief_Submitted]: {
                        label: "Brief Submitted",
                        className: "bg-yellow-100 text-yellow-700",
                    },
                    [ProjectStatus.HoM_Approved]: {
                        label: "HoM Approved",
                        className: "bg-indigo-100 text-indigo-700",
                    },
                    [ProjectStatus.In_Review]: {
                        label: "In Review",
                        className: "bg-purple-100 text-purple-700",
                    },
                    [ProjectStatus.Running]: {
                        label: "Running",
                        className: "bg-green-100 text-green-700",
                    },
                    [ProjectStatus.Canceled]: {
                        label: "Canceled",
                        className: "bg-red-100 text-red-700",
                    },
                    [ProjectStatus.Revision]: {
                        label: "Revision",
                        className: "bg-orange-100 text-orange-700",
                    },
                };
                const status = statusMap[params.value] ?? {
                    label: "-",
                    className: "bg-gray-100 text-gray-700",
                };

                return (
                    <div className="flex items-center h-full">
                        <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}
                        >
                            {status.label}
                        </span>
                    </div>
                );
            },
        },
        {
            headerName: "Submit Date",
            field: "submitDate",
            valueFormatter: (params) => {
                if (!params.value) return "-";

                const date = new Date(params.value);
                return `${date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                })}, ${date.getFullYear()}`;
            },
            width: 100,
        },
        {
            headerName: "Submit Code",
            field: "submitCode",
            filter: true,
            flex: 1,
        },
        {
            headerName: "Project Link",
            field: "link",
            filter: true,
            flex: 1,
            cellRenderer: (params: { value: string }) => {
                if (!params.value) return "-";

                return (
                    <Link
                        href={params.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                        Open
                    </Link>
                );
            },
        },
        {
            headerName: "Action",
            field: "id",
            width: 100,
            sortable: false,
            filter: false,
            headerComponent: () => (
                <div className="w-full text-center font-semibold">
                    Action
                </div>
            ),
            cellRenderer: (params: ICellRendererParams<IProject>) => (
                <div className="flex items-center justify-center gap-2 h-6">
                    <Link
                        href={`/project/${params.data?.id}`}
                    >
                        <SquarePen className="h-4 w-4 hover:text-blue-600" />
                    </Link>

                    <button
                        onClick={async () => {
                            if (!params.data?.id) return;

                            try {
                                await deleteProject(params.data.id).unwrap();
                                toast.success("Project deleted successfully");
                            } catch (err) {
                                const error = err as FetchBaseQueryError & {
                                    data?: { message?: string };
                                };
                                toast.error(error.data?.message ?? "Something went wrong");
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            rowData={data}
            columnDefs={columnDefs}
        />
    );
}