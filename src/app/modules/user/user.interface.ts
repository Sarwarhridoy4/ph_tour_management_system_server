import { Types } from "mongoose";

/* eslint-disable no-unused-vars */
export interface IAuthProvider {
  provider:
    | "credential"
    | "google" /* e.g., 'google', 'facebook', 'github' ,credential*/;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
}
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}
export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted: boolean;
  isActive: isActive;
  isVerified: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
