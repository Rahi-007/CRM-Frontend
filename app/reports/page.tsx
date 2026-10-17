"use client";

import { useState } from "react";
import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { PERMISSIONS } from "@/config/const";
import Filter from "./Filter";
import Chat from "./Chat";

const Page = () => {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="AI Report Assistant"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "AI Report Assistant" }]}
        action={<Filter setDateRange={setDateRange} />}
      />

      <div className="m-4">
        <Chat dateRange={dateRange} />
      </div>
    </Container>
  );
};

export default Page;
