"use client";

import { useParams } from "next/navigation";
import { PERMISSIONS } from "@/config/const";
import { useGetUserByIdQuery } from "@/service/user.service";
import FormSkeleton from "@/components/layouts/FormSkeleton";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import UserForm from "../add/UserForm";

const Page = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);

  return (
    <Container permission={PERMISSIONS.USERS_EDIT}>
      <PageHeader
        title="Edit User"
        description="Update user information and permissions."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "User", href: "/user" }, { label: "Edit User" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? <FormSkeleton field={9} /> : <UserForm defaultValues={user} title={`${user?.firstName} ${user?.lastName ?? ""}`} />}
      </div>
    </Container>
  );
};

export default Page;
