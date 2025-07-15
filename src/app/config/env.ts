/* eslint-disable no-unused-vars */
import dotenv from "dotenv";

dotenv.config();

// Environment variables type definition
export enum JWT_ALGORITHM {
  HS256 = "HS256",
  HS384 = "HS384",
  HS512 = "HS512",
  RS256 = "RS256",
  RS384 = "RS384",
  RS512 = "RS512",
  ES256 = "ES256",
  ES384 = "ES384",
  ES512 = "ES512",
  PS256 = "PS256",
  PS384 = "PS384",
  PS512 = "PS512",
  none = "none",
}

interface EnvVariable {
  PORT: number | string;
  MONGODB_URL: string | undefined;
  NODE_ENV: "development" | "production" | string;
  JWT_SECRET: string;
  JWT_ALGORITHM: JWT_ALGORITHM;
  JWT_EXPIRES_IN: string;
  JWT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND: string;
}

export const envVariable: EnvVariable = {
  PORT: process.env.PORT || 5500,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM as JWT_ALGORITHM,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  JWT_SALT_ROUND: process.env.JWT_SALT_ROUND as string,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  FRONTEND: process.env.FRONTEND as string,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
};
export const isProduction = envVariable.NODE_ENV === "production";
export const isDevelopment = envVariable.NODE_ENV === "development";
