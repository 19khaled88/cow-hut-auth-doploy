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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const isExist_1 = __importDefault(require("../../../helper/isExist"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const users_model_1 = require("./users.model");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const userCreated = await User.create(payload)
    //     return userCreated
    // } catch (error) {
    //     return null
    // }
    if (!payload.password) {
        payload.password = config_1.default.user_pass;
    }
    const isPhoneUnique = yield users_model_1.User.findOne({
        phoneNumber: payload.phoneNumber,
    });
    if (isPhoneUnique) {
        throw new ApiError_1.default(http_status_1.default.FOUND, "Duplicate phone number not accepted");
    }
    const userCreated = yield users_model_1.User.create(payload);
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
});
const refreshTokenService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(payload, config_1.default.refreshToken);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid token");
    }
    const { id, role } = verifiedToken;
    const isExist = yield (0, isExist_1.default)(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user not found");
    }
    //generate token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.accessToken, config_1.default.accessTokenExpire);
    return {
        accessToken: newAccessToken,
    };
});
const normalLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //check if user exist
    const isExist = yield users_model_1.User.findOne({ phoneNumber }, { id: 1, phoneNumber: 1, password: 1, role: 1 });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user not found");
    }
    //match password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isExist === null || isExist === void 0 ? void 0 : isExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password or phone Number not match");
    }
    //generate token
    const { id, role } = isExist;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.accessToken, config_1.default.accessTokenExpire);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.refreshToken, config_1.default.refreshTokenExpire);
    return {
        accessToken,
        refreshToken,
    };
});
const adminLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //check if user exist
    const isExist = yield users_model_1.User.findOne({ phoneNumber }, { id: 1, phoneNumber: 1, password: 1, role: 1 });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user not found");
    }
    if (isExist.role !== "Admin") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Only admin approved");
    }
    //match password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isExist === null || isExist === void 0 ? void 0 : isExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password or phone Number not match");
    }
    //generate token
    const { id, role } = isExist;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.accessToken, config_1.default.accessTokenExpire);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ id, role }, config_1.default.refreshToken, config_1.default.refreshTokenExpire);
    return {
        accessToken,
        refreshToken,
    };
});
const adminCreateService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.password) {
        payload.password = config_1.default.user_pass;
    }
    if (payload.role !== "Admin") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Must have role & role must be admin");
    }
    const isPhoneUnique = yield users_model_1.User.findOne({
        phoneNumber: payload.phoneNumber,
    });
    if (isPhoneUnique) {
        throw new ApiError_1.default(http_status_1.default.FOUND, "Duplicate phone number not accepted");
    }
    const userCreated = yield users_model_1.User.create(payload);
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
});
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = users_model_1.User.find();
    if (!users) {
        throw new Error("No data found");
    }
    return users;
});
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield users_model_1.User.findById(id).exec();
    if (!singleUser) {
        throw new Error("User id is invalid");
    }
    return singleUser;
});
// type IUpdateReponse<T> = {
//     [  K in keyof T] : string | number
//  }
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield users_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedUser) {
        throw new Error("User id is invalid");
    }
    return updatedUser;
});
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield users_model_1.User.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("User id is invalid");
    }
    return deletedUser;
});
exports.UserService = {
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
