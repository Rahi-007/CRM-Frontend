"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useLazyGetClientWiseReportQuery } from "@/service/report.service";
import ClientReportDataTable from "./DataTable";
import { PERMISSIONS } from "@/config/const";
import ClientReportFilter from "./Filter";
import { useState } from "react";

const Page = () => {
  const [dateRange, setDateRange] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [getClientWiseReport, { isLoading, data, isSuccess, reset: resetReport }] = useLazyGetClientWiseReportQuery();

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Client Wise Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Client Wise Report" }]}
        action={
          <ClientReportFilter getReport={getClientWiseReport} resetReport={resetReport} setClientName={setClientName} setDateRange={setDateRange} />
        }
      />
      {isLoading ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">Loading report...</p>
        </div>
      ) : isSuccess && data && data.length > 0 ? (
        <ClientReportDataTable rowData={data} name={`Client Name: ${clientName}`} dateRange={dateRange} />
      ) : isSuccess ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">No report data found for the selected filters.</p>
        </div>
      ) : null}
    </Container>
  );
};

export default Page;
