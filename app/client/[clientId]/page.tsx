"use client";

import ClientForm from "../add/ClientForm";
import { useParams } from "next/navigation";
import { useGetClientByIdQuery } from "@/service/client.service";
import FormSkeleton from "@/components/layouts/FormSkeleton";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";

const Page = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data: user, isLoading } = useGetClientByIdQuery(clientId);

  return (
    <Container>
      <PageHeader
        title="Edit Client"
        description="Update client profile and add contact information."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Client", href: "/client" },
          { label: "Edit Team" },
        ]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? (
          <FormSkeleton field={3} narration={true} />
        ) : (
          <ClientForm defaultValues={user} title={`${user?.firstName} ${user?.lastName ?? ""}`} />
        )}
      </div>
    </Container>
  );
};

export default Page;