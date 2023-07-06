"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cows_routes_1 = require("../app/modules/cows/cows.routes");
const users_routes_1 = require("../app/modules/users/users.routes");
const orders_routes_1 = require("../app/modules/orders/orders.routes");
const router = express_1.default.Router();
router.use(users_routes_1.UserRoutes);
router.use(cows_routes_1.CowRoutes);
router.use(orders_routes_1.OrderRoutes);
exports.default = router;
