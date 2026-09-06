"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { formatDate } from "@/lib/modifier";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLazyGetTeamWiseReportQuery } from "@/service/report.service";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";
import Team from "@/components/futures/Team";
import toast from "react-hot-toast";

interface IProps {
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
  getReport: ReturnType<typeof useLazyGetTeamWiseReportQuery>[0];
  resetReport: ReturnType<typeof useLazyGetTeamWiseReportQuery>[1]["reset"];
}

const TeamReportSchema = z
  .object({
    teamId: z.number({ message: "Team name is Required" }),
    formDate: z.string({ message: "Enter form date" }),
    toDate: z.string({ message: "Enter to date" }),
  })
  .refine(data => data.formDate <= data.toDate, {
    message: "To date must be greater than or equal to from date",
    path: ["toDate"],
  });

type TeamReportFilterValues = z.infer<typeof TeamReportSchema>;

const TeamReportFilter = ({ getReport, setTeamName, setDateRange, resetReport }: IProps) => {
  const form = useForm<TeamReportFilterValues>({
    resolver: zodResolver(TeamReportSchema),
  });

  const onSubmit = async (values: TeamReportFilterValues) => {
    try {
      const { formDate, toDate } = values;
      setDateRange(`${formatDate(formDate)} to ${formatDate(toDate)}`);
      await getReport(values).unwrap();
      toast.success("Report generated successfully");
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message ?? "Something went wrong");
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 md:grid-cols-2 xl:grid-cols-3">
        <Team.Form control={form.control} name="teamId" label="Team Name" setSelectedTeamName={setTeamName} required />
        <GDatePicker.Form name="formDate" label="Form Date" control={form.control} placeholder="Form Date" required />
        <GDatePicker.Form name="toDate" label="To Date" control={form.control} placeholder="To Date" required />
      </div>

      <div className="flex justify-center sm:justify-end gap-1 sm:gap-3 bg-slate-50 px-8 py-3">
        <GButton
          action="reset"
          type="reset"
          onClick={() => {
            form.reset();
            resetReport();
          }}
        />
        <GButton action="print" type="button" onClick={() => window.print()} className="hidden lg:block" />
        <GButton action="submit" type="submit" loading={form.formState.isSubmitting} />
      </div>
    </form>
  );
};

export default TeamReportFilter;
