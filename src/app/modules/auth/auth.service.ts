import AppError from "../../errorHelper/AppError";
import { isActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserTokens } from "../../utils/userTokens";
import { generateJwtToken, verifyToken } from "../../utils/generateJwtToken";
import { envVariable, JWT_ALGORITHM } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

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

  const userTokens = createUserTokens(UserExist);

  // Remove password from the user object before returning
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = UserExist.toObject();

  return {
    accessToken: userTokens?.accessToken,
    refreshToken: userTokens?.refreshToken,
    user: userWithoutPassword,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVariable?.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const ifUserExist = await User.findOne({
    email: verifyRefreshToken?.email,
  } as JwtPayload);
  if (!ifUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!");
  }
  if (
    ifUserExist.isActive === isActive.BLOCKED ||
    ifUserExist.isActive === isActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${ifUserExist?.isActive}`
    );
  }
  if (ifUserExist.isActive === isActive.DELETED) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted!");
  }
  const jwtPayload = {
    userId: ifUserExist?._id,
    email: ifUserExist?.email,
    role: ifUserExist?.role,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    envVariable?.JWT_SECRET,
    envVariable?.JWT_EXPIRES_IN,
    JWT_ALGORITHM.HS256
  );
  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialLogin,
  getNewAccessToken,
};
