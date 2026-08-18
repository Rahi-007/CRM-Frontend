"use client";

import { ColDef } from "ag-grid-community";
import { IUser } from "@/interface/user.interface";
import { useAppSelector } from "@/hook/reduxHooks";
import { useDeleteUserMutation } from "@/service/user.service";
import { createActionColumn } from "@/components/layouts/AgGridActionColumn";
import { hasAnyPermission } from "@/lib/utils";
import { PERMISSIONS } from "@/config/const";
import DataTable from "@/components/layouts/DataTable";

interface IProps {
  data: IUser[];
}

export default function UserTable({ data }: IProps) {
  const [deleteUser] = useDeleteUserMutation();
  const userPermissions = useAppSelector(state => state.auth.permissions);
  const canShowAction = hasAnyPermission(userPermissions, [PERMISSIONS.USERS_EDIT, PERMISSIONS.USERS_DELETE]);
  const actionColumn = createActionColumn<IUser>({
    editPermission: PERMISSIONS.USERS_EDIT,
    deletePermission: PERMISSIONS.USERS_DELETE,
    editUrl: user => `/user/${user.id}`,
    onDelete: user => deleteUser(user.id).unwrap(),
    deleteSuccessMessage: "User deleted successfully",
  });

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
      headerName: "Role",
      valueGetter: params => params.data?.role?.name ?? "-",
      sortable: true,
      filter: true,
      flex: 1.2,
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
    ...(canShowAction ? [actionColumn] : []),
  ];

  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
