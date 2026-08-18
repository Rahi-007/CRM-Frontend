"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "@/service/user.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { IUser } from "@/interface/user.interface";
import { PERMISSIONS } from "@/config/const";
import { enumToOptions } from "@/lib/utils";
import { Gender } from "@/config/enum";
import GInput from "@/components/generic/GInput";
// import GDatePicker from "@/components/generic/GDatePicker";
import Designation from "@/components/futures/Role";
import GButton from "@/components/generic/GButton";
import GSelect from "@/components/generic/GSelect";
import Access from "@/components/layouts/Access";
import Team from "@/components/futures/Team";
import toast from "react-hot-toast";

const CreateUserSchema = z.object({
  firstName: z.string().min(3, { message: "First name must be at least 3 characters" }),
  lastName: z.string().optional(),
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, {
      message: "Enter a valid Bangladeshi phone number",
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rfId: z.string().optional(),
  gender: z.number().optional(),
  dateOfBirth: z.date().optional(),
  roleId: z.number({ message: "Designation is Required" }),
  // avatar: z.string().optional(),
  teamId: z.number().optional(),
  address: z.string().optional(),
});

const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
});

type CreateUserFormValues = z.infer<typeof CreateUserSchema>;
type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;

interface IProps {
  title?: string;
  defaultValues?: IUser;
}

const UserForm = (props: IProps) => {
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [handleDelete] = useDeleteUserMutation();
  const [showPass, setShowPass] = useState(false);
  const schema = props.defaultValues ? UpdateUserSchema : CreateUserSchema;

  const form = useForm<CreateUserFormValues | UpdateUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: props.defaultValues?.firstName,
      lastName: props.defaultValues?.lastName || "",
      phone: props.defaultValues?.phone,
      password: "",
      rfId: props.defaultValues?.rfId || "",
      gender: props.defaultValues?.gender,
      dateOfBirth: props.defaultValues?.dateOfBirth || undefined,
      teamId: props.defaultValues?.team?.id || undefined,
      roleId: props.defaultValues?.role?.id || undefined,
      // avatar: "",
      address: props.defaultValues?.address || "",
    },
  });

  const onSubmit = async (values: CreateUserFormValues | UpdateUserFormValues) => {
    try {
      if (props.defaultValues) {
        await updateUser({ id: props.defaultValues.id, data: values as UpdateUserFormValues }).unwrap();
        toast.success("User updated successful");
      } else {
        await addUser(values as CreateUserFormValues).unwrap();
        form.reset();
        toast.success("User added successful");
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
        <h2 className="text-2xl font-bold">{props.title ?? "User Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2 xl:grid-cols-3">
        <GInput.Form name="firstName" label="First Name" control={form.control} placeholder="John" required />
        <GInput.Form name="lastName" label="Last Name" control={form.control} placeholder="Doe" />
        <Designation.Form control={form.control} name="roleId" label="Designation Name" required />

        <GInput.Form name="phone" label="Phone Number" control={form.control} placeholder="01xxxxxxxxx" required />
        {!props.defaultValues && (
          <GInput.Form
            type={showPass ? "text" : "password"}
            name="password"
            label="Password"
            control={form.control}
            placeholder="••••••••"
            required
          />
        )}
        <Team.Form control={form.control} name="teamId" label="Team Name" />
        <GInput.Form name="rfId" label="RFID" control={form.control} placeholder="Employee Id" />

        <GSelect.Form control={form.control} name="gender" label="Gender" placeholder="Select Gender" options={enumToOptions(Gender)} />
        {props.defaultValues ? (
          <div className="xl:col-span-2">
            <GInput.Form name="address" label="Address" control={form.control} placeholder="Present Address" />
          </div>
        ) : (
          <GInput.Form name="address" label="Address" control={form.control} placeholder="Present Address" />
        )}

        {/* <GDatePicker.Form control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="Select date" /> */}
      </div>

      <div className="flex justify-center sm:justify-end rounded-b-2xl gap-1 sm:gap-3 border-t bg-slate-50 px-8 py-4 sm:py-5">
        {props.defaultValues ? (
          <>
            <Access permission={PERMISSIONS.USERS_DELETE}>
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
            </Access>

            <Access permission={PERMISSIONS.USERS_EDIT}>
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

export default UserForm;
