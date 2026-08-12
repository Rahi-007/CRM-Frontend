"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { cn } from "@/lib/utils";

type IFormDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  required,
  disabled,
}: IFormDatePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const dateValue = field.value ? new Date(field.value) : undefined;
        const isValidDate = dateValue && !isNaN(dateValue.getTime());

        return (
          <div className="grid gap-1 mb-4 w-full">
            {label && (
              <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </Label>
            )}

            <Popover>
              <PopoverTrigger
                render={(props) => (
                  <button
                    {...props}
                    id={name}
                    type="button"
                    disabled={disabled}
                    className={cn(
                      "flex w-full justify-between items-center text-left font-normal rounded-none border-b-2 bg-[#f6fbfa] text-gray-900 shadow-none px-3 transition-colors duration-200 h-10 text-sm cursor-pointer outline-hidden",
                      "hover:border-[#449690] focus-visible:border-[#449690]",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      !isValidDate && "text-gray-400",
                      fieldState.error ? "border-b-destructive" : "border-gray-300"
                    )}
                  >
                    <span>
                      {isValidDate ? format(dateValue, "dd MMM yyyy") : placeholder}
                    </span>

                    <CalendarIcon className="h-5 w-5 text-[#449690]" />
                  </button>
                )} />

              <PopoverContent
                className="m-0 p-0 border-b border-x border-t-transparent  hover:border-[#449690] rounded-b-md w-full"
                align="center"
              >
                <Calendar
                  mode="single"
                  captionLayout="label"
                  startMonth={new Date(1950, 0)}
                  endMonth={new Date(new Date().getFullYear(), 11)}
                  defaultMonth={isValidDate ? dateValue : new Date()}
                  selected={isValidDate ? dateValue : undefined}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : undefined);
                  }}
                  // selected={isValidDate ? dateValue : undefined}
                  // onSelect={field.onChange}
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>

            {fieldState.error && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldState.error.message}
              </p>
            )}
          </div >
        );
      }}
    />
  );
}

const GDatePicker = {
  Form: FormDatePicker,
};

export default GDatePicker;