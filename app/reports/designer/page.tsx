"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useLazyGetDesignerWiseReportQuery } from "@/service/report.service";
import DesignerReportDataTable from "./DataTable";
import { PERMISSIONS } from "@/config/const";
import DesignerReportFilter from "./Filter";

const Page = () => {
  const [getDesignerWiseReport, { isLoading, data, isSuccess, reset: resetReport }] = useLazyGetDesignerWiseReportQuery();

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Designer Wise Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Designer Wise Report" }]}
        action={<DesignerReportFilter getReport={getDesignerWiseReport} resetReport={resetReport} />}
      />
      {isLoading ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">Loading report...</p>
        </div>
      ) : isSuccess && data && data.length > 0 ? (
        <DesignerReportDataTable rowData={data} />
      ) : isSuccess ? (
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-sm text-gray-500">No report data found for the selected filters.</p>
        </div>
      ) : null}
    </Container>
  );
};

export default Page;
