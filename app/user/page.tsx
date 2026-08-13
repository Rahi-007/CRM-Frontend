"use client";

import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { useGetAllUsersQuery } from "@/service/user.service";
import TableSkeleton from "@/components/layouts/TableSkeleton";
import UserTable from "./UserTable";

const Page = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  return (
    <Container>
      <PageHeader
        title="All Users"
        description="Manage user accounts, roles, and permissions."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "User" }]}
      />
      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <UserTable data={data ?? []} />
        )}
      </div>
    </Container>
  );
};

export default Page;