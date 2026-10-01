import { ILoginPayload, ILoginRes } from "@/interface/auth.interface";
import { RTKApi } from "@/context/rtk-query";
import { stopPresence } from "@/lib/presence";


export const authApi = RTKApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<ILoginRes, ILoginPayload>({
      query: data => ({
        url: "v1/auth",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// export async function logout() {
//   await stopPresence();

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("authorization");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("permissions");
    window.localStorage.removeItem("loginAt");
  }
}

export const { useLoginMutation } = authApi;