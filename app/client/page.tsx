"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import TableSkeleton from "@/components/layouts/TableSkeleton";
import ClientTable from "./ClientTable";
import { useGetAllClientsQuery } from "@/service/client.service";

const Page = () => {
  const { data, isLoading } = useGetAllClientsQuery();

  return (
    <Container>
      <PageHeader
        title="All Clients"
        description="Manage client information and contact details."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Client" }]}
      />
      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <ClientTable data={data ?? []} />
        )}
      </div>
    </Container>
  );
};

export default Page;
