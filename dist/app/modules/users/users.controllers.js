"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const users_services_1 = require("./users.services");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield users_services_1.UserService.createUserService(body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created",
            data: result,
        });
    }
    catch (error) {
        // res.status(400).json({
        //   error:error
        // });
        next(error);
    }
});
const normalLoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isLoginSuccessfull = yield users_services_1.UserService.normalLoginService(req.body);
        const { refreshToken } = isLoginSuccessfull, others = __rest(isLoginSuccessfull, ["refreshToken"]);
        //set refresh token into cookie
        const cookieOption = {
            secure: config_1.default.env === "production",
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOption);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
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
    }
    catch (error) {
        next(error);
    }
});
const adminCreateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield users_services_1.UserService.adminCreateService(req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Admin created",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const adminLoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isLoginSuccessfull = yield users_services_1.UserService.adminLoginService(req.body);
        const { refreshToken } = isLoginSuccessfull, others = __rest(isLoginSuccessfull, ["refreshToken"]);
        //set refresh token into cookie
        const cookieOption = {
            secure: config_1.default.env === "production",
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOption);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin loggedin successfully !",
            data: others,
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const accessToken = yield users_services_1.UserService.refreshTokenService(refreshToken);
        const cookieOption = {
            secure: config_1.default.env === "production",
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOption);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User loggedin successfully !",
            data: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.cookies, req.user, "cookie");
        const users = yield users_services_1.UserService.getUserService();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users found",
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_services_1.UserService.getSingleUserService(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User found",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_services_1.UserService.updateUserService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User Upadated successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_services_1.UserService.deleteUserService(req.params.id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
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
