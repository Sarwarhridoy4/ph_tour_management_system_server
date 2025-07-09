import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = UserServices.createUserService(req?.body);
    res.status(httpStatus?.CREATED).json({
      message: "User Created Successfully!",
      user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Something went wrong! ${error.message}`,
    });
  }
};

export const UserControllers = {
  createUser,
};
