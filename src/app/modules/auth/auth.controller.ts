import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { removeAuthCookie, setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userTokens";
import { envVariable } from "../../config/env";

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

const googleCallbackController = catchAsync(
  async (req: Request, res: Response) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);

    setAuthCookie(res, tokenInfo);

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`${envVariable.FRONTEND}/${redirectTo}`);
  }
);
export const AuthControllers = {
  credentialLogin,
  googleCallbackController,
  getNewAccessToken,
  resetPassword,
  logout,
};
