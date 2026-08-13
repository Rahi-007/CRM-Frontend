"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessUnit, ProjectStatus, SubType, WorkType } from "@/config/enum";
import { useAddProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from "@/service/project.service";
import type { IProject } from "@/interface/project.interface";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { enumToOptions } from "@/lib/utils";
import GSelect from "@/components/generic/GSelect";
import GInput from "@/components/generic/GInput";
import GAmount from "@/components/generic/GAmount";
import GDatePicker from "@/components/generic/GDatePicker";
import GButton from "@/components/generic/GButton";
import Client from "@/components/futures/Client";
import User from "@/components/futures/User";
import toast from "react-hot-toast";

const ProjectSchema = z.object({
  name: z.string({ message: "Project name is Required" }),
  businessUnit: z.number({ message: "Business Unit is Required" }),
  clientId: z.string({ message: "Client is Required" }),
  briefCode: z.string().optional(),
  workType: z.number({ message: "Work type Unit is Required" }),
  subType: z.number().optional(),
  quantity: z.number({ message: "Enter the quantity" }),
  submitDate: z.string().min(1, "Enter the submit date"),
  submitCode: z.string({ message: "Enter the submit code" }),
  status: z.number({ message: "Status is Required", }),
  assignedToId: z.string({ message: "Assign a user" }),
  link: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof ProjectSchema>;

interface Props {
  title?: string;
  defaultValues?: IProject;
}

const ProjectForm = (props: Props) => {
  const [addUser] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [handleDelete] = useDeleteProjectMutation();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: props.defaultValues?.name,
      businessUnit: props.defaultValues?.businessUnit,
      clientId: props.defaultValues?.client?.id,
      briefCode: props.defaultValues?.briefCode,
      workType: props.defaultValues?.workType,
      subType: props.defaultValues?.subType,
      quantity: props.defaultValues?.quantity,
      submitDate: props.defaultValues?.submitDate,
      submitCode: props.defaultValues?.submitCode,
      status: props.defaultValues?.status,
      assignedToId: props.defaultValues?.assignedTo?.id,
      link: props.defaultValues?.link || "",
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      if (props.defaultValues) {
        await updateProject({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Project updated successful");
      } else {
        await addUser(values).unwrap();
        form.reset();
        toast.success("Project added successful");
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

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2 xl:grid-cols-3">
        <GDatePicker.Form name="submitDate" label="Submit Date" control={form.control} placeholder="Submit Date" required />
        <GInput.Form name="name" label="Project Name" control={form.control} placeholder="Project Name" required />
        <GSelect.Form control={form.control} name="businessUnit" label="Business Unit" placeholder="Select Business Unit" options={enumToOptions(BusinessUnit)} required />

        <Client.Form control={form.control} name="clientId" label="Client" required />
        <User.Form control={form.control} name="assignedToId" label="Assign User" required />
        <GSelect.Form control={form.control} name="status" label="Status" options={enumToOptions(ProjectStatus)} required />

        <GAmount.Form name="quantity" label="Quantity" type="number" control={form.control} placeholder="Quantity" required />
        <GSelect.Form control={form.control} name="workType" label="Work Type" options={enumToOptions(WorkType)} required />
        <GInput.Form name="briefCode" label="Brief Code" control={form.control} placeholder="Brief Code" />

        <GSelect.Form control={form.control} name="subType" label="Sub Type" options={enumToOptions(SubType)} />
        <GInput.Form name="link" label="Link" control={form.control} placeholder="Link" />
        <GInput.Form name="submitCode" label="Submit Code" control={form.control} placeholder="Submit Code" required />
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
                  toast.success("User deleted successfully");
                } catch (err) {
                  const error = err as FetchBaseQueryError & {
                    data?: { message?: string };
                  };
                  toast.error(error.data?.message ?? "Something went wrong");
                }
              }}
            />

            <GButton
              action="update"
              type="submit"
              loading={form.formState.isSubmitting}
            />
          </>
        ) : (
          <>
            <GButton
              action="reset"
              type="reset"
              onClick={() => form.reset()}
            />

            <GButton
              action="add"
              type="submit"
              loading={form.formState.isSubmitting}
            />
          </>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
