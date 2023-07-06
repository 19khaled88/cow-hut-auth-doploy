import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../helper/jwtHelper";
import config from "../config";
import jwt, { Secret } from "jsonwebtoken";
import type {JwtPayload} from 'jsonwebtoken'
import { ENUM_USER_ROLE } from "../enums/users";



// alternative of global declare from Express Request
export interface MyRequest extends Request {
  user: {
    role: ENUM_USER_ROLE;
    id: string;
  };
}


const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      //verify token

      let verifiedToken = null;

      verifiedToken = jwt.verify(token, config.accessToken as Secret ) as JwtPayload;

      (req.user) = verifiedToken;

      if (requiredRoles.length && !requiredRoles.includes(verifiedToken.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
