"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const validationRequest_1 = __importDefault(require("../../../middleware/validationRequest"));
const users_controllers_1 = require("./users.controllers");
const users_validations_1 = require("./users.validations");
const router = express_1.default.Router();
//Auth(User)
router.post("/auth/login", (0, validationRequest_1.default)(users_validations_1.AuthZodValidation.loginZodSchema), users_controllers_1.UserController.normalLoginController);
router.post("/auth/signup", users_controllers_1.UserController.createUserController);
router.post("/auth/refresh-token", (0, validationRequest_1.default)(users_validations_1.AuthZodValidation.refreshTokenZodSchema), users_controllers_1.UserController.refreshTokenController);
//Auth(Admin)
router.post("/admins/create-admin", users_controllers_1.UserController.adminCreateController);
router.post("/admins/login", (0, validationRequest_1.default)(users_validations_1.AuthZodValidation.loginZodSchema), users_controllers_1.UserController.adminLoginController);
//User
router.get("/users", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), users_controllers_1.UserController.getAllUserController); //only accessible by admin
router.get("/users/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), users_controllers_1.UserController.getSingleUserController); //only accessible by admin
router.patch("/users/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), users_controllers_1.UserController.updateUserController); //only accessible by admin
router.delete("/users/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), users_controllers_1.UserController.deleteUserController); //only accessible by admin
//My Profile
router.get("/users/my-profile"); // accessible by only specific user (buyer, seller) of the profile
router.patch("/users/my-profile"); // accessible by only specific user (buyer, seller) of the profile
router.patch("/admins/my-profile");
router.get("/admins/my-profile");
exports.UserRoutes = router;
