import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import DesignerReportFilter from "./Filter";
import { PERMISSIONS } from "@/config/const";

const page = () => {
  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="Designer Wise Report"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Designer Wise Report" }]}
        action={<DesignerReportFilter />}
      />
    </Container>
  );
};

export default page;
