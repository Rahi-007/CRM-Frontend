"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";

interface IProps {
  setDateRange: React.Dispatch<React.SetStateAction<{ from: string; to: string }>>;
}

const ChatFilterSchema = z
  .object({
    from: z.string().min(1, "From date is required"),
    to: z.string().min(1, "To date is required"),
  })
  .refine(data => data.from <= data.to, {
    message: "To date must be greater than or equal to From date",
    path: ["to"],
  });

export type ChatFilterValues = z.infer<typeof ChatFilterSchema>;

const Filter = ({ setDateRange }: IProps) => {
  const today = new Date().toLocaleDateString("en-CA");
  const monthStart = `${today.slice(0, 7)}-01`;

  const form = useForm<ChatFilterValues>({
    resolver: zodResolver(ChatFilterSchema),
    defaultValues: {
      from: monthStart,
      to: today,
    },
  });

  const onSubmit = (values: ChatFilterValues) => {
    setDateRange(values);
  };

  const handleReset = () => {
    form.reset();
    setDateRange({ from: "", to: "" });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-x-4 gap-y-1 px-3 sm:px-8 md:grid-cols-2">
        <GDatePicker.Form name="from" label="From Date" control={form.control} placeholder="From Date" required />

        <GDatePicker.Form name="to" label="To Date" control={form.control} placeholder="To Date" required />
      </div>

      <div className="flex justify-end gap-2 bg-slate-50 px-4 py-3 sm:px-8">
        <GButton action="reset" type="button" onClick={handleReset} />
        <GButton action="submit" type="submit" />
      </div>
    </form>
  );
};

export default Filter;
