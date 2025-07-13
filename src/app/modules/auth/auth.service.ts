import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { envVariable } from "../../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const UserExist = await User.findOne({ email });
  // check if user already exist
  if (!UserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Does Not Exist!");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    UserExist?.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password Does Not Matched!");
  }
  // JWT check
  const jwtPayload = {
    userId: UserExist?._id,
    email: UserExist?.email,
    role: UserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, envVariable.JWT_SECRET as string, {
    algorithm: envVariable.JWT_ALGORITHM as jwt.Algorithm as string,
    expiresIn: envVariable.JWT_EXPIRES_IN as string,
  }as SignOptions);
  return {
    accessToken
  };
};
export const AuthServices = {
  credentialLogin,
};
