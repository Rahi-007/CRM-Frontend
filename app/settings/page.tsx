import Container from "@/components/layouts/Container";
import ComingSoonCard from "@/components/layouts/ComingSoon";
import { PERMISSIONS } from "@/config/const";

const page = () => {
  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <div className="p-2 sm:p-3 md:p-4 xl:p-6">
        <ComingSoonCard />
      </div>
    </Container>
  );
};

export default page;
