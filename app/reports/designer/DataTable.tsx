"use client";

import { ColDef, ICellRendererParams } from "ag-grid-community";
import ReportGrid from "@/components/layouts/DataGrid";
import { IDesignerReport } from "@/interface/report.interface";
import PrintLayout from "@/components/layouts/PrintLayout";

interface IProps {
  rowData: IDesignerReport[];
}

const DesignerReportDataTable = ({ rowData }: IProps) => {
  const columnDefs: ColDef<IDesignerReport>[] = [
    {
      headerName: "Project",
      field: "projectName",
      sortable: true,
      filter: true,
      flex: 1.5,
      minWidth: 180,
    },
    {
      headerName: "Client",
      field: "clientName",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 160,
    },
    {
      headerName: "Work Type",
      field: "workType",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 130,
    },
    {
      headerName: "Sub Type",
      field: "subType",
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 130,
      valueFormatter: params => params.value || "-",
    },
    {
      headerName: "Quantity",
      field: "quantity",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 110,
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
    },
    {
      headerName: "Link",
      field: "link",
      sortable: false,
      filter: false,
      width: 90,
      cellRenderer: (params: ICellRendererParams<IDesignerReport>) => {
        if (!params.value) return "-";

        return (
          <a href={params.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View
          </a>
        );
      },
    },
  ];

  return (
    <PrintLayout title="Designer Wise Report">
      <ReportGrid rowData={rowData} columnDefs={columnDefs} />
    </PrintLayout>
  );
};

export default DesignerReportDataTable;
