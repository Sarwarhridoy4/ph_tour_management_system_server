import httpStatus from "http-status-codes";
import { isActive, IUser } from "../modules/user/user.interface";
import { generateJwtToken, verifyToken } from "./generateJwtToken";
import { envVariable, JWT_ALGORITHM } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelper/AppError";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    envVariable?.JWT_SECRET,
    envVariable?.JWT_EXPIRES_IN,
    JWT_ALGORITHM.HS256
  );

  const refreshToken = generateJwtToken(
    jwtPayload,
    envVariable?.JWT_REFRESH_SECRET,
    envVariable?.JWT_REFRESH_EXPIRE,
    JWT_ALGORITHM.HS256
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVariable?.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  if (
    isUserExist.isActive === isActive.BLOCKED ||
    isUserExist.isActive === isActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    envVariable?.JWT_SECRET,
    envVariable?.JWT_EXPIRES_IN,
    JWT_ALGORITHM.HS256
  );
  // console.log(accessToken);
  return accessToken;
};
