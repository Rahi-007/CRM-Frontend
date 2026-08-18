"use client";

import { ColDef } from "ag-grid-community";
import { ProjectStatus } from "@/config/enum";
import { useDeleteProjectMutation } from "@/service/project.service";
import { createActionColumn } from "@/components/layouts/AgGridActionColumn";
import type { IProject } from "@/interface/project.interface";
import { hasAnyPermission } from "@/lib/utils";
import { useAppSelector } from "@/hook/reduxHooks";
import { PERMISSIONS } from "@/config/const";
import DataTable from "@/components/layouts/DataTable";
import Link from "next/link";

interface IProps {
  data: IProject[];
}

export default function ProjectTable({ data }: IProps) {
  const [deleteProject] = useDeleteProjectMutation();
  const userPermissions = useAppSelector(state => state.auth.permissions);
  const canShowAction = hasAnyPermission(userPermissions, [PERMISSIONS.PROJECTS_EDIT, PERMISSIONS.PROJECTS_DELETE]);
  const actionColumn = createActionColumn<IProject>({
    editPermission: PERMISSIONS.PROJECTS_EDIT,
    deletePermission: PERMISSIONS.PROJECTS_DELETE,
    editUrl: project => `/project/${project.id}`,
    onDelete: project => deleteProject(project.id).unwrap(),
    deleteSuccessMessage: "Project deleted successfully",
  });

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
      valueGetter: params => params.data?.client?.name,
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Assign To",
      field: "assignedTo.name",
      valueGetter: params => params.data?.assignedTo?.name,
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
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>{status.label}</span>
          </div>
        );
      },
    },
    {
      headerName: "Submit Date",
      field: "submitDate",
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
    ...(canShowAction ? [actionColumn] : []),
  ];

  return <DataTable rowData={data} columnDefs={columnDefs} />;
}
