import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

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
  return {
    email: UserExist?.email,
  };
};
export const AuthServices = {
  credentialLogin,
};
