import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "./generateJwtToken";
import { envVariable } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Token was found");
      }
      // Verify Users given Token
      const verifiedToken = verifyToken(
        accessToken,
        envVariable?.JWT_SECRET
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(httpStatus.FORBIDDEN, "You Are Not Authorized!");
      }

      if (authRoles.includes(verifiedToken?.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You Are Not Allowed!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
