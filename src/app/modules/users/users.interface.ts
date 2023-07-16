import { Model } from "mongoose";

export type Role = "buyer" | "seller" | "user" | "admin" | "super admin";
export type IUser = {
  // id:string
  phoneNumber: string;
  role: Role;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget:number;
  income:number;
  createdAt: Date;
  updatedAt: Date;
};

export type ILoginRequest = {
  phoneNumber: string;
  password: string;
};

export type ITokenResponse ={
  accessToken:string;
  refreshToken?:string;
}
export type IRefreshTokenResponse ={
  accessToken:string;
 
}

export type UserModel = Model<IUser>;
