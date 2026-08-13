"use client";

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  RowSelectionModule,
  themeBalham
} from "ag-grid-community";
import {
  AgGridReact,
  type AgGridReactProps,
} from "ag-grid-react";


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  RowSelectionModule,
  ValidationModule,
]);

type DataTableProps<T> = AgGridReactProps<T> & {
  height?: string;
};

export default function DataTable<T>({ ...props }: DataTableProps<T>) {
  return (
    <div className="h-[73.3dvh] md:h-[69.3dvh]">
      <AgGridReact
        {...props}
        pagination
        animateRows
        ensureDomOrder
        suppressCellFocus
        enableCellTextSelection
        paginationPageSize={20}
        paginationPageSizeSelector={[20, 30, 50, 100, 500]}
        rowSelection={{ mode: "multiRow" }}
        theme={themeBalham.withParams({
          borderRadius: "8px",
          wrapperBorder: true,
          wrapperBorderRadius: "8px",
        })}
      />
    </div>
  );
}