"use client";

import { useParams } from "next/navigation";
import { PERMISSIONS } from "@/config/const";
import { useGetDesignationByIdQuery } from "@/service/designation.service";
import FormSkeleton from "@/components/layouts/FormSkeleton";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import DesignationForm from "../add/DesignationForm";

const Page = () => {
  const { designationId } = useParams<{ designationId: string }>();
  const { data: designation, isLoading } = useGetDesignationByIdQuery(Number(designationId));

  return (
    <Container permission={PERMISSIONS.ROLES_EDIT}>
      <PageHeader
        title="Edit Designation"
        description="Update designation and assign it to users."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Designation", href: "/designation" }, { label: "Edit Designation" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? <FormSkeleton field={2} /> : <DesignationForm defaultValues={designation} title={designation?.name} />}
      </div>
    </Container>
  );
};

export default Page;
