import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/interface/user.interface";
import { IPermission } from "@/interface/auth.interface";

export interface AuthState {
  accessToken: string | null;
  user: IUser | null;
  permissions: IPermission[] | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  permissions: null,
};

export interface SetAuthPayload {
  accessToken: string;
  user: IUser;
  permissions: IPermission[];
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Omit<SetAuthPayload, "isHydrated">>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.permissions = action.payload.permissions;
    },
    clearAuth: state => {
      state.accessToken = null;
      state.user = null;
      state.permissions = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
