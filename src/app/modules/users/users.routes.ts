import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/users";
import auth from "../../../middleware/auth";
import validationRequest from "../../../middleware/validationRequest";
import { UserController } from "./users.controllers";
import { AuthZodValidation } from "./users.validations";
const router = express.Router();

//Auth(User)
router.post(
	"/auth/login",
	validationRequest(AuthZodValidation.loginZodSchema),
	UserController.normalLoginController
);
router.post("/auth/signup", UserController.createUserController);
router.post(
	"/auth/refresh-token",
	validationRequest(AuthZodValidation.refreshTokenZodSchema),
	UserController.refreshTokenController
);

//Auth(Admin)
router.post("/admins/create-admin", UserController.adminCreateController);
router.post(
	"/admins/login",
	
	validationRequest(AuthZodValidation.loginZodSchema),
	UserController.adminLoginController
);

//User
router.get(
	"/users",
	auth(ENUM_USER_ROLE.ADMIN),
	UserController.getAllUserController
); //only accessible by admin

router.get(
	"/users/:id",
	auth(ENUM_USER_ROLE.ADMIN),
	UserController.getSingleUserController
); //only accessible by admin

router.patch(
	"/users/:id",
	auth(ENUM_USER_ROLE.ADMIN),
	UserController.updateUserController
); //only accessible by admin
router.delete(
	"/users/:id",
	auth(ENUM_USER_ROLE.ADMIN),
	UserController.deleteUserController
); //only accessible by admin

//My Profile

router.get("/users/my-profile"); // accessible by only specific user (buyer, seller) of the profile
router.patch("/users/my-profile"); // accessible by only specific user (buyer, seller) of the profile

router.patch("/admins/my-profile");
router.get("/admins/my-profile");

export const UserRoutes = router;
