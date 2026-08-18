"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useAddDesignationMutation,
  useDeleteDesignationMutation,
  useGetAllPermissionsQuery,
  useUpdateDesignationMutation,
} from "@/service/designation.service";
import { IDesignation } from "@/interface/designation.interface";
import { PERMISSIONS } from "@/config/const";
import GButton from "@/components/generic/GButton";
import Access from "@/components/layouts/Access";
import GInput from "@/components/generic/GInput";
import toast from "react-hot-toast";

const DesignationSchema = z.object({
  name: z.string({ message: "Designation name is Required" }),
  narration: z.string().optional(),
  permissionIds: z.array(z.number()).min(1, "At least one permission is required"),
});

type DesignationFormValues = z.infer<typeof DesignationSchema>;

interface Props {
  title?: string;
  defaultValues?: IDesignation;
}

const DesignationForm = (props: Props) => {
  const [addDesignation] = useAddDesignationMutation();
  const [updateDesignation] = useUpdateDesignationMutation();
  const [handleDelete] = useDeleteDesignationMutation();
  const { data: permissions = [], isLoading } = useGetAllPermissionsQuery();
  const form = useForm<DesignationFormValues>({
    resolver: zodResolver(DesignationSchema),
    defaultValues: {
      name: props.defaultValues?.name,
      narration: props.defaultValues?.narration || "",
      permissionIds: props.defaultValues?.permissions.map(x => x.id),
    },
  });

  const onSubmit = async (values: DesignationFormValues) => {
    try {
      if (props.defaultValues) {
        await updateDesignation({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Designation updated successful");
      } else {
        await addDesignation(values).unwrap();
        form.reset();
        toast.success("Designation added successful");
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
        <h2 className="text-2xl font-bold">{props.title ?? "Project Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 pt-4 sm:pt-6 md:grid-cols-2 xl:grid-cols-3">
        <GInput.Form name="name" label="Project Name" control={form.control} placeholder="Designation Name" required />
        <div className="xl:col-span-2">
          <GInput.Form name="narration" label="Narration" control={form.control} placeholder="Description" />
        </div>
      </div>

      <div className="px-3 pb-4 sm:px-8 sm:pb-6">
        <label className="mb-3 block text-sm font-medium">
          Permissions <span className="text-gray-400"> ({permissions.length})</span>
        </label>

        <div className="grid gap-3 rounded-md border p-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded border bg-gray-200" />
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </div>
              ))
            : permissions.map(permission => (
                <label key={permission.id} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    value={permission.id}
                    className="h-4 w-4 accent-[#449690]"
                    checked={form.watch("permissionIds")?.includes(permission.id) ?? false}
                    onChange={e => {
                      const current = form.getValues("permissionIds") ?? [];

                      form.setValue("permissionIds", e.target.checked ? [...current, permission.id] : current.filter(id => id !== permission.id));
                    }}
                  />

                  <span className="text-sm">
                    {permission.module} - {permission.action}
                  </span>
                </label>
              ))}
        </div>
      </div>

      <div className="flex justify-center sm:justify-end rounded-b-2xl gap-1 sm:gap-3 border-t bg-slate-50 px-8 py-4 sm:py-5">
        {props.defaultValues ? (
          <>
            <Access permission={PERMISSIONS.ROLES_DELETE}>
              <GButton
                action="delete"
                type="button"
                onClick={async () => {
                  if (!props.defaultValues?.id) return;

                  try {
                    await handleDelete(props.defaultValues?.id).unwrap();
                    toast.success("Designation deleted successfully");
                  } catch (err) {
                    const error = err as FetchBaseQueryError & {
                      data?: { message?: string };
                    };
                    toast.error(error.data?.message ?? "Something went wrong");
                  }
                }}
              />
            </Access>

            <Access permission={PERMISSIONS.ROLES_EDIT}>
              <GButton action="update" type="submit" loading={form.formState.isSubmitting} />
            </Access>
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

export default DesignationForm;
