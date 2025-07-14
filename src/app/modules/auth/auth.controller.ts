import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";

const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialLogin(req.body);
  res.cookie("refreshToken", loginInfo?.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.cookie('accessToken', loginInfo?.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
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
export const AuthControllers = {
  credentialLogin,
  getNewAccessToken,
};
