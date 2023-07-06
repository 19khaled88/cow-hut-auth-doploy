"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const checkEligibleOrder_1 = __importDefault(require("../../../middleware/checkEligibleOrder"));
const auth_1 = __importDefault(require("../../../middleware/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.get("/orders", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER), orders_controller_1.OrderController.getAllOrderController); // only accissble by buyer
router.post("/orders", (0, checkEligibleOrder_1.default)(), (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER), orders_controller_1.OrderController.createOrderController); // accessible by only admin, specific buyer, specific seller
router.get("/orders/:id"); // accessible by admin, specific buyer and specific seller
exports.OrderRoutes = router;
