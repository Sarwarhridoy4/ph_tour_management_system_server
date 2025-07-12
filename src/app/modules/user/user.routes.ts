import { Router } from "express";
import { UserControllers } from "./user.controller";
import { CreateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../utils/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(CreateUserZodSchema),
  UserControllers.createUser
);
router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
