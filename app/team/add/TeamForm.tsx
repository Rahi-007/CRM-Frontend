"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAddTeamMutation, useDeleteTeamMutation, useUpdateTeamMutation } from "@/service/team.service";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ITeam } from "@/interface/team.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { PERMISSIONS } from "@/config/const";
import GButton from "@/components/generic/GButton";
import Access from "@/components/layouts/Access";
import GInput from "@/components/generic/GInput";
import User from "@/components/futures/User";
import toast from "react-hot-toast";

const TeamSchema = z.object({
  name: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  narration: z.string().optional(),
  teamLeaderId: z.string({ message: "Team leader is required" }),
});

type TeamFormValues = z.infer<typeof TeamSchema>;

interface IProps {
  title?: string;
  defaultValues?: ITeam;
}

const TeamForm = (props: IProps) => {
  const [addTeam] = useAddTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [handleDelete] = useDeleteTeamMutation();

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: props.defaultValues?.name,
      narration: props.defaultValues?.narration || "",
      teamLeaderId: props.defaultValues?.teamLeader?.id,
    },
  });

  const onSubmit = async (values: TeamFormValues) => {
    try {
      if (props.defaultValues) {
        await updateTeam({ id: props.defaultValues.id, data: values }).unwrap();
        toast.success("Team updated successful");
      } else {
        await addTeam(values).unwrap();
        form.reset();
        toast.success("Team added successful");
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
        <h2 className="text-2xl font-bold">{props.title ?? "Team Form"}</h2>
      </div>

      <div className="grid gap-y-1 gap-x-4 px-3 sm:px-8 py-4 sm:py-6 md:grid-cols-2 xl:grid-cols-3">
        <GInput.Form name="name" label="Team Name" control={form.control} placeholder="John Team" required />
        <User.Form control={form.control} name="teamLeaderId" label="Team Leader" required />
        <div className="md:col-span-2 xl:md:col-span-1">
          <GInput.Form name="narration" label="Narration" control={form.control} placeholder="Description" />
        </div>
      </div>

      <div className="flex justify-center sm:justify-end rounded-b-2xl gap-1 sm:gap-3 border-t bg-slate-50 px-8 py-4 sm:py-5">
        {props.defaultValues ? (
          <>
            <Access permission={PERMISSIONS.TEAMS_DELETE}>
              <GButton
                action="delete"
                type="button"
                onClick={async () => {
                  if (!props.defaultValues?.id) return;

                  try {
                    await handleDelete(props.defaultValues?.id).unwrap();
                    toast.success("Team deleted successfully");
                  } catch (err) {
                    const error = err as FetchBaseQueryError & {
                      data?: { message?: string };
                    };
                    toast.error(error.data?.message ?? "Something went wrong");
                  }
                }}
              />
            </Access>

            <Access permission={PERMISSIONS.TEAMS_EDIT}>
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

export default TeamForm;
