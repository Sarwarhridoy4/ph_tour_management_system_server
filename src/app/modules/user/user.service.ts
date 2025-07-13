import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const UserExist = await User.findOne({ email });
  // check if user already exist
  if (UserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already Exist!");
  }
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };
  const hashedPassword = await bcryptjs.hash(password as string, 10);
  const user = await User.create({
    ...payload,
    email,
    password: hashedPassword,
    auths: [authProvider],
  });

  return user;
};

const getAllUsersService = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUserService,
  getAllUsersService,
};
