"use client";

import TeamForm from "../add/TeamForm";
import { useParams } from "next/navigation";
import { PERMISSIONS } from "@/config/const";
import { useGetTeamByIdQuery } from "@/service/team.service";
import FormSkeleton from "@/components/layouts/FormSkeleton";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";

const Page = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: user, isLoading } = useGetTeamByIdQuery(Number(teamId));

  return (
    <Container permission={PERMISSIONS.TEAMS_EDIT}>
      <PageHeader
        title="Edit Team"
        description="Update Team members to collaborate effectively."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Team", href: "/team" }, { label: "Edit Team" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? <FormSkeleton field={3} /> : <TeamForm defaultValues={user} title={user?.name} />}
      </div>
    </Container>
  );
};

export default Page;
