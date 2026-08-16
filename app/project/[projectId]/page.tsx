"use client";

import { useParams } from "next/navigation";
import { PERMISSIONS } from "@/config/const";
import { useGetProjectByIdQuery } from "@/service/project.service";
import FormSkeleton from "@/components/layouts/FormSkeleton";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import ProjectForm from "../add/ProjectForm";

const Page = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading } = useGetProjectByIdQuery(Number(projectId));

  return (
    <Container permission={PERMISSIONS.PROJECTS_EDIT}>
      <PageHeader
        title="Edit Project"
        description="Update project information and permissions."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Project", href: "/project" }, { label: "Edit Project" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        {isLoading ? <FormSkeleton field={12} /> : <ProjectForm defaultValues={project} title={project?.name} />}
      </div>
    </Container>
  );
};

export default Page;
