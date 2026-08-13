import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import ProjectForm from "./ProjectForm";

const page = () => {
  return (
    <Container>
      <PageHeader
        title="Add New Project"
        description="Create a project, assign members, and start tracking progress."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Project", href: "/project" }, { label: "Add Project" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        <ProjectForm />
      </div>
    </Container>
  );
};

export default page;
