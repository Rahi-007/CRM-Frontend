"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerateAiSummaryMutation } from "@/service/ai_report.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";
import toast from "react-hot-toast";

interface IProps {
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

const AiSummarySchema = z
  .object({
    from: z.string().min(1, "From date is required"),
    to: z.string().min(1, "To date is required"),
  })
  .refine(data => data.from <= data.to, {
    message: "To date must be greater than or equal to From date",
    path: ["to"],
  });

type AiSummaryValues = z.infer<typeof AiSummarySchema>;

const Filter = ({ setSummary }: IProps) => {
  const today = new Date().toLocaleDateString("en-CA");
  const monthStart = `${today.slice(0, 7)}-01`;
  const form = useForm<AiSummaryValues>({
    resolver: zodResolver(AiSummarySchema),
    defaultValues: {
      from: monthStart,
      to: today,
    },
  });

  const [generateAiSummary, { isLoading, reset }] = useGenerateAiSummaryMutation();

  const onSubmit = async (values: AiSummaryValues) => {
    setSummary("");
    try {
      const result = await generateAiSummary(values).unwrap();

      setSummary(result.answer);
      toast.success("AI summary generated successfully");
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message ?? "Something went wrong");
    }
  };

  const handleReset = () => {
    form.reset();
    reset();
    setSummary("");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 md:grid-cols-2">
        <GDatePicker.Form name="from" label="From Date" control={form.control} placeholder="From Date" required />

        <GDatePicker.Form name="to" label="To Date" control={form.control} placeholder="To Date" required />
      </div>

      <div className="flex justify-end gap-2 bg-slate-50 px-4 py-3 sm:px-8">
        <GButton action="reset" type="button" onClick={handleReset} />

        <GButton action="submit" type="submit" disabled={isLoading} loading={isLoading} />
      </div>
    </form>
  );
};

export default Filter;
