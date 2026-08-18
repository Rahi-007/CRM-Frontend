"use client";

import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import toast from "react-hot-toast";
import Access from "./Access";

interface IActionColumnProps<T> {
    editPermission?: string;
    deletePermission?: string;

    editUrl?: (data: T) => string;

    onDelete?: (data: T) => Promise<void>;

    deleteSuccessMessage?: string;

    width?: number;
}

export function createActionColumn<T extends { id: number | string }>({
    editPermission,
    deletePermission,
    editUrl,
    onDelete,
    deleteSuccessMessage = "Deleted successfully",
    width = 140,
}: IActionColumnProps<T>): ColDef<T> {
    return {
        headerName: "Action",
        // field: "id",
        width,
        sortable: false,
        filter: false,

        headerComponent: () => (
            <div className="w-full text-center font-semibold">
                Action
            </div>
        ),

        cellRenderer: (params: ICellRendererParams<T>) => {
            const data = params.data;

            if (!data) return null;

            return (
                <div className="flex items-center justify-center gap-2 h-6">
                    {editPermission && editUrl && (
                        <Access permission={editPermission}>
                            <Link href={editUrl(data)}>
                                <SquarePen className="h-4 w-4 hover:text-blue-600" />
                            </Link>
                        </Access>
                    )}

                    {deletePermission && onDelete && (
                        <Access permission={deletePermission}>
                            <button
                                onClick={async () => {
                                    try {
                                        await onDelete(data);

                                        toast.success(deleteSuccessMessage);
                                    } catch (err) {
                                        const error = err as {
                                            data?: {
                                                message?: string;
                                            };
                                        };

                                        toast.error(
                                            error.data?.message ??
                                            "Something went wrong"
                                        );
                                    }
                                }}
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                        </Access>
                    )}
                </div>
            );
        },
    };
}