"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useGetAllDesignationsQuery } from "@/service/designation.service";
import { PERMISSIONS } from "@/config/const";
import TableSkeleton from "@/components/layouts/TableSkeleton";
import DesignationTable from "./DesignationTable";

const Page = () => {
  const { data, isLoading } = useGetAllDesignationsQuery();

  return (
    <Container permission={PERMISSIONS.ROLES_VIEW}>
      <PageHeader
        title="All Designations"
        description="Manage Designations, permission and user access."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Designation" }]}
      />
      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">{isLoading ? <TableSkeleton /> : <DesignationTable data={data ?? []} />}</div>
    </Container>
  );
};

export default Page;
