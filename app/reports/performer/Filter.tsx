"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";
import Client from "@/components/futures/Client";
import Team from "@/components/futures/Team";
import User from "@/components/futures/User";
import toast from "react-hot-toast";

const PerformerReportSchema = z
  .object({
    userId: z.string({ message: "Performer name is Required" }),
    clientId: z.string({ message: "Client name is Required" }),
    teamId: z.string({ message: "Team name is Required" }),
    formDate: z.date({ message: "Enter form date" }),
    toDate: z.date({ message: "Enter to date" }),
  })
  .refine(data => data.formDate <= data.toDate, {
    message: "To date must be greater than or equal to from date",
    path: ["toDate"],
  });

type PerformerReportFilterValues = z.infer<typeof PerformerReportSchema>;

const PerformerReportFilter = () => {
  const form = useForm<PerformerReportFilterValues>({
    resolver: zodResolver(PerformerReportSchema),
  });

  const onSubmit = async (values: PerformerReportFilterValues) => {
    try {
      // await addDesignation(values).unwrap();
      console.log(values);
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
        <User.Form control={form.control} name="userId" label="Performer Name" required />
        <Client.Form control={form.control} name="clientId" label="Client Name" required />
        <Team.Form control={form.control} name="teamId" label="Team Name" required />
        <GDatePicker.Form name="formDate" label="Form Date" control={form.control} placeholder="Form Date" required />
        <GDatePicker.Form name="toDate" label="To Date" control={form.control} placeholder="To Date" required />
      </div>

      <div className="flex justify-center sm:justify-end gap-1 sm:gap-3 bg-slate-50 px-8 py-3">
        <GButton action="reset" type="reset" onClick={() => form.reset()} />
        <GButton action="print" type="button" onClick={() => window.print()} className="hidden lg:block" />
        <GButton action="submit" type="submit" loading={form.formState.isSubmitting} />
      </div>
    </form>
  );
};

export default PerformerReportFilter;
