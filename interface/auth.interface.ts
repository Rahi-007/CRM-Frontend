import { IUser } from "./user.interface";

export interface ILoginPayload {
  phone: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  user: IUser;
  permissions: IPermission[];
}
export interface IPermission {
  id: number;
  name: string;
  module: string;
  action: string;
}