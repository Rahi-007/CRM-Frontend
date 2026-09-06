"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useLazyGetTeamWiseReportQuery } from "@/service/report.service";
import DesignerReportDataTable from "./DataTable";
import { PERMISSIONS } from "@/config/const";
import DesignerReportFilter from "./Filter";
import { useState } from "react";

const Page = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [getTeamWiseReport, { isLoading, data, isSuccess, reset: resetReport }] = useLazyGetTeamWiseReportQuery();

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Team Wise Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Team Wise Report" }]}
        action={
          <DesignerReportFilter getReport={getTeamWiseReport} resetReport={resetReport} setTeamName={setTeamName} setDateRange={setDateRange} />
        }
      />
      {isLoading ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">Loading report...</p>
        </div>
      ) : isSuccess && data && data.length > 0 ? (
        <DesignerReportDataTable rowData={data} name={`Team Name: ${teamName}`} dateRange={dateRange} />
      ) : isSuccess ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">No report data found for the selected filters.</p>
        </div>
      ) : null}
    </Container>
  );
};

export default Page;
