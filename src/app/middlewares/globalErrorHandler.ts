import { Request, Response } from "express";
import { envVariable } from "../config/env";
import AppError from "../errorHelper/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, _req: Request, res: Response) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVariable.NODE_ENV === "development" ? err.stack : null,
  });
};
