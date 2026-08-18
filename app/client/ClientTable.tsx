"use client";

import { ColDef } from "ag-grid-community";
import { useAppSelector } from "@/hook/reduxHooks";
import { useDeleteClientMutation } from "@/service/client.service";
import { createActionColumn } from "@/components/layouts/AgGridActionColumn";
import { hasAnyPermission } from "@/lib/utils";
import { PERMISSIONS } from "@/config/const";
import { IClient } from "@/interface/client.interface";
import DataTable from "@/components/layouts/DataTable";

interface IProps {
  data: IClient[];
}

export default function ClientTable({ data }: IProps) {
  const [deleteClient] = useDeleteClientMutation();
  const userPermissions = useAppSelector(state => state.auth.permissions);
  const canShowAction = hasAnyPermission(userPermissions, [PERMISSIONS.CLIENTS_EDIT, PERMISSIONS.CLIENTS_DELETE]);
  const actionColumn = createActionColumn<IClient>({
    editPermission: PERMISSIONS.CLIENTS_EDIT,
    deletePermission: PERMISSIONS.CLIENTS_DELETE,
    editUrl: client => `/client/${client.id}`,
    onDelete: client => deleteClient(client.id).unwrap(),
    deleteSuccessMessage: "Client deleted successfully",
  });

  const columnDefs: ColDef<IClient>[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      flex: 1,
    },
    {
      headerName: "Name",
      valueGetter: params => [params.data?.firstName, params.data?.lastName].filter(Boolean).join(" "),
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
      valueFormatter: params => {
        if (!params.value) return "-";

        const date = new Date(params.value);
        return `${date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })}, ${date.getFullYear()}`;
      },
      flex: 1,
    },
    ...(canShowAction ? [actionColumn] : []),
  ];

  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
