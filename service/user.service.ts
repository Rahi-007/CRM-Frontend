import { RTKApi } from "@/context/rtk-query";
import { IOnlineUsers } from "@/interface/session.interface";
import { IAddUser, ISelectUser, IUpdateUser, IUser } from "@/interface/user.interface";

export const userApi = RTKApi.injectEndpoints({
  endpoints: build => ({
    addUser: build.mutation<IUser, IAddUser>({
      query: data => ({
        url: "v1/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: build.mutation<IUser, { id: string; data: Partial<IUpdateUser> }>({
      query: ({ id, data }) => ({
        url: `v1/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation<void, string>({
      query: id => ({
        url: `v1/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUserById: build.query<IUser, string>({
      query: id => `v1/user/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    getAllUsers: build.query<IUser[], void>({
      query: () => "v1/user",
      providesTags: ["User"],
    }),

    selectUsers: build.query<ISelectUser[], void>({
      query: () => "v1/user/select",
      providesTags: ["User"],
    }),

    onlineUsers: build.query<IOnlineUsers[], void>({
      query: () => "v1/user/online"
    }),
  }),
});

export const {
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useSelectUsersQuery,
  useOnlineUsersQuery
} = userApi;