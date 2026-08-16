import ComingSoonCard from "@/components/layouts/ComingSoon";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import { PERMISSIONS } from "@/config/const";

const page = () => {
  return (
    <Container permission={PERMISSIONS.ROLES_VIEW}>
      <PageHeader
        title="All Designations"
        description="Manage Designations, permission and user access."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Designation" }]}
      />
      <div className="px-1 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        <ComingSoonCard />
      </div>
    </Container>
  );
};

export default page;
