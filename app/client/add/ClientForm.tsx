"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAddClientMutation, useDeleteClientMutation, useUpdateClientMutation } from "@/service/client.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { IClient } from "@/interface/client.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import GButton from "@/components/generic/GButton";
import GInput from "@/components/generic/GInput";
import toast from "react-hot-toast";

const ClientSchema = z.object({
  firstName: z.string().min(3, { message: "Client name must be at least 3 characters" }),
  lastName: z.string().optional(),
  phone: z.string().min(8, { message: "number must be at least 8 characters" }),
  address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof ClientSchema>;

interface IProps {
  title?: string;
  defaultValues?: IClient;
}

const ClientForm = (props: IProps) => {
  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [handleDelete] = useDeleteClientMutation();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      firstName: props.defaultValues?.firstName,
      lastName: props.defaultValues?.lastName || "",
      phone: props.defaultValues?.phone,
      address: props.defaultValues?.address || "",
    },
  });

  const onSubmit = async (values: ClientFormValues) => {
    try {
      if (props.defaultValues) {
        await updateClient({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Client updated successful");
      } else {
        await addClient(values).unwrap();
        form.reset();
        toast.success("Client added successful");
      }
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error.data?.message ?? "Something went wrong");
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl md:rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-3 sm:px-8 py-4 sm:py-6">
        <h2 className="text-2xl font-bold">{props.title ?? "Client Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2 xl:grid-cols-3">
        <GInput.Form name="firstName" label="First Name" control={form.control} placeholder="John" required />
        <GInput.Form name="lastName" label="Last Name" control={form.control} placeholder="Doe" />
        <GInput.Form name="phone" label="Phone Number" control={form.control} placeholder="01xxxxxxxxx" required />

        <div className="md:col-span-2 xl:md:col-span-3">
          <GInput.Form name="address" label="Address" control={form.control} placeholder="Address" />
        </div>
      </div>

      <div className="flex justify-center sm:justify-end rounded-b-2xl gap-1 sm:gap-3 border-t bg-slate-50 px-8 py-4 sm:py-5">
        {props.defaultValues ? (
          <>
            <GButton
              action="delete"
              type="button"
              onClick={async () => {
                if (!props.defaultValues?.id) return;

                try {
                  await handleDelete(props.defaultValues?.id).unwrap();
                  toast.success("Client deleted successfully");
                } catch (err) {
                  const error = err as FetchBaseQueryError & {
                    data?: { message?: string };
                  };
                  toast.error(error.data?.message ?? "Something went wrong");
                }
              }}
            />

            <GButton action="update" type="submit" loading={form.formState.isSubmitting} />
          </>
        ) : (
          <>
            <GButton action="reset" type="reset" onClick={() => form.reset()} />

            <GButton action="add" type="submit" loading={form.formState.isSubmitting} />
          </>
        )}
      </div>
    </form>
  );
};

export default ClientForm;
