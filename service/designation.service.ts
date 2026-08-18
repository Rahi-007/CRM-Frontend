import { RTKApi } from "@/context/rtk-query";
import { IPermission } from "@/interface/auth.interface";
import { IAddDesignation, IDesignation, ISelectDesignation } from "@/interface/designation.interface";

export const designationApi = RTKApi.injectEndpoints({
    endpoints: build => ({
        addDesignation: build.mutation<IDesignation, IAddDesignation>({
            query: data => ({
                url: "v1/role",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Designation"],
        }),

        updateDesignation: build.mutation<IDesignation, { id: number; data: Partial<IAddDesignation> }>({
            query: ({ id, data }) => ({
                url: `v1/role/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Designation"],
        }),

        deleteDesignation: build.mutation<void, number>({
            query: id => ({
                url: `v1/role/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Designation"],
        }),

        getDesignationById: build.query<IDesignation, number>({
            query: id => `v1/role/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Designation", id }],
        }),

        getAllDesignations: build.query<IDesignation[], void>({
            query: () => "v1/role",
            providesTags: ["Designation"],
        }),

        getAllPermissions: build.query<IPermission[], void>({
            query: () => "v1/role/permission",
        }),

        selectDesignations: build.query<ISelectDesignation[], void>({
            query: () => "v1/role/select",
            providesTags: ["Designation"],
        }),
    }),
});

export const {
    useAddDesignationMutation,
    useUpdateDesignationMutation,
    useDeleteDesignationMutation,
    useGetDesignationByIdQuery,
    useGetAllDesignationsQuery,
    useGetAllPermissionsQuery,
    useSelectDesignationsQuery
} = designationApi;