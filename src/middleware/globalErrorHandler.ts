// import { ErrorRequestHandler } from "express";
// import { IGenericErrorMessage } from "../interfaces/error";

import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import config from "../config";
import ApiError from "../errors/ApiError";
import handleValidationError from "../errors/handleValidationError";
import { IGenericErrorMessage } from "../interfaces/error";

// const globalErrorHandler:ErrorRequestHandler=(error,req,res,next)=>{
//     let statusCode = 500
//     let message = 'Something went wrong'
//     let errorMessage:IGenericErrorMessage[]=[]
// }

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
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
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.code === 11000) {
    statusCode
    message= `${error}`;
    errorMessage=error?.code?[
      {
        path:"",
        message:`${error}`,
      }
    ]:[]
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message= error?.message;
    errorMessage= error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
