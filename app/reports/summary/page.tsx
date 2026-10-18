"use client";

import { useState } from "react";
import { PERMISSIONS } from "@/config/const";
import Container from "@/components/layouts/Container";
import PageHeader from "@/components/layouts/PageHeader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Filter from "./Filter";

const Page = () => {
  const [summary, setSummary] = useState("");

  return (
    <Container permission={PERMISSIONS.REPORTS_VIEW}>
      <PageHeader
        title="AI Summary Report"
        description="Get AI-powered insights into project performance, designers, clients, and project statuses."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports", href: "/reports" }, { label: "AI Summary Report" }]}
        action={<Filter setSummary={setSummary} />}
      />

      {summary && (
        <section className="mt-6 space-y-5 rounded-xl border border-[#449690]/20 p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">AI Summary</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              AI-powered insights into project performance, designers, clients, and project statuses.
            </p>
          </div>

          <article
            className="
            rounded-lg border border-border/50 bg-muted/20
            p-4 sm:p-6
            text-sm leading-7 text-foreground
            [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-base
            [&_h3]:font-semibold [&_h3]:tracking-tight
            [&_h3:first-child]:mt-0
            [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-lg
            [&_h2]:font-semibold
            [&_p]:my-3
            [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-2
            [&_ul]:pl-5
            [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-2
            [&_ol]:pl-5
            [&_li]:pl-1
            [&_strong]:font-semibold [&_strong]:text-foreground
            [&_hr]:my-6 [&_hr]:border-border
            [&_blockquote]:my-4 [&_blockquote]:border-l-2
            [&_blockquote]:border-[#449690] [&_blockquote]:pl-4
            [&_blockquote]:text-muted-foreground
            [&_code]:rounded [&_code]:bg-muted
            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs
          "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
          </article>
        </section>
      )}
    </Container>
  );
};

export default Page;
