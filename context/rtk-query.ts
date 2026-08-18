import { BASE_URL } from "@/config/const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RTKApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: headers => {
      const token = localStorage.getItem("authorization");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Setting", "User", "Team", "Client", "Project", "Designation"],
  endpoints: () => ({}),
});
