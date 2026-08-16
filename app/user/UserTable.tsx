"use client";

import { ColDef } from "ag-grid-community";
import { IUser } from "@/interface/user.interface";
import { SquarePen, Trash2 } from "lucide-react";
import { ICellRendererParams } from "ag-grid-community";
import { useDeleteUserMutation } from "@/service/user.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import DataTable from "@/components/layouts/DataTable";
import toast from "react-hot-toast";
import Link from "next/link";

interface IProps {
  data: IUser[];
}

export default function UserTable({ data }: IProps) {
  const [deleteUser] = useDeleteUserMutation();

  const columnDefs: ColDef<IUser>[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      width: 108,
    },
    {
      headerName: "Name",
      valueGetter: params => [params.data?.firstName, params.data?.lastName].filter(Boolean).join(" "),
      sortable: true,
      filter: true,
      flex: 1.5,
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
      headerName: "Gender",
      field: "gender",
      width: 120,
      valueFormatter: params => {
        switch (params.value) {
          case 0:
            return "Male";
          case 1:
            return "Female";
          default:
            return "-";
        }
      },
    },
    {
      headerName: "Team",
      valueGetter: params => params.data?.team?.name ?? "-",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "RF ID",
      field: "rfId",
      flex: 1,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: params => {
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
      headerName: "Action",
      field: "id",
      width: 140,
      sortable: false,
      filter: false,
      headerComponent: () => <div className="w-full text-center font-semibold">Action</div>,
      cellRenderer: (params: ICellRendererParams<IUser>) => (
        <div className="flex items-center justify-center gap-2 h-6">
          <Link href={`/user/${params.data?.id}`}>
            <SquarePen className="h-4 w-4 hover:text-blue-600" />
          </Link>

          <button
            onClick={async () => {
              if (!params.data?.id) return;

              try {
                await deleteUser(params.data.id).unwrap();
                toast.success("User deleted successfully");
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

  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
