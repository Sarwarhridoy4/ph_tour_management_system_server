import { Router } from "express";
import { UserControllers } from "./user.controller";
import { CreateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../utils/validateRequest";
import { Role } from "./user.interface";
import { checkAuth } from "../../utils/checkAuth";

const router = Router();

router.post(
  "/register",
  validateRequest(CreateUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/all-users",
  checkAuth(Role.SUPER_ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);

export const UserRoutes = router;
