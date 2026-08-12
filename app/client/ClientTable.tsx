"use client";

import { ColDef } from "ag-grid-community";
import { SquarePen, Trash2 } from "lucide-react";
import { ICellRendererParams } from "ag-grid-community";
import { useDeleteClientMutation } from "@/service/client.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IClient } from "@/interface/client.interface";
import DataTable from "@/components/layouts/DataTable";
import toast from "react-hot-toast";
import Link from "next/link";

interface IProps {
    data: IClient[];
}

export default function ClientTable({ data }: IProps) {
    const [deleteClient] = useDeleteClientMutation();

    const columnDefs: ColDef<IClient>[] = [
        {
            headerName: "ID",
            field: "id",
            sortable: false,
            flex: 1,
        },
        {
            headerName: "Name",
            valueGetter: (params) =>
                [params.data?.firstName, params.data?.lastName]
                    .filter(Boolean)
                    .join(" "),
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: "Phone",
            field: "phone",
            sortable: true,
            filter: true,
            flex: 1,
        },
        {
            headerName: "Address",
            field: "address",
            filter: true,
            flex: 1,
        },
        {
            headerName: "Created At",
            field: "createdAt",
            valueFormatter: (params) => {
                if (!params.value) return "-";

                const date = new Date(params.value);
                return `${date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                })}, ${date.getFullYear()}`;
            },
            flex: 1,
        },
        {
            headerName: "Action",
            field: "id",
            width: 140,
            sortable: false,
            filter: false,
            headerComponent: () => (
                <div className="w-full text-center font-semibold">
                    Action
                </div>
            ),
            cellRenderer: (params: ICellRendererParams<IClient>) => (
                <div className="flex items-center justify-center gap-2 h-6">
                    <Link
                        href={`/client/${params.data?.id}`}
                    >
                        <SquarePen className="h-4 w-4 hover:text-blue-600" />
                    </Link>

                    <button
                        onClick={async () => {
                            if (!params.data?.id) return;

                            try {
                                await deleteClient(params.data.id).unwrap();
                                toast.success("Client deleted successfully");
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