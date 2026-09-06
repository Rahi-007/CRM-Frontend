"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { formatDate } from "@/lib/modifier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyGetClientWiseReportQuery } from "@/service/report.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";
import Client from "@/components/futures/Client";
import toast from "react-hot-toast";

interface IProps {
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  getReport: ReturnType<typeof useLazyGetClientWiseReportQuery>[0];
  resetReport: ReturnType<typeof useLazyGetClientWiseReportQuery>[1]["reset"];
}

const ClientReportSchema = z
  .object({
    clientId: z.string({ message: "Client name is Required" }),
    formDate: z.string({ message: "Enter form date" }),
    toDate: z.string({ message: "Enter to date" }),
  })
  .refine(data => data.formDate <= data.toDate, {
    message: "To date must be greater than or equal to from date",
    path: ["toDate"],
  });

type ClientReportFilterValues = z.infer<typeof ClientReportSchema>;

const ClientReportFilter = ({ getReport, setClientName, setDateRange, resetReport }: IProps) => {
  const form = useForm<ClientReportFilterValues>({
    resolver: zodResolver(ClientReportSchema),
  });

  const onSubmit = async (values: ClientReportFilterValues) => {
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
        <Client.Form control={form.control} name="clientId" label="Client Name" setSelectedClientName={setClientName} required />
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

export default ClientReportFilter;
