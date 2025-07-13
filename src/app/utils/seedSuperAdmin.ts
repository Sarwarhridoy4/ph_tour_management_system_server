import bcryptjs from "bcryptjs";
import { envVariable } from "../config/env";
import {
  IAuthProvider,
  isActive,
  IUser,
  Role,
} from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

/* eslint-disable no-console */
export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVariable?.SUPER_ADMIN_EMAIL,
    });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist on the System..");
      return;
    } else {
      console.log("Super Admin Creating. Please Wait...");
    }
    const hashedPass = await bcryptjs.hash(
      envVariable?.SUPER_ADMIN_PASSWORD,
      Number(envVariable?.JWT_SALT_ROUND)
    );
    const authProvider: IAuthProvider = {
      provider: "credential",
      providerId: envVariable?.SUPER_ADMIN_EMAIL,
    };
    const superAdminPayload: IUser = {
      name: "Super Admin",
      email: envVariable?.SUPER_ADMIN_EMAIL,
      role: Role.SUPER_ADMIN,
      password: hashedPass,
      auths: [authProvider],
      isVerified: true,
      isActive: isActive.ACTIVE,
      isDeleted: false,
    };
    const superAdmin = await User.create(superAdminPayload);
    console.log(superAdmin);
    return superAdmin;
  } catch (error) {
    console.log(error);
  }
};
