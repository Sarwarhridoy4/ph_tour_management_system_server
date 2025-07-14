import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { removeAuthCookie, setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialLogin(req.body);
  setAuthCookie(res, loginInfo);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged In Successfully",
    data: loginInfo,
  });
});
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "Refresh Token not found!");
  }
  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token retrieved successfully!",
    data: tokenInfo,
  });
});
const logout = catchAsync(async (req: Request, res: Response) => {
  removeAuthCookie(res);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const decodedToken = req.user;

  await AuthServices.resetPassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Changed Successfully",
    data: null,
  });
});
export const AuthControllers = {
  credentialLogin,
  getNewAccessToken,
  resetPassword,
  logout,
};
