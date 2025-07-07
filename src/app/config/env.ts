import dotenv from "dotenv";

dotenv.config();

// Environment variables type definition
interface EnvVariable {
  PORT: number | string;
  MONGODB_URL: string | undefined;
  NODE_ENV: "development" | "production" | string;
}

export const envVariable: EnvVariable = {
  PORT: process.env.PORT || 5500,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
export const isProduction = envVariable.NODE_ENV === "production";
export const isDevelopment = envVariable.NODE_ENV === "development";
