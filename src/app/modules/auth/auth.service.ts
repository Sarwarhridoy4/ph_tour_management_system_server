import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVariable } from "../../config/env";
import { generateJwtToken } from "../../utils/generateJwtToken";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const UserExist = await User.findOne({ email });
  if (!UserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Does Not Exist!");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    UserExist.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password Does Not Matched!");
  }

  const jwtPayload = {
    userId: UserExist._id,
    email: UserExist.email,
    role: UserExist.role,
  };

  const accessToken = generateJwtToken(
    jwtPayload,
    envVariable.JWT_SECRET,
    envVariable.JWT_EXPIRES_IN,
    envVariable.JWT_ALGORITHM
  );

  const refreshToken = generateJwtToken(
    jwtPayload,
    envVariable.JWT_REFRESH_SECRET,
    envVariable.JWT_REFRESH_EXPIRE,
    envVariable.JWT_ALGORITHM
  );

  // Remove password from the user object before returning
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = UserExist.toObject();

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

export const AuthServices = {
  credentialLogin,
};
