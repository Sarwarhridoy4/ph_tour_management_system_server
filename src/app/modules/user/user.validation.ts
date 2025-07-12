import mongoose from "mongoose";
import z from "zod";
import { isActive, Role } from "./user.interface";

// Validate MongoDB ObjectId
const objectIdSchema = z
  .string({
    required_error: "ObjectId is required",
    invalid_type_error: "ObjectId must be a string",
  })
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId format",
  });

// Auth Provider validation
const authProviderSchema = z.object({
  provider: z
    .string({
      required_error: "Auth provider is required",
      invalid_type_error: "Auth provider must be a string",
    })
    .min(1, "Auth provider cannot be empty"),
  providerId: z
    .string({
      required_error: "Auth provider ID is required",
      invalid_type_error: "Auth provider ID must be a string",
    })
    .min(1, "Auth provider ID cannot be empty"),
});

// Create user schema
export const CreateUserZodSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Please provide a valid email address"),

  // Phone number validation (Bangladeshi format)
  phone: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g., 01XXXXXXXXX or +8801XXXXXXXXX)",
    })
    .optional(),

  // Password validation (min 8 chars, at least one uppercase, one lowercase, one number, one special character)
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .regex(/(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])/, {
      message: "Password must contain at least one special character",
    }),

  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .optional(),

  isDeleted: z
    .boolean({
      required_error: "isDeleted field is required",
      invalid_type_error: "isDeleted must be a boolean",
    })
    .optional(),

  isActive: z
    .nativeEnum(isActive, {
      required_error: "isActive status is required",
      invalid_type_error: "Invalid isActive value",
    })
    .optional(),

  isVerified: z
    .boolean({
      required_error: "isVerified field is required",
      invalid_type_error: "isVerified must be a boolean",
    })
    .optional(),

  role: z
    .nativeEnum(Role, {
      required_error: "User role is required",
      invalid_type_error: "Invalid user role",
    })
    .optional(),

  auths: z
    .array(authProviderSchema, {
      required_error: "Auths array is required",
      invalid_type_error: "Auths must be an array of providers",
    })
    .min(1, "At least one authentication provider is required")
    .optional(),

  bookings: z
    .array(objectIdSchema, {
      invalid_type_error: "Bookings must be an array of ObjectIds",
    })
    .optional(),

  guides: z
    .array(objectIdSchema, {
      invalid_type_error: "Guids must be an array of ObjectIds",
    })
    .optional(),

  createdAt: z.coerce
    .date({
      invalid_type_error: "createdAt must be a valid date",
    })
    .optional(),

  updatedAt: z.coerce
    .date({
      invalid_type_error: "updatedAt must be a valid date",
    })
    .optional(),
});
// Update user schema
export const UpdateUserZodSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .optional(),

  // Phone number validation (Bangladeshi format)
  phone: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g., 01XXXXXXXXX or +8801XXXXXXXXX)",
    })
    .optional(),

  // Password validation (min 8 chars, at least one uppercase, one lowercase, one number, one special character)
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .regex(/(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])/, {
      message: "Password must contain at least one special character",
    }).optional(),

  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .optional(),

  isDeleted: z
    .boolean({
      required_error: "isDeleted field is required",
      invalid_type_error: "isDeleted must be a boolean",
    })
    .optional(),

  isActive: z
    .nativeEnum(isActive, {
      required_error: "isActive status is required",
      invalid_type_error: "Invalid isActive value",
    })
    .optional(),

  isVerified: z
    .boolean({
      required_error: "isVerified field is required",
      invalid_type_error: "isVerified must be a boolean",
    })
    .optional(),

  role: z
    .nativeEnum(Role, {
      required_error: "User role is required",
      invalid_type_error: "Invalid user role",
    })
    .optional(),

  auths: z
    .array(authProviderSchema, {
      required_error: "Auths array is required",
      invalid_type_error: "Auths must be an array of providers",
    })
    .min(1, "At least one authentication provider is required")
    .optional(),

  bookings: z
    .array(objectIdSchema, {
      invalid_type_error: "Bookings must be an array of ObjectIds",
    })
    .optional(),

  guides: z
    .array(objectIdSchema, {
      invalid_type_error: "Guids must be an array of ObjectIds",
    })
    .optional(),

  createdAt: z.coerce
    .date({
      invalid_type_error: "createdAt must be a valid date",
    })
    .optional(),

  updatedAt: z.coerce
    .date({
      invalid_type_error: "updatedAt must be a valid date",
    })
    .optional(),
});
