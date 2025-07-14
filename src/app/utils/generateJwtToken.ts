import Jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWT_ALGORITHM } from "../config/env";

export const generateJwtToken = (
  payload: JwtPayload,
  secret: string,
  expiredIn: string,
  algorithm: JWT_ALGORITHM.HS256
) => {
  const token = Jwt.sign(payload, secret, {
    expiresIn: expiredIn,
    algorithm: algorithm,
  } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = Jwt.verify(token, secret);
  return verifiedToken;
};
