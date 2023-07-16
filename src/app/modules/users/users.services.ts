import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import type {JwtPayload} from 'jsonwebtoken'
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import isUserExist from "../../../helper/isExist";
import { jwtHelpers } from "../../../helper/jwtHelper";
import { IUpdateReponse } from "../../../interfaces/common";
import {
  ILoginRequest,
  IRefreshTokenResponse,
  ITokenResponse,
  IUser,
} from "./users.interface";
import { User } from "./users.model";

const createUserService = async (
  payload: IUser
): Promise<Partial<IUser> | null> => {
  // try {
  //     const userCreated = await User.create(payload)
  //     return userCreated
  // } catch (error) {
  //     return null
  // }

  if (!payload.password) {
    payload.password = config.user_pass as string;
  }
  const isPhoneUnique = await User.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (isPhoneUnique) {
    throw new ApiError(httpStatus.FOUND, "Duplicate phone number not accepted");
  }

  const userCreated = await User.create(payload);

  const response = {
    Id: userCreated._id,
    role: userCreated.role,
    name: {
      firstName: userCreated.name.firstName,
      lastName: userCreated.name.lastName,
    },
    phoneNumber: userCreated.phoneNumber,
    address: userCreated.address,
  };

  if (!userCreated) {
    throw new Error("Failed to create");
  }

  // userCreated.password = ''
  return response;
};

const refreshTokenService = async (
  payload: string
): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwt.verify(payload, config.refreshToken as Secret) as JwtPayload;
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
  }

  const { id, role } = verifiedToken;
  const isExist = await isUserExist(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user not found");
  }

  //generate token
  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    config.accessToken as Secret,
    config.accessTokenExpire as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const normalLoginService = async (
  payload: ILoginRequest
): Promise<ITokenResponse> => {
  const { phoneNumber, password } = payload;

  //check if user exist
  const isExist = await User.findOne(
    { phoneNumber },
    { id: 1, phoneNumber: 1, password: 1, role: 1 }
  );

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user not found");
  }

  //match password
  const isPasswordMatch = await bcrypt.compare(password, isExist?.password);

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Password or phone Number not match"
    );
  }

  //generate token
  const { id, role } = isExist;
  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.accessToken as Secret,
    config.accessTokenExpire as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.refreshToken as Secret,
    config.refreshTokenExpire as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const adminLoginService = async (
  payload: ILoginRequest
): Promise<ITokenResponse> => {
  const { phoneNumber, password } = payload;

  //check if user exist
  const isExist = await User.findOne(
    { phoneNumber },
    { id: 1, phoneNumber: 1, password: 1, role: 1 }
  );

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user not found");
  }
  if (isExist.role !== "admin") {
    throw new ApiError(httpStatus.FORBIDDEN, "Only admin approved");
  }

  //match password
  const isPasswordMatch = await bcrypt.compare(password, isExist?.password);

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Password or phone Number not match"
    );
  }

  //generate token
  const { id, role } = isExist;
  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.accessToken as Secret,
    config.accessTokenExpire as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.refreshToken as Secret,
    config.refreshTokenExpire as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const adminCreateService = async (
  payload: IUser
): Promise<Partial<IUser | null>> => {
  if (!payload.password) {
    payload.password = config.user_pass as string;
  }

  if (payload.role !== "admin") {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Must have role & role must be admin"
    );
  }
  const isPhoneUnique = await User.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (isPhoneUnique) {
    throw new ApiError(httpStatus.FOUND, "Duplicate phone number not accepted");
  }

  const userCreated = await User.create(payload);

  const response = {
    Id: userCreated._id,
    role: userCreated.role,
    name: {
      firstName: userCreated.name.firstName,
      lastName: userCreated.name.lastName,
    },
    phoneNumber: userCreated.phoneNumber,
    address: userCreated.address,
  };

  if (!userCreated) {
    throw new Error("Failed to create");
  }

  // userCreated.password = ''
  return response;
};

const getUserService = async (): Promise<IUser[] | null> => {
  const users = User.find();
  if (!users) {
    throw new Error("No data found");
  }
  return users;
};

const getSingleUserService = async (id: string) => {
  const singleUser = await User.findById(id).exec();
  if (!singleUser) {
    throw new Error("User id is invalid");
  }
  return singleUser;
};
// type IUpdateReponse<T> = {
//     [  K in keyof T] : string | number
//  }
const updateUserService = async (
  id: string,
  payload: IUpdateReponse<IUser>
) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedUser) {
    throw new Error("User id is invalid");
  }
  return updatedUser;
};

const deleteUserService = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error("User id is invalid");
  }
  return deletedUser;
};

export const UserService = {
  createUserService,
  getUserService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  normalLoginService,
  refreshTokenService,
  adminLoginService,
  adminCreateService,
};
