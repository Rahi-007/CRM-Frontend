import UserForm from "./UserForm";
import PageHeader from "@/components/layouts/PageHeader";
import Container from "@/components/layouts/Container";
import { PERMISSIONS } from "@/config/const";

const Page = () => {
  return (
    <Container permission={PERMISSIONS.USERS_CREATE}>
      <PageHeader
        title="Add New User"
        description="Create a new user account and assign permissions."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "User", href: "/user" }, { label: "Add User" }]}
      />

      <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4">
        <UserForm />
      </div>
    </Container>
  );
};

export default Page;
