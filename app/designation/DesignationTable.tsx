"use client";

import { IDesignation } from "@/interface/designation.interface";
import { useDeleteDesignationMutation } from "@/service/designation.service";
import { createActionColumn } from "@/components/layouts/AgGridActionColumn";
import { useAppSelector } from "@/hook/reduxHooks";
import { hasAnyPermission } from "@/lib/utils";
import { PERMISSIONS } from "@/config/const";
import { ColDef } from "ag-grid-community";
import DataTable from "@/components/layouts/DataTable";

interface IProps {
  data: IDesignation[];
}

export default function DesignationTable({ data }: IProps) {
  const [handleDelete] = useDeleteDesignationMutation();
  const userPermissions = useAppSelector(state => state.auth.permissions);
  const canShowAction = hasAnyPermission(userPermissions, [PERMISSIONS.ROLES_EDIT, PERMISSIONS.ROLES_DELETE]);
  const actionColumn = createActionColumn<IDesignation>({
    editPermission: PERMISSIONS.ROLES_EDIT,
    deletePermission: PERMISSIONS.ROLES_DELETE,
    editUrl: designation => `/designation/${designation.id}`,
    onDelete: designation => handleDelete(designation.id).unwrap(),
    deleteSuccessMessage: "Designation deleted successfully",
  });

  const columnDefs: ColDef<IDesignation>[] = [
    {
      headerName: "ID",
      field: "id",
      width: 50,
    },
    {
      headerName: "Designation",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Description",
      field: "narration",
      sortable: false,
      filter: false,
      flex: 2,
    },
    {
      headerName: "Total Permissions",
      valueGetter: params => params.data?.permissions?.length ?? 0,
      sortable: false,
      filter: false,
      width: 120,
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
    ...(canShowAction ? [actionColumn] : []),
  ];
  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
