import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import TeamForm from "./TeamForm";

const page = () => {
  return (
    <Container>
      <PageHeader
        title="Add New Team"
        description="Create a team and add members to collaborate effectively."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Team", href: "/team" }, { label: "Add Team" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        <TeamForm />
      </div>
    </Container>
  );
};

export default page;
