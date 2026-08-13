import ComingSoonCard from "@/components/layouts/ComingSoon";
import Container from "@/components/layouts/Container";

const page = () => {
  return (
    <Container>
      <div className="p-2 sm:p-3 md:p-4 xl:p-6">
        <ComingSoonCard />
      </div>
    </Container>
  );
};

export default page;
