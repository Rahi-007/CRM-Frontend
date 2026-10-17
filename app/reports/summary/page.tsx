"use client";

import { useState } from "react";
import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import { PERMISSIONS } from "@/config/const";
import Filter from "./Filter";

const Page = () => {
  const [summary, setSummary] = useState("");

  return (
    <Container permission={PERMISSIONS.USERS_VIEW}>
      <PageHeader
        title="AI Summary Report"
        description="Get AI-powered insights into project performance, designers, clients, and project statuses."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "AI Summary Report" }]}
        action={<Filter setSummary={setSummary} />}
      />

      {summary && (
        <section className="mt-6 space-y-4 rounded-xl border border-[#449690]/20 p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold">AI Summary</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              AI-powered insights into project performance, designers, clients, and project statuses.
            </p>
          </div>

          <article className="whitespace-pre-wrap rounded-lg bg-muted/40 p-4 text-sm leading-7">{summary}</article>
        </section>
      )}
    </Container>
  );
};

export default Page;
