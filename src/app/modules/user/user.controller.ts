import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const verifiedToken = req.user;

  const payload = req.body;
  const user = await UserServices.updateUserService(
    userId,
    payload,
    verifiedToken
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersService();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};
