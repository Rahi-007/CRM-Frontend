import { Gender } from "@/config/enum";

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  address?: string;
  // avatar?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  role: {
    id: number;
    name: string;
  };
  team?: {
    id: number;
    name: string;
  };
  rfId?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: {
    id: number;
    name: string;
  };
  updatedBy?: {
    id: number;
    name: string;
  };
}

export interface ISelectUser {
  id: string;
  name: string;
  phone: string;
}

export interface IAddUser {
  firstName: string;
  lastName?: string;
  phone: string;
  address?: string;
  // avatar?: string;
  roleId: number;
  password: string;
  dateOfBirth?: Date;
  gender?: Gender;
  teamId?: number;
  rfId?: string;
}

export interface IUpdateUser {
  firstName: string;
  lastName?: string;
  phone: string;
  address?: string;
  // avatar?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  teamId?: number;
  roleId: number;
  rfId?: string;
}
