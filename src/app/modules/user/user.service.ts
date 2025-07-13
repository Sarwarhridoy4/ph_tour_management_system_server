import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVariable } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

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
  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVariable?.JWT_SALT_ROUND)
  );
  const user = await User.create({
    ...payload,
    email,
    password: hashedPassword,
    auths: [authProvider],
  });

  return user;
};

const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  /*
  Only Admin And Super Admin can Update can Update
  Email can't be updated further 
  */

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVariable?.JWT_SALT_ROUND
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
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
  updateUserService,
};
