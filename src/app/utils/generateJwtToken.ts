import Jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateJwtToken = (
  payload: JwtPayload,
  secret: string,
  expiredIn: string,
  algorithm: string // default to HS256
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
