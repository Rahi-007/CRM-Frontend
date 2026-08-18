"use client";

import ComingSoonCard from "@/components/layouts/ComingSoon";
import Container from "@/components/layouts/Container";
import { PERMISSIONS } from "@/config/const";

export default function Home() {
  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <div className="p-2 sm:p-3 md:p-4 xl:p-6">
        <ComingSoonCard />
      </div>
    </Container>
  );
}
