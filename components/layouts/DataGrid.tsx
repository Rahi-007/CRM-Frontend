"use client";

import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface ReportGridProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
}

const ReportGrid = <T,>({
  rowData,
  columnDefs,
}: ReportGridProps<T>) => {
  return (
    <div className="flex justify-center print:justify-start">
    <div className=" report-grid">
      <AgGridReact<T>
        rowData={rowData}
        columnDefs={columnDefs}
        theme={themeBalham}
        domLayout="print"
        suppressCellFocus
      />
    </div>
    </div>
  );
};

export default ReportGrid;