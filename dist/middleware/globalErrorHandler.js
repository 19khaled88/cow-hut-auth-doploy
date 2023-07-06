"use strict";
// import { ErrorRequestHandler } from "express";
// import { IGenericErrorMessage } from "../interfaces/error";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
// const globalErrorHandler:ErrorRequestHandler=(error,req,res,next)=>{
//     let statusCode = 500
//     let message = 'Something went wrong'
//     let errorMessage:IGenericErrorMessage[]=[]
// }
const globalErrorHandler = (error, req, res, next) => {
    // error.statusCode = error.statusCode || 500
    // error.status = error.status || 'error'
    // res.status(error.statusCode).json({
    //     success: false,
    //     status:error.statusCode,
    //     message: "response false",
    // });
    // next()
    // if (error instanceof Error) {
    //   res.status(400).json({ error: error });
    // } else {
    //   res.status(500).json({ error: "Something went wrong" });
    // }
    let statusCode = 500;
    var message = "Something went wrong";
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        statusCode;
        message = `${error}`;
        errorMessage = (error === null || error === void 0 ? void 0 : error.code) ? [
            {
                path: "",
                message: `${error}`,
            }
        ] : [];
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
