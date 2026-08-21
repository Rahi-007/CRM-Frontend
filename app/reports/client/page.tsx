import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import ClientReportFilter from "./Filter";
import { PERMISSIONS } from "@/config/const";

const page = () => {
  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Client Wise Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Client Wise Report" }]}
        action={<ClientReportFilter />}
      />
    </Container>
  );
};

export default page;
