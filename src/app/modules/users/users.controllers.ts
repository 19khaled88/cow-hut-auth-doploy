import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./users.services";
import { IRefreshTokenResponse, ITokenResponse } from "./users.interface";
import { MyRequest } from "../../../middleware/auth";
const createUserController: RequestHandler = async (req, res, next) => {
	try {
		const body = req.body;

		const result = await UserService.createUserService(body);
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "User created",
			data: result,
		});
	} catch (error) {
		// res.status(400).json({
		//   error:error
		// });

		next(error);
	}
};

const normalLoginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const isLoginSuccessfull = await UserService.normalLoginService(req.body);
		const { refreshToken, ...others } = isLoginSuccessfull;

		//set refresh token into cookie
		const cookieOption = {
			secure: config.env === "production",
			httpOnly: true,
		};

		res.cookie("refreshToken", refreshToken, cookieOption);

		sendResponse<ITokenResponse>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User loggedin successfully !",
			data: others,
		});
		// res.status(200).json({
		// 	success: true,
		// 	statusCode: 200,
		// 	message: "User logged in successfully",
		// 	data: isLoginSuccessfull,
		// });
	} catch (error) {
		next(error);
	}
};

const adminCreateController: RequestHandler = async (req, res, next) => {
	try {
		const body = req.body;

		const result = await UserService.adminCreateService(req.body);
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Admin created",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const adminLoginController: RequestHandler = async (req, res, next) => {
	try {
		const isLoginSuccessfull = await UserService.adminLoginService(req.body);
		const { refreshToken, ...others } = isLoginSuccessfull;

		//set refresh token into cookie
		const cookieOption = {
			secure: config.env === "production",
			httpOnly: true,
		};

		res.cookie("refreshToken", refreshToken, cookieOption);

		sendResponse<ITokenResponse>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Admin loggedin successfully !",
			data: others,
		});
	} catch (error) {
		next(error);
	}
};

const refreshTokenController: RequestHandler = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;

		const accessToken = await UserService.refreshTokenService(refreshToken);
		const cookieOption = {
			secure: config.env === "production",
			httpOnly: true,
		};
		res.cookie("refreshToken", refreshToken, cookieOption);
		sendResponse<IRefreshTokenResponse>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User loggedin successfully !",
			data: accessToken,
		});
	} catch (error) {
		next(error);
	}
};

const getAllUserController: RequestHandler = async (req, res, next) => {
	try {
		console.log(req.cookies, req.user, "cookie");
		const users = await UserService.getUserService();
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Users found",
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

const getSingleUserController: RequestHandler = async (req, res, next) => {
	try {
		const user = await UserService.getSingleUserService(req.params.id);
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "User found",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const updateUserController: RequestHandler = async (req, res, next) => {
	try {
		const user = await UserService.updateUserService(req.params.id, req.body);
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "User Upadated successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const deleteUserController: RequestHandler = async (req, res, next) => {
	try {
		const user = await UserService.deleteUserService(req.params.id);
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "User deleted successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const UserController = {
	createUserController,
	getAllUserController,
	getSingleUserController,
	updateUserController,
	deleteUserController,
	normalLoginController,
	refreshTokenController,
	adminCreateController,
	adminLoginController
};
