"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useGetAllTeamsQuery } from "@/service/team.service";
import TableSkeleton from "@/components/layouts/TableSkeleton";
import TeamTable from "./TeamTable";

const Page = () => {
  const { data, isLoading } = useGetAllTeamsQuery();

  return (
    <Container>
      <PageHeader
        title="All Teams"
        description="Manage team members, leaders, and assignments."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Team" }]}
      />

      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <TeamTable data={data ?? []} />
        )}
      </div>
    </Container>
  );
};

export default Page;
