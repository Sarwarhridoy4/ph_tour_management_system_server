import dotenv from "dotenv";

dotenv.config();

// Environment variables type definition
interface EnvVariable {
  PORT: number | string;
  MONGODB_URL: string | undefined;
  NODE_ENV: "development" | "production" | string;
  JWT_SECRET: string;
  JWT_ALGORITHM: string;
  JWT_EXPIRES_IN: string;
  JWT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
}

export const envVariable: EnvVariable = {
  PORT: process.env.PORT || 5500,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  JWT_SALT_ROUND: process.env.JWT_SALT_ROUND as string,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
};
export const isProduction = envVariable.NODE_ENV === "production";
export const isDevelopment = envVariable.NODE_ENV === "development";
