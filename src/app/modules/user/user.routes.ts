import { Router } from "express";
import { UserControllers } from "./user.controller";
import { CreateUserZodSchema, UpdateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../utils/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(CreateUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  validateRequest(UpdateUserZodSchema),
  UserControllers.getAllUsers
);

export const UserRoutes = router;
