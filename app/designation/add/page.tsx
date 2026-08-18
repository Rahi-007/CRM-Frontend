import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import DesignationForm from "./DesignationForm";
import { PERMISSIONS } from "@/config/const";

const page = () => {
  return (
    <Container permission={PERMISSIONS.ROLES_CREATE}>
      <PageHeader
        title="Add New Designation"
        description="Create a new designation and assign it to users."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Designation", href: "/designation" }, { label: "Add Designation" }]}
      />
      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        <DesignationForm />
      </div>
    </Container>
  );
};

export default page;
