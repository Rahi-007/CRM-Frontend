"use client";

import PrintLayout from "@/components/layouts/PrintLayout";
import { ITeamReport } from "@/interface/report.interface";
import { ProjectStatus, SubType, WorkType } from "@/config/enum";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import ReportGrid from "@/components/layouts/DataGrid";
import Link from "next/link";

interface IProps {
  rowData: ITeamReport[];
}

const TeamReportDataTable = ({ rowData }: IProps) => {
  const columnDefs: ColDef<ITeamReport>[] = [
    {
      headerName: "Project Name",
      field: "projectName",
      sortable: true,
      filter: true,
      flex: 1.5,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<ITeamReport>) => {
        const { projectId, projectName } = params.data ?? {};

        return (
          <Link href={`/project/${projectId}`} target="_blank" className="hover:text-blue-600 hover:underline">
            {projectName}
          </Link>
        );
      },
    },
    {
      headerName: "Client Name",
      field: "clientName",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 160,
      cellRenderer: (params: ICellRendererParams<ITeamReport>) => {
        const { clientId, clientName } = params.data ?? {};

        return (
          <Link href={`/client/${clientId}`} target="_blank" className="hover:text-blue-600 hover:underline">
            {clientName}
          </Link>
        );
      },
    },
    {
      headerName: "Assigned To",
      field: "assignedToName",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 160,
      cellRenderer: (params: ICellRendererParams<ITeamReport>) => {
        const { assignedToId, assignedToName } = params.data ?? {};

        return (
          <Link href={`/user/${assignedToId}`} target="_blank" className="hover:text-blue-600 hover:underline">
            {assignedToName}
          </Link>
        );
      },
    },
    {
      headerName: "Work Type",
      field: "workType",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 130,
      cellRenderer: (params: { value: number }) => <span>{WorkType[params.value]?.replaceAll("_", " ") ?? "-"}</span>,
    },
    {
      headerName: "Sub Type",
      field: "subType",
      sortable: true,
      filter: true,
      width: 100,
      cellRenderer: (params: { value: number }) => <span>{SubType[params.value] ?? "-"}</span>,
    },
    {
      headerName: "Qty",
      field: "quantity",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 60,
    },
    {
      headerName: "Submit Date",
      field: "submitDate",
      sortable: true,
      filter: "agDateColumnFilter",
      width: 140,
      valueFormatter: params => {
        if (!params.value) return "-";

        return new Date(params.value).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      headerName: "Submit Code",
      field: "submitCode",
      sortable: true,
      filter: true,
      width: 140,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      width: 130,
      cellRenderer: (params: { value: ProjectStatus }) => {
        const statusMap = {
          [ProjectStatus.BM_Approved]: {
            label: "BM Approved",
            className: "text-blue-700",
          },
          [ProjectStatus.Brief_Submitted]: {
            label: "Brief Submitted",
            className: "text-yellow-700",
          },
          [ProjectStatus.HoM_Approved]: {
            label: "HoM Approved",
            className: "text-indigo-700",
          },
          [ProjectStatus.In_Review]: {
            label: "In Review",
            className: "text-purple-700",
          },
          [ProjectStatus.Running]: {
            label: "Running",
            className: "text-green-700",
          },
          [ProjectStatus.Canceled]: {
            label: "Canceled",
            className: "text-red-700",
          },
          [ProjectStatus.Revision]: {
            label: "Revision",
            className: "text-orange-700",
          },
        };
        const status = statusMap[params.value] ?? {
          label: "-",
          className: "bg-gray-100 text-gray-700",
        };

        return <span className={status.className}>{status.label}</span>;
      },
    },
    // {
    //   headerName: "Link",
    //   field: "link",
    //   sortable: false,
    //   filter: false,
    //   width: 90,
    //   cellRenderer: (params: ICellRendererParams<ITeamReport>) => {
    //     if (!params.value) return "-";

    //     return (
    //       <Link href={params.value} target="_blank" className="hover:text-blue-600 hover:underline">
    //         View
    //       </Link>
    //     );
    //   },
    // },
  ];

  return (
    <PrintLayout title="Client Wise Report">
      <ReportGrid rowData={rowData} columnDefs={columnDefs} />
    </PrintLayout>
  );
};

export default TeamReportDataTable;
