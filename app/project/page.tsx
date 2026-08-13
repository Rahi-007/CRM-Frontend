"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useGetAllProjectsQuery } from "@/service/project.service";
import TableSkeleton from "@/components/layouts/TableSkeleton";
import ProjectTable from "./ProjectTable";

const Page = () => {
  const { data, isLoading } = useGetAllProjectsQuery();

  return (
    <Container>
      <PageHeader
        title="All Projects"
        description="Manage project information, status, and assignments."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Project" }]}
      />
      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <ProjectTable data={data ?? []} />
        )}
      </div>
    </Container>
  );
};

export default Page;
