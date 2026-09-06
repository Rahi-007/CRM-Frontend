"use client";

import PrintLayout from "@/components/layouts/PrintLayout";
import { IPerformerReport } from "@/interface/report.interface";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import ReportGrid from "@/components/layouts/DataGrid";
import Link from "next/link";

interface IProps {
  rowData: IPerformerReport[];
  name: string;
  name2: string;
  dateRange: string;
}

const PerformerReportDataTable = ({ rowData, name, name2, dateRange }: IProps) => {
  const columnDefs: ColDef<IPerformerReport>[] = [
    {
      headerName: "Designer Name",
      field: "designerName",
      sortable: true,
      filter: true,
      flex: 1.5,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<IPerformerReport>) => {
        const { designerId, designerName } = params.data ?? {};

        return (
          <Link href={`/user/${designerId}`} target="_blank" className="hover:text-blue-600 hover:underline">
            {designerName}
          </Link>
        );
      },
    },
    {
      headerName: "Contact Number",
      field: "designerPhone",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 140,
    },
    {
      headerName: "Total Projects",
      field: "totalProjects",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "Approved Qty",
      field: "approvedQuantity",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "Submitted Qty",
      field: "submittedQuantity",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "In Review  Qty",
      field: "inReviewQuantity",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "Total Qty",
      field: "totalQuantity",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "Approval %",
      field: "approvalPercentage",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}%</div>;
      },
      minWidth: 100,
    },
    {
      headerName: "Average Qty",
      field: "averageQuantity",
      sortable: true,
      filter: false,
      flex: 1,
      minWidth: 100,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{params.value}</div>;
      },
    },
    {
      headerName: "Working Hours",
      field: "workingHours",
      sortable: true,
      filter: false,
      flex: 1,
      cellRenderer: (params: { value: number }) => {
        return <div className="text-center">{!params.value || params.value === 0 ? "-" : params.value}</div>;
      },
      minWidth: 105,
    },
  ];

  return (
    <PrintLayout title="Top Performers" subTitle={name} subTitle2={name2} dateRange={dateRange}>
      <ReportGrid rowData={rowData} columnDefs={columnDefs} />
    </PrintLayout>
  );
};

export default PerformerReportDataTable;
