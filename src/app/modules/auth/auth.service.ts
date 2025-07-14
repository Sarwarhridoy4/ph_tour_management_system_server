import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userTokens";

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
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    newAccessToken,
  };
};

export const AuthServices = {
  credentialLogin,
  getNewAccessToken,
};
