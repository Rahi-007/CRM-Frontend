"use client";

import { useState } from "react";
import PerformerReportFilter from "./Filter";
import Container from "@/components/layouts/Container";
import { useLazyGetPerformerReportQuery } from "@/service/report.service";
import PageHeader from "@/components/layouts/PageHeader";
import PerformerReportDataTable from "./DataTable";
import { PERMISSIONS } from "@/config/const";

const Page = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [getPerformerReport, { isLoading, data, isSuccess, reset: resetReport }] = useLazyGetPerformerReportQuery();

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Top Performer Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Top Performer Report" }]}
        action={
          <PerformerReportFilter
            getReport={getPerformerReport}
            resetReport={resetReport}
            setTeamName={setTeamName}
            setClientName={setClientName}
            setDateRange={setDateRange}
          />
        }
      />
      {isLoading ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">Loading report...</p>
        </div>
      ) : isSuccess && data && data.length > 0 ? (
        <PerformerReportDataTable
          rowData={data}
          name={`Team Name: ${teamName}`}
          name2={clientName ? `Client Name: ${clientName}` : ""}
          dateRange={dateRange}
        />
      ) : isSuccess ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">No report data found for the selected filters.</p>
        </div>
      ) : null}
    </Container>
  );
};

export default Page;
