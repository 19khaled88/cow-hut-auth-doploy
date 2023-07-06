"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const cows_controllers_1 = require("./cows.controllers");
const router = express_1.default.Router();
router.post("/cows", (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cows_controllers_1.CowController.createCowController); // only accessible by seller
router.get("/cows", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.BUYER), cows_controllers_1.CowController.getAllCowController); // accessible by buyer, seller & admin
router.get("/cows/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER), cows_controllers_1.CowController.getSingleCowController); // accessible by buyer, seller & admin
router.patch("/cows/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cows_controllers_1.CowController.updateCowrController); // only accessible by seller
router.delete("/cows/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cows_controllers_1.CowController.deleteCowController); // only accessible by seller
exports.CowRoutes = router;
